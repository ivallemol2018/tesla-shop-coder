const { getNew, getAll, getById, getBySlug, getByCriteria, save, deleteById, update} = require('../repositories/productRepository')
const NotFoundError = require('../exceptions/NotFoundError')
const cloudinary = require('./../utils/cloudinary')


const getProductNew = () => {
  return getNew()
}

const getProducts = async () =>{
  try{
    return await getAll();
  }catch(error){
    throw error
  }
}

const getProductsByCriteria = async (criteria) =>{
  try{
    return await getByCriteria(criteria);
  }catch(error){
    throw error
  }
}

const getProductById = async id =>{
  try{
    const product = await getById(id)

    if(!product){
      throw new NotFoundError('El producto no existe')
    }

    return product
  }catch(error){
    throw error
  }
}

const getProductBySlug = async slug =>{
  try{
    const product = await getBySlug(slug)

    if(!product){
      throw new NotFoundError('El producto no existe')
    }

    return product
  }catch(error){
    throw error
  }
}

const saveProduct = async product =>{
  try{
    return await save(product)
  }catch(error){
    throw error
  }  
}

const updateProduct = async product =>{
  try{
    const { _id = '', images = [] } = product

    const productRepository = await getById(_id)

    if(!productRepository){
      throw new NotFoundError('El producto no existe')
    }

    productRepository.images.forEach( async(image)=>{
      if(!images.includes(image)){
          const [fileId, extension] = image.substring(image.lastIndexOf('/') + 1).split('.')
          await cloudinary.uploader.destroy(fileId)
      }
  })

    return update(product)

  }catch(error){
    throw error
  }  
}

const deleteProductById = async id =>{
  try{
    const product = await getById(id)

    if(!product){
      throw new NotFoundError('El producto no existe')
    }

    await deleteById(id)
  }catch(error){
    throw error
  }
}

module.exports = {
  getProductNew,
  getProducts,
  getProductsByCriteria,
  getProductById,
  getProductBySlug,
  saveProduct,
  deleteProductById,
  updateProduct
}