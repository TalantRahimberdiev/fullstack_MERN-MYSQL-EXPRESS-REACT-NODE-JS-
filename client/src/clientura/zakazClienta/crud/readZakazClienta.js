
import axios from 'axios'
import { useEffect, useState } from 'react'

import { MakingTable } from '../../../table_select/makingTable'

export default function ReadZakazClienta() {

   const [zakazy, setZakazy] = useState()

   useEffect(() => {
      const getList = async () => {
         try {
            const response = await axios.get(`http://localhost:7000/spisokCLientskihZakazov`)
            setZakazy(response.data)
         }
         catch (error) { throw new Error(`TR: !spisok clientskih zakazov`) }
      }
      getList()
   }, [])

   return (
      <>
         <h1 style={{ textAlign: 'center' }}>список клиентских заказов</h1>
         {
            zakazy && MakingTable(zakazy)
         }
      </>
   )
}
