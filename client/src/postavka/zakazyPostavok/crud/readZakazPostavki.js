
import axios from 'axios'
import { useEffect, useState } from 'react'

import { MakingTable } from '../../../table_select/makingTable'

export default function ReadZakaz() {

   const [zakazy, setZakazy] = useState()

   useEffect(() => {
      const getList = async () => {
         try {
            const response = await axios.get(`http://localhost:7000/spisokZakazovPostavki`)
            setZakazy(response.data)
         }
         catch (error) { throw new Error(`TR: spisok zakazov postavki`) }
      }
      getList()
   }, [])

   return (
      <>
         <h1 style={{ textAlign: 'center' }}>список заказов поставки</h1>
         {
            zakazy && MakingTable(zakazy)
         }
      </>
   )
}
