import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from '../../hooks'
import { SizeSelector } from '../../components/products'
import { ShopLayout } from '../../components/layouts';
import { ItemCouter } from '../../components/ui'
import { ProductSlideshow } from '../../components/products/ProductSlideshow'
import { ICartProduct, ISize } from '../../interfaces'
import { Box, Button, Chip, Grid, Typography } from '@mui/material'
import { CartContext } from '../../context'
import FullScreenLoading from '../../components/ui/FullScreenLoading';


const ProductPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate()

  const { product, isLoading } = useProduct(`/products/${slug}`)

  const { addProductToCart } = useContext(CartContext)

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product?._id!,
    image: product?.images[0],
    price: product?.price,
    size: undefined,
    slug: product?.slug,
    title: product?.title,
    gender: product?.gender,
    quantity: 1
  })

  useEffect(() => {
    if (!isLoading) {
        setTempCartProduct({
          _id: product._id!,
          image: product.images[0],
          price: product.price,
          size: undefined,
          slug: product.slug,
          title: product.title,
          gender: product.gender,
          quantity: 1
        })
    }
  }, [isLoading])


  const onSelectedSize = (size: ISize) => {
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      size
    }))
  }

  const onUpdateQuantity = (quantity: number) => {
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      quantity
    }))
  }

  const onAddProduct = () => {
    if (!tempCartProduct.size) { return; }

    console.log(tempCartProduct)

    addProductToCart(tempCartProduct)

    navigate('/cart')
  }

  return (
    <ShopLayout title={product?.title} pageDescription={product?.description}>
      {
        isLoading
          ? <FullScreenLoading />
          : <Grid container spacing={3}>
            <Grid item xs={12} sm={7}>
              <ProductSlideshow images={product.images} />
            </Grid>
            <Grid item xs={12} sm={5}>
              <Box display='flex' flexDirection='column' >
                <Typography variant='h1' component='h1'>{product.title}</Typography>
                <Typography variant='subtitle1' component='h2'>{`$${product.price}`}</Typography>
                <Box sx={{ my: 2 }}>
                  <Typography variant='subtitle2'>Cantidad</Typography>
                  <ItemCouter
                    currentValue={tempCartProduct.quantity}
                    updatedQuantity={(newValue) => onUpdateQuantity(newValue)}
                    maxValue={product.inStock > 10 ? 10 : product.inStock}
                  />
                  <SizeSelector
                    // selectedSize={product.sizes[0]} 
                    sizes={product.sizes}
                    selectedSize={tempCartProduct.size}
                    onSelectedSize={onSelectedSize}
                  />
                </Box>
                {
                  (product.inStock > 0)
                    ? (
                      <Button color='secondary' className='circular-btn' onClick={onAddProduct} >
                        {
                          tempCartProduct.size
                            ? 'Agregar al carrito'
                            : 'Seleccione una talla'
                        }
                      </Button>
                    )
                    : (
                      <Chip label='No hay disponibles' color='error' variant='outlined' />
                    )

                }
                { /* Descripcion */}
                <Box sx={{ mt: 3 }}>
                  <Typography variant='subtitle2'>Descripcion</Typography>
                  <Typography variant='body2'>{product.description}</Typography>

                </Box>

              </Box>
            </Grid>
          </Grid>
      }
    </ShopLayout>
  )
}

export default ProductPage