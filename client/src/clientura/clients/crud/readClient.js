
import axios from 'axios'
import { useEffect, useState } from 'react'

import { MakingTable } from '../../../table_select/makingTable'

export default function ReadClient() {

   const [clients, setClients] = useState()

   useEffect(() => {
      const getList = async () => {
         try {
            const response = await axios.get(`http://localhost:7000/spisokClientov`)
            setClients(response.data)
         }
         catch (error) { throw new Error(`TR: couldn't get clients`) }
      }
      getList()
   }, [])

   return (
      <>
         <p style={{ textAlign: 'center' }}>список клиентов</p>
         {
            clients && MakingTable(clients)
         }
      </>
   )
}
