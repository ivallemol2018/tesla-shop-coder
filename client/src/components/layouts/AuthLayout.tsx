import React, { FC, PropsWithChildren } from 'react'
import { Box } from '@mui/material'

interface Props extends PropsWithChildren<{}> {
    title: string
}

export const AuthLayout: FC<Props> = ({ children, title }) => {
    return (
        <>
            <head>
                <title>{title}</title>
            </head>

            <main>
                <Box display='flex' justifyContent='center' alignItems='center' height='calc(100vh - 100px)'>
                    {children}
                </Box>
            </main>
        </>
    )
}
