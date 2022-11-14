const MongoClient = require('../../contenedores/MongoClient')
const usersModel = require('./models/usersModel')

class UserDaoMongoose {
  constructor() {
    this.client = new MongoClient()
    this.client.connect()
  }
  
  async getAll() {
    const users = await this.client.getAll(usersModel)

    return JSON.parse(JSON.stringify(users))

  }

  async getById(id) {
    const user = await this.client.getById(usersModel,id)
    return JSON.parse(JSON.stringify(user))
  }

  async getByEmail(email) {
    const users = await this.client.getByCriteria(usersModel,{email})
    return JSON.parse(JSON.stringify((users.length > 0 ? users[0] : null )))
  }  

  async getByCriteria(criteria) {
    const users = await this.client.getByCriteria(usersModel,criteria)
    return users
  }  

  async save(item) {
    return await this.client.save(usersModel,item)
  }

  async update(item) {
    return await this.client.update(usersModel,item)
  }

  async deleteAll() {
    return await this.client.deleteAll(usersModel) 
  }

  async insertMany(items){
    return await this.client.insertMany(usersModel,items)
  }

}

module.exports = UserDaoMongoose