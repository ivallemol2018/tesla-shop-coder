import { useContext  } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Box, Button, FormControl, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { ShopLayout } from '../../components/layouts'
import { countries } from '../../utils'
import Cookies from 'universal-cookie'
import { CartContext } from '../../context';

const cookies = new Cookies();

type FormData = {
    firstName: string;
    lastName: string;
    address: string;
    address2: string;
    zip: string;
    city: string;
    country: string;
    phone: string
}

const getAddressFromCookies = (): FormData => {
    return {
        firstName: cookies.get('firstName') || '',
        lastName: cookies.get('lastName') || '',
        address: cookies.get('address') || '',
        address2: cookies.get('address2') || '',
        zip: cookies.get('zip') || '',
        city: cookies.get('city') || '',
        country: cookies.get('country') || '',
        phone: cookies.get('phone') || '',
    }
}

const AddressPage = () => {

    const navigate = useNavigate()
    const { updateAddress } = useContext(CartContext)

    const { register, formState: { errors }, handleSubmit } = useForm<FormData>({
        defaultValues: getAddressFromCookies()
    });

    const onRegisterForm = (data: FormData) => {
        updateAddress(data)

        navigate('/checkout/summary')
    }

    return (
        <ShopLayout title='Direccion' pageDescription='Confirmar direccion del destino'>
            <form onSubmit={handleSubmit(onRegisterForm)}>
                <Typography variant='h1' component='h1'>Direccion</Typography>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={6} >
                        <TextField
                            label='Nombre'
                            variant='filled'
                            fullWidth
                            {...register('firstName', {
                                required: 'Este camo es requerido',
                                minLength: { value: 2, message: 'Minimo 2 caracteres' }
                            })
                            }
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <TextField
                            label='Apellido'
                            variant='filled'
                            fullWidth
                            {...register('lastName', {
                                required: 'Este camo es requerido',
                            })
                            }
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <TextField
                            label='Direccion'
                            variant='filled'
                            fullWidth
                            {...register('address', {
                                required: 'Este camo es requerido',
                            })
                            }
                            error={!!errors.address}
                            helperText={errors.address?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <TextField
                            label='Direccion 2(opcional)'
                            variant='filled'
                            fullWidth
                            {...register('address2')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <TextField
                            label='Codigo Postal'
                            variant='filled'
                            fullWidth
                            {...register('zip', {
                                required: 'Este camo es requerido',
                            })
                            }
                            error={!!errors.zip}
                            helperText={errors.zip?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <TextField
                            label='Ciudad'
                            variant='filled'
                            fullWidth
                            {...register('city', {
                                required: 'Este camo es requerido',
                            })
                            }
                            error={!!errors.city}
                            helperText={errors.city?.message}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} >
                        <FormControl fullWidth>
                            <TextField
                                select
                                variant='filled'
                                label='Pais'
                                defaultValue={ cookies.get('country') || countries[0].code  }
                                {...register('country', {
                                    required: 'Este camo es requerido',
                                })
                                }
                                error={!!errors.country}
                                helperText={errors.country?.message}
                            >
                                {
                                    countries.map((country) => (
                                        <MenuItem
                                            key={country.code}
                                            value={country.code}
                                        >
                                            {country.name}
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} >
                        <TextField
                            label='Telefono'
                            variant='filled'
                            fullWidth
                            {...register('phone', {
                                required: 'Este camo es requerido',
                            })
                            }
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                        />
                    </Grid>
                </Grid>

                <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                    <Button
                        type='submit'
                        color='secondary'
                        className='circular-btn'
                        size='large'
                    >
                        Revisar Pedido
                    </Button>
                </Box>
            </form>
        </ShopLayout>
    )
}



export default AddressPage