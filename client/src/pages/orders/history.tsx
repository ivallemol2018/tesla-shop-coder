import React from 'react'
import { Link as NextLink } from 'react-router-dom'
import { Chip, Grid, Link, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { ShopLayout } from '../../components/layouts'
import FullScreenLoading from '../../components/ui/FullScreenLoading';
import { useOrders } from '../../hooks'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'Nombre Completo', width: 300 },

    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Muestra informacion si esta pagada la orden o no',
        width: 200,
        renderCell: (params: GridRenderCellParams) => {
            return (
                params.row.paid
                    ? <Chip color='success' label='Pagada' variant='outlined' />
                    : <Chip color='error' label='No Pagada' variant='outlined' />
            )
        }
    },

    {
        field: 'orden',
        headerName: 'Ver orden',
        width: 200,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <NextLink to={`/orders/${params.row.orderId}`} >
                    <Link underline='always'>
                        Ver orden
                    </Link>
                </NextLink>
            )
        }
    }
]

const HistoryPage = () => {

    const { orders, isLoading } = useOrders(`/orders`)

    const rows = orders?.map((order, idx) => ({
        id: idx + 1,
        paid: order.isPaid,
        fullname: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
        orderId: order._id
    }))

    return (
        <ShopLayout title='Historial de ordenes' pageDescription='Historial de ordenes del cliente'>
            {
                isLoading
                    ? <FullScreenLoading />
                    : (
                        <>
                            <Typography variant='h1' component='h1'>Historial de Ordenes</Typography>
                            <Grid container className='fadeIn'>
                                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        pageSize={10}
                                        rowsPerPageOptions={[10]}
                                    />
                                </Grid>
                            </Grid>
                        </>
                    )
            }
        </ShopLayout>
    )
}

export default HistoryPage