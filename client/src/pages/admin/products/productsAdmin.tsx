import React from 'react'
import { useParams } from 'react-router-dom';
import { useProduct } from '../../../hooks'
import { AdminLayout } from '../../../components/layouts'

import { DriveFileRenameOutline } from '@mui/icons-material';

import FullScreenLoading from '../../../components/ui/FullScreenLoading';
import ProductForm from '../../../components/products/ProductForm';

const ProductAdminPage = () => {
    const { slug } = useParams();

    const { product, isLoading } = useProduct(`/products/${slug}`)

    return (
        <AdminLayout
            title={'Producto'}
            subTitle={ slug === 'new' ? 'Nuevo Producto' :  `Editando: ${product?.title}`}
            icon={<DriveFileRenameOutline />}
        >
            {
                isLoading
                    ? <FullScreenLoading />
                    : <ProductForm product={product}    />
            }
        </AdminLayout>
    )
}

export default ProductAdminPage