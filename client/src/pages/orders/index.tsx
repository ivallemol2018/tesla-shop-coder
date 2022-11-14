import React,{useState} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useOrder } from '../../hooks'
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'
import { CartList, OrderSummary } from '../../components/cart'
import FullScreenLoading from '../../components/ui/FullScreenLoading';
import { ShopLayout } from '../../components/layouts'
import { ShippingAddress } from '../../interfaces';
import { tesloApi } from '../../api';

export type OrderResponseBody = {
  id: string;
  status:
  | "COMPLETED"
  | "SAVED"
  | "APPROVED"
  | "VOIDED"
  | "COMPLETED"
  | "PAYER_ACTION_REQUIRED";
}

const OrderPage = () => {
  const { id } = useParams();

  const { order, isLoading } = useOrder(`/orders/${id}`)
  const [isPaying, setIsPaying] = useState(false)

  const navigate = useNavigate()

  const shippingAddress: ShippingAddress = order?.shippingAddress

  const onOrderCompleted = async (details: OrderResponseBody) => {
    if (details.status !== 'COMPLETED') {
      return alert('No hay pago en Paypal')
    }

    setIsPaying(true)

    try {
      const { data } = await tesloApi.post('/orders/pay', {
        transactionId: details.id,
        orderId: order._id
      })

      navigate(`/orders/${id}`)
    } catch (error) {
      setIsPaying(false)
    } 
  }

  return (
    <ShopLayout title='Resume de Orden' pageDescription='Resume de la orden'>
      {
        isLoading
          ? <FullScreenLoading />
          :
          <>
            <Typography variant='h1' component='h1'>Orden: {order._id}</Typography>
            {
              order.isPaid
                ? (
                  <Chip
                    sx={{ my: 2 }}
                    label='Orden ya fue pagada'
                    variant='outlined'
                    color='success'
                    icon={<CreditScoreOutlined />}
                  />
                ) : (
                  <Chip
                    sx={{ my: 2 }}
                    label='Pendiente de pago'
                    variant='outlined'
                    color='error'
                    icon={<CreditCardOffOutlined />}
                  />
                )
            }
            <Grid container className='fadeIn'>
              <Grid item xs={12} sm={7}>
                <CartList products={order.orderItems} />
              </Grid>
              <Grid item xs={12} sm={5}>
                <Card className='summary-card'>
                  <CardContent>
                    <Typography variant='h2' >Resumen ({order.numberOfItems} {order.numberOfItems > 1 ? 'productos' : 'producto'})</Typography>
                    <Divider sx={{ my: 1 }} />

                    <Box display='flex' justifyContent='space-between'>
                      <Typography variant='subtitle1'>Direccion</Typography>
                    </Box>

                    <Typography>{shippingAddress.firstName} {shippingAddress.lastName} </Typography>
                    <Typography>{shippingAddress.address} {shippingAddress.address2 ? `, ${shippingAddress.address2}` : ''} </Typography>
                    <Typography>{shippingAddress.city} , {shippingAddress.zip}</Typography>
                    <Typography>{shippingAddress.country}</Typography>
                    <Typography>{shippingAddress.phone}</Typography>

                    <Divider sx={{ my: 1 }} />

                    <OrderSummary
                      orderValues={{
                        numberOfItems: order.numberOfItems,
                        subTotal: order.subTotal,
                        tax: order.tax,
                        total: order.total,
                      }}
                    />

                    <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                      {
                        order.isPaid
                          ? (
                            <Chip
                              sx={{ my: 2 }}
                              label='Orden ya fue pagada'
                              variant='outlined'
                              color='success'
                              icon={<CreditScoreOutlined />}
                            />
                          ) : (
                            <PayPalButtons
                              createOrder={(data, actions) => {
                                return actions.order.create({
                                  purchase_units: [
                                    {
                                      amount: {
                                        value: `${order.total}`,
                                      },
                                    },
                                  ],
                                });
                              }}
                              onApprove={(data, actions) => {
                                return actions.order!.capture().then((details) => {

                                  onOrderCompleted(details)
                                  //console.log({details})
                                  //const name = details.payer.name!.given_name;
                                  //alert(`Transaction completed by ${name}`);
                                });
                              }}
                            />
                          )
                      }
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </>
      }
    </ShopLayout>
  )
}

export default OrderPage