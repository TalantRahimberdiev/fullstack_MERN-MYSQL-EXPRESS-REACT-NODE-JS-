
import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Box, Button } from '@mui/material'

import MainClients from './clients/mainClients'
import MainShetaProdaji from './shetaClienta/mainShetaClienta'
import MainZakazClienta from './zakazClienta/mainZakazClienta'

export default function MainClientura() {
   return (
      <div>
         <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', my: '3%' }}>
            <Link style={{ color: 'blue' }} to='MainClients'>
               <Button variant='text' color='primary' size="small">клиенты</Button>
            </Link>
            <Link style={{ color: 'blue' }} to='MainZakazClienta'>
               <Button variant='text' color='primary' size="small">заказы клиентов</Button>
            </Link>
            <Link style={{ color: 'blue' }} to='MainShetaProdaji'>
               <Button variant='text' color='primary' size="small">счета по продажам</Button>
            </Link>
         </Box>

         <Routes>
            <Route path='MainClients/*' element={<MainClients />} />
            <Route path='MainZakazClienta/*' element={<MainZakazClienta />} />
            <Route path='MainShetaProdaji/*' element={<MainShetaProdaji />} />
         </Routes>

      </div>
   )
}