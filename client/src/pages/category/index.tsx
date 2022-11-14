import React from 'react'
import { useParams } from "react-router-dom";
import { useProducts } from '../../hooks'
import { Typography } from '@mui/material'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import FullScreenLoading from '../../components/ui/FullScreenLoading'

const CategoryPage = () => {
    const { gender } = useParams();
    const { products, isLoading } = useProducts(`/products?gender=${gender}`)

    return (
        <ShopLayout title={'Teslo-Shop - '} pageDescription={'Encuentra los mejores productos de Teslo '}>
            <Typography variant='h1' component='h1' >{gender}</Typography>
            <Typography variant='h2' sx={{ mb: 1 }}>{`Productos para ${gender}`}</Typography>

            {
                isLoading
                    ? <FullScreenLoading />
                    : <ProductList products={products} />
            }

        </ShopLayout>
    )
}

export default CategoryPage