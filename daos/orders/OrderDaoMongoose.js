const ContenedorMongoose = require('../../contenedores/MongoClient')
const orderModel = require('./models/OrderModel')

class OrderDaoMongoose  {
  constructor() {
    this.client = new ContenedorMongoose()
    this.client.connect()
  }

  async getAll() {
    const orders = await this.client.getAll(orderModel)

    return JSON.parse(JSON.stringify(orders))

  }

  async getById(id) {
    const order = await this.client.getById(orderModel,id)
    
    return JSON.parse(JSON.stringify(order))
  }

  async deleteById(id) {
    return await this.client.deleteById(orderModel,id)
  }

  async deleteAll() {
    return await this.client.deleteAll(orderModel) 
  }

  async getByCriteria(criteria) {
    return await this.client.getByCriteria(orderModel,criteria)
  }
  
  async save(item) {
    return await this.client.save(orderModel,item)
  }

  async update(item) {
    return await this.client.update(orderModel,item)
  }

  async exit(){
    return await this.client.disconnect()
  }

}

module.exports = OrderDaoMongoose