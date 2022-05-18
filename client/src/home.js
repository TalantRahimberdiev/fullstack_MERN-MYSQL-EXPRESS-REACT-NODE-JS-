
import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Button, Box } from '@mui/material';

import MainPostavka from './postavka/mainPostavka'
import MainTovar from './tovar/mainTovar'
import MainClientura from './clientura/mainClientura'

export default function Home() {
   return (
      <div style={{minHeight:'115vh'}}>
         <h2 style={{ textAlign: 'center',margin:0 }}>магазин строительных товаров</h2>

         <Box sx={{ my: '3vh', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', borderBottom: '1px solid black', pb: '1vh',margin:'0px' }}>

            <Button size='small' sx={{ mx: '2vw', my: '2vh' }} variant='outlined' color='success'>
               <Link style={{ textDecoration: 'none', color: 'black' }} to='postavka'>поставка</Link>
            </Button>
            <Button sx={{ mx: '2vw', my: '2vh' }} variant='outlined' color='success'>
               <Link style={{ textDecoration: 'none', color: 'black' }} to='tovar'>товар</Link>
            </Button>
            <Button sx={{ mx: '2vw', my: '2vh' }} variant='outlined' color='success'>
               <Link style={{ textDecoration: 'none', color: 'black' }} to='clientura'>клиентура</Link>
            </Button>
         </Box>

         <Routes>
            <Route path='postavka/*' element={<MainPostavka />} />
            <Route path='tovar/*' element={<MainTovar />} />
            <Route path='clientura/*' element={<MainClientura />} />
         </Routes>
      </div>
   )
}