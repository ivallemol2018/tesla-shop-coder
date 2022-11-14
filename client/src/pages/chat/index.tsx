import React, { useContext, useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { Avatar, Button, Box, Grid, TextField, Typography } from '@mui/material'
import { ChatBox, ReceiverMessage, SenderMessage } from "mui-chat-box";
import { Send as SendIcon } from '@mui/icons-material'
import FullScreenLoading from '../../components/ui/FullScreenLoading';
import { ShopLayout } from '../../components/layouts'
import { useMessages } from '../../hooks/useMessages'
import { AuthContext } from '../../context';
import socketClient from 'socket.io-client';
import { IMessage } from '../../interfaces';

const SERVER = "http://127.0.0.1:8080";

interface FormData {
  message: string
}

const ChatPage = () => {

  //const { messages, isLoading } = useMessages('/messages')

  const { register, formState: { errors }, handleSubmit } = useForm<FormData>();

  const [messages, setMessages] = useState<IMessage[]>([])

  const { user } = useContext(AuthContext)

  const socket = socketClient(SERVER);

  const configureSocket = () => {
    socket.on('message', (messages : IMessage[]) => {
      setMessages(messages);
    });

  }

  useEffect(() => {
    configureSocket()
  }, [])

  const onSend = ({ message }: FormData) => {
    socket.emit('send-message', { message, email: user?.email, name: user?.name });
  }

  return (
    <ShopLayout title='Chat' pageDescription='Chat'>
      <Typography variant='h1' component='h1'>Mensajes</Typography>


      <Box sx={{ mt: 3, mb: 3 }}>
        <ChatBox>
          {
            messages?.map(item => (
              user?.email === item.email
                ? (
                  <SenderMessage avatar={<Avatar>{item?.name.charAt(0).toLocaleUpperCase()}</Avatar>}>
                    <Grid container >
                      <Grid item >
                        <Typography>{item.message}</Typography>
                      </Grid>
                      <Grid item xs={12} display='flex' justifyContent='end'>
                        <Typography>{item.timestamp}</Typography>
                      </Grid>
                    </Grid>
                  </SenderMessage>
                )
                : (
                  <ReceiverMessage avatar={<Avatar>{item?.name.charAt(0).toLocaleUpperCase()}</Avatar>}>
                    <Grid container >
                      <Grid item >
                        <Typography>{item.message}</Typography>
                      </Grid>
                      <Grid item xs={12} display='flex' justifyContent='end'>
                        <Typography>{item.timestamp}</Typography>
                      </Grid>
                    </Grid>
                  </ReceiverMessage>
                )

            ))

          }
        </ChatBox>
      </Box>

      <form onSubmit={handleSubmit(onSend)}>
        <Grid container >
          <Grid item xs={12} sx={{ width: '100%' }}>
            <TextField
              label="Mensaje"
              placeholder='Enviar mensaje a canal'
              rows={3}
              variant="filled"
              fullWidth
              multiline
              sx={{ mb: 1 }}
              {
              ...register('message', {
                required: 'Este camo es requerido',
              })
              }
              error={!!errors.message}
              helperText={errors.message?.message}
            />
          </Grid>
          <Grid item xs={12} display='flex' justifyContent='end'>
            <Button
              type='submit'
              color='secondary'
              className='circular-btn'
              size='large'
              endIcon={<SendIcon />}
            >
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>

    </ShopLayout>
  )
}

export default ChatPage