
import axios from 'axios'
import { useEffect, useState } from 'react'

import { MakingTable } from '../../../table_select/makingTable'

export default function UnpaidShetaList() {

   const [unpaidSheta, setUnpaidSheta] = useState()

   //--------------------READ_UNPAID_SHETA------------------------------------------------------------------------------------
   useEffect(() => {
      const getList = async () => {
         try {
            const response = await axios.get(`http://localhost:7000/unpaidSheta`)
            if (response.data[0].wasPaid!=='da')
               setUnpaidSheta(response.data)
         }
         catch (error) { throw new Error(setUnpaidSheta()) }
      }
      getList()
   }, [])

   //------------------------------------------------------------------------------------------------------------

   return (
      <>
         {
            unpaidSheta ? <div>
               <h1 style={{ textAlign: 'center' }}>список неоплаченных счетов</h1>
               {
                  unpaidSheta && MakingTable(unpaidSheta)
               }
            </div> : <h1 style={{ textAlign: 'center' }}>неоплаченных счетов не имеются.</h1>
         }


      </>
   )
}
