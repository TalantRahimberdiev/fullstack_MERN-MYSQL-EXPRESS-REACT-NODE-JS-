
import { Link, Routes, Route } from "react-router-dom"
import { Box } from '@mui/material'

import CreateClient from './crud/createClient'
import ReadClient from "./crud/readClient"
import UpdateClient from "./crud/updateClient"
import DeleteClient from "./crud/deleteClient"

export default function MainClients() {

   return (
      <div>
         <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', my: '3vh' }}>
            <Link style={{ marginBottom: '2vh' }} to='CreateClient'>ввести клиента</Link>
            <Link to='ReadClient'>список клиентов</Link>
            <Link to='UpdateClient'>редактировать клиента</Link>
            <Link to='DeleteClient'>удалить клиента</Link>
         </Box>
         <Routes>
            <Route path="CreateClient" element={<CreateClient />} />
            <Route path="ReadClient" element={<ReadClient />} />
            <Route path="UpdateClient" element={<UpdateClient />} />
            <Route path="DeleteClient" element={<DeleteClient />} />
         </Routes>
      </div>
   )
}