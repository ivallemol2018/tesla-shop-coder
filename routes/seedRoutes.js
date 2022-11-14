const express = require('express')

const mongoose = require('mongoose')
const ProductDaoMongoose = require('../daos/products/ProductDaoMongoose')
const UserDaoMongoose = require('../daos/users/UserDaoMongoose')
const OrderDaoMongoose = require('../daos/orders/OrderDaoMongoose')
const initialData = require('./../database/seed-data')
const keys = require('../config/keys');

const { Router } = express

const router = Router()

router.post('/', async (request, response) => {

    if(process.env.NODE_ENV === 'production'){
        response.status(200).json({ message: 'No tiene acceso a este API' })
    }    


    const product = new ProductDaoMongoose()
    const user = new UserDaoMongoose()
    const order = new OrderDaoMongoose()

    await product.deleteAll()

    await user.deleteAll()

    await order.deleteAll()

    await product.insertMany(initialData.products)

    await user.insertMany(initialData.users)

    response.status(200).json({ message: 'Proceso realizado correctamente' })
})


module.exports = router;