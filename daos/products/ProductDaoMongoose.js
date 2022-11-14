const ContenedorMongoose = require('../../contenedores/MongoClient')
const productsModel = require('./models/productModel')

class ProductDaoMongoose  {
  constructor() {
    this.client = new ContenedorMongoose()
    this.client.connect()
  }

  getNew(){
    return JSON.parse(JSON.stringify(new productsModel()))

  }

  async getAll() {
    const products = await this.client.getAll(productsModel)

    return JSON.parse(JSON.stringify(products))

  }

  async getById(id) {
    const product = await this.client.getById(productsModel,id)

    return JSON.parse(JSON.stringify(product))
  }

  async deleteById(id) {
    return await this.client.deleteById(productsModel,id)
  }

  async deleteAll() {
    return await this.client.deleteAll(productsModel) 
  }

  async insertMany(items){
    return await this.client.insertMany(productsModel,items)
  }


  async getByCriteria(criteria) {
    return await this.client.getByCriteria(productsModel,criteria)
  }
  
  async getBySlug(criteria) {
    const products =  await this.client.getByCriteria(productsModel,criteria)

    return JSON.parse(JSON.stringify(products[0]))
  }

  async save(item) {
    return await this.client.save(productsModel,item)
  }

  async update(item) {
    return await this.client.update(productsModel,item)
  }

  async exit(){
    return await this.client.disconnect()
  }

}

module.exports = ProductDaoMongoose