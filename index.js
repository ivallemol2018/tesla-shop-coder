const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const session = require('express-session')
const cookieParser = require("cookie-parser");
const passport = require('./middlewares/passport-local')
const MongoStore = require('connect-mongo')
const logger = require('./utils/log4').getLogger()
const loggerNotFound = require('./utils/log4').getLogger("warn")
const bodyParser = require('body-parser');

const keys = require('./config/keys');

const apiProduct = require('./routes/productRoutes')
const apiShoppingCart = require('./routes/shoppingCartRoutes')
const apiOrder = require('./routes/orderRouter')
const apiMessage = require('./routes/messageRoutes')
const apiSeed = require('./routes/seedRoutes')

const sendEmail = require('./utils/email')
const {signToken, isValidToken} = require('./utils/jwt')

const formidable = require('formidable')
const cloudinary  =  require('./utils/cloudinary')

const { getUsers, getUserByCriteria, createUser, getUserById, getUserByEmail, updateUser } = require('./services/userServices')
const { getMessages, saveMessage} = require('./services/messageServices')

const app = express()
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
})

const PORT = process.env.PORT || 8080

app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({
  store: new MongoStore({
      mongoUrl: keys.hostDbEcommerce,
      ttl: 60*60*24*30  // 30d
  }),
  secret: 'dumbledure',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use((request,response,next)=>{
  logger.info('Path :' + request.path + ' Method:' + request.method)
  next();
})

app.use('/api/products',apiProduct)
app.use('/api/carrito',apiShoppingCart)
app.use('/api/orders',apiOrder)
app.use('/api/messages',apiMessage)
app.use('/api/seed',apiSeed)

app.get(
  '/api/user/validate-token',
  async (request,response)=>{
  const { token= '' } = request.cookies

  try{
      userId = await isValidToken( token )
  }catch( error ){
    return response.status(401).json({
      message: 'Token de autorizacion no es valido'
    })
  }

  const user = await getUserById(userId);

  if(!user){
    return response.status(400).json({message:'No exists usuario con ese id'})
  }

  const { _id, email, role, name } = user

  return response.status(200).json({
      token: signToken(_id, email),
      user: {
          email,
          role,
          name
      }
  })
})

app.post(
  '/api/user/login',
  passport.authenticate('login'),
  (request,response)=>{

  const {  _id, email, name, role } = request.user

  request.session.user = {  _id, email, name, role }

  const token = signToken(_id,email)

  response.status(200).json({token, user:{ email, name, role }  })

})

app.post(
  '/api/logout',
  (request,response)=>{

  request.session.destroy(()=>{
    response.status(200).json({message:'succesful'})
  })
})

app.post(
  '/api/user/signup',
  passport.authenticate('signup'),
  (request,response)=>{
    const {_id, email,name, role, phone} = request.user

    sendEmail({username: email,name},'Nuevo registro','email.newregister.template.ejs')

    request.session.username = email

    const token = signToken(_id,email)
  
    response.status(200).json({token, user:{ email, name, role }  })    

})


const saveFile = async (file) => {

  const {secure_url} = await cloudinary.uploader.upload(file.filepath)
  return secure_url
}

const parseFiles = async (req) => {
  
  return new Promise((resolve, reject) => {
      const form = new formidable.IncomingForm()
      form.parse(req, async (err, fields, files) => {

          if (err) {
              return reject(err)
          }

          const filePath = await saveFile(files.file)

          resolve(filePath)

      })
  })
}

app.post(
  '/api/admin/upload',
  async (request,response)=>{

    const imageUrl = await parseFiles(request)

    return response.status(200).json({ message: imageUrl })    
  
})

app.get(
  '/api/admin/users',
  async (request,response)=>{

    const users = await getUsers()

    return response.status(200).json(users)    
  
})

app.put(
  '/api/admin/users',
  async (request,response)=>{

    const { userId = '', role='' } = request.body

    const user = await getUserById(userId)

    user.role = role

    await updateUser(user)

    return response.status(200).json({message: 'Usuario actualizado '})
  
})


app.use((request,response,next)=>{
  loggerNotFound.warn('Path :' + request.path + ' Method:' + request.method)
  next()
})



io.on('connection',  socket=>{
    socket.on('send-message', async message => {

      await saveMessage(message)

      const messages = await getMessages()

      io.emit('message', messages);
    });

})

if(process.env.NODE_ENV === 'production'){
  //Express will serve up production assets
  //like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  //Express will serve up the index.html file
  //if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });    
}

server.listen(PORT,()=>{
  console.log(`Server http on ${PORT}...`)
})

server.on('error',error=> console.log('Error on server',error))