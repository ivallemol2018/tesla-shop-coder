const express = require('express')
const Product = require('../models/Product')
const NotFoundError = require('../exceptions/NotFoundError')
const requireLogin = require('../middlewares/requireLogin');
const logger = require('../utils/log4').getLogger("error")

const { getProductNew, getProducts, getProductsByCriteria, getProductBySlug, 
        saveProduct, deleteProductById, updateProduct } = require('../services/productServices')


const { Router } = express

const router = Router()

router.get('/', async (request, response) => {
  try {
    const { gender = 'all' } = request.query
    console.log('entre')
    let condition = {}

    if (gender !== 'all') {
      condition = { gender }
    }

    const products = await getProductsByCriteria(condition)
    response.json(products)
  } catch (error) {
    logger.error(error)
    return response.status(500).json({ errors: [error] })
  }
})

router.get('/:slug', async (request, response) => {
  try {
    const { slug } = request.params

    if( slug === 'new'){
      const product = getProductNew()
      delete product._id
      response.json(product)
    }else{
      const product = await getProductBySlug(slug)
      response.json(product)
    }

  } catch (error) {
    logger.error(error)
    if (error instanceof NotFoundError) {
      return response.status(404).json(error)
    }

    return response.status(500).json({ errors: [error] })
  }
})

router.post('/', async (request, response) => {
  try {
    const product = request.body

    await saveProduct(product)

    return response.status(200).json({ success: true, message: 'Producto registrado', id: product.id })

  } catch (error) {
    logger.error(error)
    return response.status(500).json({ errors: [error] })
  }
})

router.put('/', async (request, response) => {
  try {
    const product = request.body

    await updateProduct(product)

    return response.status(200).json({ success: true, message: 'Producto registrado', id: product.id })
  } catch (error) {
    logger.error(error)
    if (error instanceof NotFoundError) {
      return response.status(404).json(error)
    }
    return response.status(500).json({ errors: [error] })
  }
})

router.delete('/:id', requireLogin, async (request, response) => {
  try {

    const { id } = request.params

    await deleteProductById(id)

    const products = await getProducts()

    return response.status(200).json({ products, success: true, message: 'Producto eliminado' })
  } catch (error) {
    logger.error(error)
    if (error instanceof NotFoundError) {
      return response.status(404).json(error)
    }
    return response.status(500).json({ errors: [error] })
  }
})

module.exports = router;