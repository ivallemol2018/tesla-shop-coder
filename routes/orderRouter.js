const express = require('express')
const sendEmail = require('../utils/email')
const NotFoundError = require('../exceptions/NotFoundError')
const logger = require('../utils/log4').getLogger("error")
const keys = require('../config/keys')
const axios = require('axios')

const { getOrders, getOrderById, getOrderByUser, saveOrder, updateOrder } = require('../services/orderServices')
const { getUserById } = require('../services/userServices')

const { Router } = express

const router = Router()

const getPaypalBearerToken = async () =>{
  const PAYPAL_CLIENT = keys.PAYPAL_CLIENT_ID
  const PAYPAL_SECRET = keys.PAYPAL_SECRET
  const PAYPAL_OAUTH_URL = keys.PAYPAL_OAUTH_URL

  const base64Token = Buffer.from(`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`,'utf-8').toString('base64')

  const body = new URLSearchParams('grant_type=client_credentials')

  try {
      const  { data } = await axios.post( PAYPAL_OAUTH_URL || '', body, {
          headers: {
              'Authorization': `Basic ${base64Token}`, 
              'Content-Type': 'application/x-www-form-urlencoded'             
          }
      })

      return data.access_token;
  } catch (error) {
      if (  axios.isAxiosError(error) ){
          console.log(error.response?.data)
      }else{
          console.log(error)
      }

      return null;
  }
}

router.get('/', async (request, response) => {
  try {
    if(!request.session) {
        return res.status(401).json({message: 'Debe estar autenticado para hacer esto'})
    }
    const orders = await getOrderByUser(request.session.user._id)
    response.json(orders)
  } catch (error) {
    logger.error(error)
    return response.status(500).json({ errors: [error] })
  }
})

router.post('/pay', async (request, response) => {
  try {
    const PAYPAL_ORDERS_URL = keys.PAYPAL_ORDERS_URL
    const paypalBearerToken =  await getPaypalBearerToken();

    if(!paypalBearerToken){
      return response.status(400).json({message: 'No se pudo confirmar el token de paypal'})
    }

    const { transactionId = '', orderId = '' } = request.body;

    const { data } = await axios.get(`${PAYPAL_ORDERS_URL}/${transactionId}`,{
      headers: {
          'Authorization': `Bearer ${paypalBearerToken}`        
      }
    })

    if ( data.status !== 'COMPLETED'){
        return response.status(401).json({message: 'Orden no reconocida'})
    }

    const order = await getOrderById(orderId)



    if( order.total !== Number(data.purchase_units[0].amount.value)){
      return response.status(400).json({message: 'Los montos de Paypal y nuestra orden no son iguales'})
    }

    order.transactionId = transactionId;
    order.isPaid = true

    await updateOrder(order)

    const user = await getUserById(order.user)

    sendEmail(order,'Resumen Orden','email.order.template.ejs',user.email)
    
    return response.status(200).json({message:  'Orden pagada' })

  } catch (error) {
    logger.error(error)
    return response.status(500).json({ errors: [error] })
  }
})

router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const orders = await getOrderById(id)
    response.json(orders)
  } catch (error) {
    logger.error(error)
    return response.status(500).json({ errors: [error] })
  }
})

router.post('/', async (request, response) => {
  try {

    if(!request.session) {
        return res.status(401).json({message: 'Debe estar autenticado para hacer esto'})
    }

    const userId = request.session.user._id

    const newOrder = await saveOrder({ ...request.body, isPaid: false, user: userId  })

    return response.status(200).json(newOrder)

  } catch (error) {
    logger.error(error)
    return response.status(500).json({ errors: [error] })
  }
})

module.exports=router;
