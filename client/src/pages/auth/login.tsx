import { useState, useContext } from 'react'
import { useForm } from "react-hook-form";
import { Link as NextLink, useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material';
import { AuthLayout } from '../../components/layouts'
import { validations } from '../../utils';
import { AuthContext } from '../../context';

interface FormData {
    email: string
    password: string
}

const LoginPage = () => {

    const { register, formState: { errors }, handleSubmit } = useForm<FormData>();
    const [showError, setShowError] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const { loginUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const onLoginUser = async ({ email, password }: FormData) => {

        setShowError(false);

        const isValidLogin = await loginUser(email, password)

        if (!isValidLogin) {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000)
            return
        }

        const destination = searchParams.get('p')?.toString() || '/'
        navigate(destination)

    }

    return (
        <AuthLayout title={'Ingresar'}>
            <form onSubmit={handleSubmit(onLoginUser)}>
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
                            <Typography variant='h1' component='h1'>Iniciar Sesion</Typography>
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
                            <Button
                                type='submit'
                                color='secondary'
                                className='circular-btn'
                                size='large'
                                fullWidth>
                                Ingresar
                            </Button>
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink to='/auth/register'>
                                <Link underline='always'>
                                    No tienes cuenta
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>

        </AuthLayout>
    )
}

export default LoginPage