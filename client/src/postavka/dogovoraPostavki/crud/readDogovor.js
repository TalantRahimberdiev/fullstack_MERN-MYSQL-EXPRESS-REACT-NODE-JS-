
import axios from 'axios'
import { useEffect, useState } from 'react'

import { MakingTable } from '../../../table_select/makingTable'

export default function ReadDogovor() {

   const [dogovora, setDogovora] = useState()

   useEffect(() => {
      const getList = async () => {
         try {
            const response = await axios.get(`http://localhost:7000/spisokDogovorovPostavki`)
            setDogovora(response.data)
         }
         catch (error) { throw new Error(`TR: couldn't get dogovora postavki`) }
      }
      getList()
   }, [])

   return (
      <>
         <h1 style={{ textAlign: 'center' }}>список договоров</h1>
         {
            dogovora && MakingTable(dogovora)
         }
      </>
   )
}
