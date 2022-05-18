
import { Link, Routes, Route } from "react-router-dom"
import { Box } from '@mui/material'

import CreatePostavshik from './crud/createPostavshik'
import ReadPostavshik from "./crud/readPostavshik"
import UpdatePostavshik from "./crud/updatePostavshik"
import DeletePostavshik from "./crud/deletePostavshik"

export default function MainPostavshiki() {

   return (
      <div>
         <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', my: '3vh' }}>
            <Link style={{ marginBottom: '2vh' }} to='CreatePostavshik'>ввести поставщика</Link>
            <Link to='ReadPostavshik'>список поставщиков</Link>
            <Link to='UpdatePostavshik'>редактировать поставщика</Link>
            <Link to='DeletePostavshik'>удалить поставщика</Link>
         </Box>
         <Routes>
            <Route path="CreatePostavshik" element={<CreatePostavshik />} />
            <Route path="ReadPostavshik" element={<ReadPostavshik />} />
            <Route path="UpdatePostavshik" element={<UpdatePostavshik />} />
            <Route path="DeletePostavshik" element={<DeletePostavshik />} />
         </Routes>
      </div>
   )
}