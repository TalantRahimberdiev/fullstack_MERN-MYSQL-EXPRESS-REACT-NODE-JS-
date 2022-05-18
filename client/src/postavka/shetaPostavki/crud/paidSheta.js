
import axios from 'axios'
import { useEffect, useState } from 'react'

import { MakingTable } from '../../../table_select/makingTable'

export default function PaidShetaList() {

   const [paidSheta, setPaidSheta] = useState()

   //--------------------READ_PAID_SHETA------------------------------------------------------------------------------------
   useEffect(() => {
      const getList = async () => {
         try {
            const response = await axios.get(`http://localhost:7000/paidSheta`)
            setPaidSheta(response.data)
         }
         catch (error) { throw new Error(`TR: couldn't get paidSheta`) }
      }
      getList()
   }, [])

   //------------------------------------------------------------------------------------------------------------

   return (
      <>
      <h1 style={{ textAlign: 'center' }}>список оплаченных счетов</h1>
         {
            paidSheta && MakingTable(paidSheta)
         }
      </>
   )
}
