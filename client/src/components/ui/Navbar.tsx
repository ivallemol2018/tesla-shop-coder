import React, { useState, useContext } from 'react'
import { Link as NextLink, useLocation } from "react-router-dom";
import { AppBar, Avatar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material'
import { CloseOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'

import { CartContext, UiContext, AuthContext } from '../../context'

export const Navbar = () => {

    const { numberOfItems } = useContext(CartContext)
    const { user, isLoggedIn } = useContext(AuthContext)

    const location = useLocation()
    const asPath: string = location.pathname
    const [searchTerm, setSearchTerm] = useState('')
    const [isSearchVisible, setSearchVisible] = useState(false)
    const { toggleSideMenu } = useContext(UiContext)

    return (
        <AppBar>
            <Toolbar>
                <NextLink to='/'>
                    <Link display='flex' alignItems='center'>
                        <Typography variant='h6'>Teslo |</Typography>
                        <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                    </Link>
                </NextLink>

                <Box flex={1} />

                <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}>
                    <NextLink to='/category/men' >
                        <Link>
                            <Button color={asPath === '/category/men' ? 'primary' : 'info'}  >Hombres</Button>
                        </Link>
                    </NextLink>
                    <NextLink to='/category/women' >
                        <Link>
                            <Button color={asPath === '/category/women' ? 'primary' : 'info'} >Mujeres</Button>
                        </Link>
                    </NextLink>
                    <NextLink to='/category/kid' >
                        <Link>
                            <Button color={asPath === '/category/kid' ? 'primary' : 'info'} >Niños</Button>
                        </Link>
                    </NextLink>
                </Box>



                <Box flex={1} />

                {/* Pantallas grandes */
                    isSearchVisible
                        ?
                        (<Input
                            sx={{ xs: 'none', sm: 'flex' }}
                            className='fadeIn'
                            autoFocus
                            value={searchTerm}
                            type='text'
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setSearchVisible(false)}
                                    >
                                        <CloseOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />)
                        :
                        (
                            <IconButton
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                                className='fadeIn'
                                onClick={() => setSearchVisible(true)}
                            >
                                <SearchOutlined />
                            </IconButton>
                        )
                }

                {/* Pantallas pequeñas */}
                <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                    onClick={toggleSideMenu}
                >
                    <SearchOutlined />
                </IconButton>



                <NextLink to='/cart' >
                    <Link>
                        <IconButton>
                            <Badge badgeContent={numberOfItems > 9 ? '+9' : numberOfItems} color='secondary'>
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>



                <Button onClick={toggleSideMenu}>
                    Menu
                </Button>

                {

                    isLoggedIn && <Avatar alt={user?.name} sx={{ width: 36, height: 36 }}>{user?.name.charAt(0).toLocaleUpperCase()}</Avatar>


                }

            </Toolbar>
        </AppBar>
    )
}
