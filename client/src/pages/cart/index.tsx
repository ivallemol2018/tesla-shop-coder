import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import { CartList, OrderSummary } from '../../components/cart'
import { ShopLayout } from '../../components/layouts'
import { CartContext } from '../../context'

const CartPage = () => {

    const { isLoaded, cart } = useContext(CartContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoaded && cart.length === 0) {
            navigate('/cart/empty')
        }
    }, [isLoaded, cart, navigate])

    if (isLoaded && cart.length === 0) {
        return <></>
    }

    return (
        <ShopLayout title='Carrito' pageDescription='Carrito de compras de la tienda'>
            <Typography variant='h1' component='h1'>Carrito</Typography>
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList editable />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2' >Orden</Typography>
                            <Divider sx={{ my: 1 }} />

                            <OrderSummary />


                            <Box sx={{ mt: 3 }}>
                                <Button
                                    color='secondary'
                                    className='circular-btn'
                                    fullWidth
                                    onClick={() => navigate('/checkout/address')}
                                >
                                    Checkout
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default CartPage