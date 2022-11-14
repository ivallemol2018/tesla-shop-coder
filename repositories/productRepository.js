const DaoFactory = require('../daos/DaoFactory')

const product = (new DaoFactory()).getProduct()

const getNew = () =>{
  return product.getNew()
}

const getAll = async () => {
  try{
    return await product.getAll()
  }catch(error){
    throw 'There was an error trying to get all products'
  }
}

const getById = async id =>{
  try{
    console.log(id)
    return await product.getById(id)
  }catch(error){
    throw `There was an error trying to get the product by id (${error})`
  }
}

const getBySlug = async slug =>{
  try{
    return await product.getBySlug({slug})
  }catch(error){
    console.log(error)
    throw 'There was an error trying to get the product by slug'
  }
}

const getByCriteria = async criteria =>{
  try{
    return await product.getByCriteria(criteria)
  }catch(error){
    throw 'There was an error trying to get the product by criteria'
  }
}

const save = async productIn =>{
  try{
    return await product.save(productIn)
  }catch(error){
    throw `There was an error trying to save the product ${error}`
  }
}

const deleteById = async id =>{
  try{
    return await product.deleteById(id)
  }catch(error){
    throw 'There was an error trying to delete the product'
  }
}

const update = async productIn =>{
  try{
    return await product.update(productIn)
  }catch(error){
    throw 'There was an error trying to update the product'
  }  
}

module.exports = {
  getNew,
  getAll,
  getById,
  getBySlug,
  getByCriteria,
  save,
  deleteById,
  update
}