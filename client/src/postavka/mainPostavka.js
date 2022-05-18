
import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Box, Button } from '@mui/material'

import MainPostavshiki from './postavshiki/mainPostavshiki'
import MainShetaPostavki from './shetaPostavki/mainShetaPostavki'
import MainZakazPostavki from './zakazyPostavok/mainZakazPostavki'
import MainDogovoraPostavki from './dogovoraPostavki/mainDogovoraPostavki'

export default function MainPostavka() {
   return (
      <div>
         <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', my: '3%' }}>
            <Link style={{ color: 'blue' }} to='MainPostavshiki'>
               <Button variant='text' color='primary' size="small">поставщики</Button>
            </Link>
            <Link style={{ color: 'blue' }} to='MainDogovoraPostavki'>
               <Button variant='text' color='primary' size="small">договора поставок</Button>
            </Link>
            <Link style={{ color: 'blue' }} to='MainZakazPostavki'>
               <Button variant='text' color='primary' size="small">заказы поставок</Button>
            </Link>
            <Link style={{ color: 'blue' }} to='MainShetaPostavki'>
               <Button variant='text' color='primary' size="small">счета по поставкам</Button>
            </Link>
         </Box>

         <Routes>
            <Route path='MainPostavshiki/*' element={<MainPostavshiki />} />
            <Route path='MainDogovoraPostavki/*' element={<MainDogovoraPostavki />} />
            <Route path='MainZakazPostavki/*' element={<MainZakazPostavki />} />
            <Route path='MainShetaPostavki/*' element={<MainShetaPostavki />} />
         </Routes>

      </div>
   )
}