
import axios from 'axios'
import { useEffect, useState } from 'react'

import { MakingTable } from '../../../table_select/makingTable'

export default function PaidShetaList() {

   const [paidSheta, setPaidSheta] = useState()
   const [sum, setSum] = useState(0)

   //--------------------READ_PAID_SHETA------------------------------------------------------------------------------------
   useEffect(() => {
      const getList = async () => {
         try {
            const response = await axios.get(`http://localhost:7000/paidShetaClientov`)
            setPaidSheta(response.data)
            setSum(response.data.reduce((total, item) => total + +item.totalCost, 0))
         }
         catch (error) { throw new Error(`TR: couldn't get paidShetaClientov`) }
      }
      getList()
   }, [])

   return (
      <>
         <h1 style={{ textAlign: 'center' }}>список оплаченных счетов клиентов</h1>
         <p style={{ textAlign: 'center' }}> Итог на сумму: {sum} р.</p>
         {
            paidSheta && MakingTable(paidSheta)
         }
      </>
   )
}
