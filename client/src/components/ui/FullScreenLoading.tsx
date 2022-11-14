import React from 'react'
import { Box, Typography } from '@mui/material'
import { Waveform } from '@uiball/loaders'

const FullScreenLoading = () => {
    return (
        <Box display='flex'
            height='calc(100vh - 200px)'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
        >
            <Typography sx={{mb:3}} variant='h2' fontWeight={200}>Cargando...</Typography>
            <Waveform size={70} lineWeight={3.5} speed={1} color="black" />
        </Box>
    )
}

export default FullScreenLoading