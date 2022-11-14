import { useState, useContext } from 'react'
import { Link as NextLink, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material';
import { AuthLayout } from '../../components/layouts'
import { validations } from '../../utils';
import { AuthContext } from '../../context';

const RegisterPage = () => {

    const { registerUser } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm<FormData>();
    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    interface FormData {
        name: string
        email: string
        password: string
        address: string
        phone: string
        age: number
    }

    const onRegisterForm = async ({ name, email, password, address, phone, age }: FormData) => {
        setShowError(false);
        const { hasError, message } = await registerUser(name, email, password, address, phone, age);

        if (hasError) {
            setShowError(true)
            //o setErrorMessage(message || '') 
            setErrorMessage(message!)
            setTimeout(() => setShowError(false), 3000)
            return
        }

        navigate('/')
    }

    return (
        <AuthLayout title={'Registrar'}>
            <form onSubmit={handleSubmit(onRegisterForm)}>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} display='flex' justifyContent='center'>
                            <NextLink to='/'>
                                <Link display='flex' alignItems='center'>
                                    <Typography variant='h6'>Teslo |</Typography>
                                    <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='h1' component='h1'>Crear cuenta</Typography>
                            <Chip
                                label="No reconocemos ese usuario / constraseña"
                                color="error"
                                icon={<ErrorOutline />}
                                className="fadeIn"
                                sx={{ display: showError ? 'flex' : 'none' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Nombre completo"
                                variant='filled'
                                fullWidth
                                {...register('name', {
                                    required: 'Este camo es requerido',
                                    minLength: { value: 2, message: 'Minimo 2 caracteres' }
                                })
                                }
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="email"
                                label="Correo"
                                variant='filled'
                                fullWidth
                                {
                                ...register('email', {
                                    required: 'Este camo es requerido',
                                    validate: validations.isEmail
                                })
                                }
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Constraseña"
                                type='password'
                                variant='filled'
                                fullWidth
                                {...register('password', {
                                    required: 'Este camo es requerido',
                                    minLength: { value: 6, message: 'Minimo 6 caracteres' }
                                })
                                }
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
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
                        <Grid item xs={12}>
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
                        <Grid item xs={12}>
                            <TextField
                                label='Edad'
                                variant='filled'
                                type='number'
                                fullWidth
                                {...register('age', {
                                    required: 'Este camo es requerido',
                                })
                                }
                                error={!!errors.age}
                                helperText={errors.age?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                color='secondary'
                                className='circular-btn'
                                size='large'
                                fullWidth
                            >
                                Ingresar
                            </Button>
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink to='/auth/login' >
                                <Link underline='always'>
                                    Ya tienes cuenta?
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>

        </AuthLayout>
    )
}

export default RegisterPage