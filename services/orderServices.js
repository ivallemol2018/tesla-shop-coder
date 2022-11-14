const { getAll, getById,getByCriteria, save, update} = require('../repositories/orderRepositorio')
const NotFoundError = require('../exceptions/NotFoundError')

const getOrders = async () =>{
  try{
    return await getAll();
  }catch(error){
    throw error
  }
}

const getOrderById = async id =>{
  try{
    const Order = await getById(id)

    if(!Order){
      throw new NotFoundError('El Order no existe')
    }

    return Order
  }catch(error){
    throw error
  }
}
const getOrderByUser = async id =>{
  try{
    const criteria = { user: id }
    const Order = await getByCriteria(criteria)

    if(!Order){
      throw new NotFoundError('El Order no existe')
    }

    return Order
  }catch(error){
    throw error
  }
}



const saveOrder = async Order =>{
  try{
    return await save(Order)
  }catch(error){
    throw error
  }  
}

const updateOrder = async Order =>{
  try{
    return await update(Order)
  }catch(error){
    throw error
  }  
}




module.exports = {
  getOrders,
  getOrderById,
  getOrderByUser,
  saveOrder,
  updateOrder
}