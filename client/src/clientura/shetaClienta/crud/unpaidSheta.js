
import axios from 'axios'
import { useEffect, useState } from 'react'

import { MakingTable } from '../../../table_select/makingTable'

export default function UnpaidShetaList() {

   const [unpaidSheta, setUnpaidSheta] = useState()
   const [sum, setSum] = useState(0)

   //--------------------READ_UNPAID_SHETA------------------------------------------------------------------------------------
   useEffect(() => {
      const getList = async () => {
         try {
            const response = await axios.get(`http://localhost:7000/unpaidShetaClientov`)
            if (response.data[0].wasPaid !== 'da') {
               setUnpaidSheta(response.data)
               setSum(response.data.reduce((total, item) => total + +item.totalCost, 0))
            }
         }
         catch (error) { throw new Error(setUnpaidSheta()) }
      }
      getList()
   }, [])

   return (
      <>
         {
            unpaidSheta ? <div>
               <h1 style={{ textAlign: 'center' }}>список неоплаченных счетов клиентов</h1>
               <p style={{ textAlign: 'center' }}> Итого{sum} р.</p>
               {
                  unpaidSheta && MakingTable(unpaidSheta)
               }
            </div> : <h1 style={{ textAlign: 'center' }}>неоплаченных счетов клиентов не имеются.</h1>
         }


      </>
   )
}
