const express = require('express')
const Message = require('../models/Message')
const NotFoundError = require('../exceptions/NotFoundError')
const requireLogin = require('../middlewares/requireLogin');
const logger = require('../utils/log4').getLogger("error")

const { getMessages, getMessageById, saveMessage, deleteMessageById, updateMessage} = require('../services/messageServices')

const { Router } = express

const router = Router()

router.get('/',requireLogin, async(request,response)=>{
  try{
    const messages = await getMessages()

    response.json(messages)
  } catch(error){
    logger.error(error)
    return response.status(500).json({errors:[error]})
  }
})

router.post('/',requireLogin, async (request,response)=>{
  try{

    const message = request.body

    await saveMessage(message)

    return response.status(200).json({success: true, message:'Message registrado'})

  } catch(error){
    logger.error(error)
    return response.status(500).json({errors:[error]})
  }  
})

module.exports=router;