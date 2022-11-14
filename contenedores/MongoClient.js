const mongoose = require('mongoose')
const DBClient = require('./DBClient')
const options = require('../connection/mongoose')

class MongoClient extends DBClient {

  constructor() {
    super()
    this.client = mongoose
    this.connected = false

  }

  async connect(){
    try{
      this.client.connect(options.connection.URL)
      this.connected = true
      console.log('Conectar a base de datos')
    }catch(e){
      throw new Error('Error to connect mongo ' + e)
    }
  }

  async disconnect(){
    try{
      this.client.connection.close()
      this.connected = false
    }catch(e){
      throw new Error('Error to disconnect mongo ' + e)
    }
  }

  async getAll(model) {
    return await model.find({})
  }

  async deleteById(model,id) {
    return await model.deleteOne({_id: mongoose.Types.ObjectId(id)})
  }

  async deleteAll(model) {
    return await model.deleteMany()
  }

  async insertMany(model,items){
    return await model.insertMany(items)
  }

  async getById(model,id) {
    return await model.findOne({_id: mongoose.Types.ObjectId(id)})

  }
  
  async getByCriteria(model,criteria) {
    return await model.find(criteria)
  }  

  async save(model,item) {
    const response = new model(item)
    return await response.save()
  }

  async update(model,item) {
    return await model.updateOne(
      {_id: mongoose.Types.ObjectId(item._id)},
      {$set: item}
    )
  }

}

module.exports = MongoClient;