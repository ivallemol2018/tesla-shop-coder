const DaoFactory = require('../daos/DaoFactory')

const users = (new DaoFactory()).getUser()

const getAll = async () => {
  try{
    return await users.getAll()
  }catch(error){
    throw `There was an error trying to get all users ${error}`
  }
}

const getById = async id =>{
  try{
    return await users.getById(id)
  }catch(error){
    throw 'There was an error trying to get the user by id'
  }  
}

const getByEmail = async email =>{
  try{
    return await users.getByEmail(email)
  }catch(error){
    throw `There was an error trying to get the user by email (${error})`
  }  
}

const getByCriteria = async criteria =>{
  try{
    return await users.getByCriteria(criteria)
  }catch(error){
    throw 'There was an error trying to get the user by criteria'
  }
}

const create = async user =>{
  try{
    return await users.save(user)
  }catch(error){
    throw `There was an error trying to save the user (${error})`
  }  
}


const update = async userIn =>{
  try{
    return await users.update(userIn)
  }catch(error){
    throw 'There was an error trying to update the userIn'
  }  
}


module.exports = {
  getAll,
  getByCriteria,
  create,
  getById,
  getByEmail,
  update
}