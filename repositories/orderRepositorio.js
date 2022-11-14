const DaoFactory = require('../daos/DaoFactory')

const order = (new DaoFactory()).getOrder()

const getAll = async () => {
    try{
      return await order.getAll()
    }catch(error){
      throw `There was an error trying to get all orders (${error})`
    }
  }
  
  const getById = async id =>{
    try{
      return await order.getById(id)
    }catch(error){
      throw `There was an error trying to get the order by id (${error})`
    }
  }


  const getByCriteria = async criteria =>{
    try{
      return await order.getByCriteria(criteria)
      console.log(criteria)
    }catch(error){
      throw `There was an error trying to get the order by criteria ${error}`
    }
  }

  const save = async orderIn =>{
    try{
      return await order.save(orderIn)
    }catch(error){
      throw `There was an error trying to save the order (${error}) `
    }
  }

  const update = async orderIn =>{
    try{
      return await order.update(orderIn)
    }catch(error){
      throw 'There was an error trying to update the product'
    }  
  }

  module.exports = {
    getAll,
    getById,
    getByCriteria,
    save,
    update
  }