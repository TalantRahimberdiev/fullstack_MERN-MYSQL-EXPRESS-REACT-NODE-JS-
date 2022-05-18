
import axios from 'axios'
import { useEffect, useState } from 'react'

import { MakingTable } from '../../../table_select/makingTable'

export default function ReadPostavshik() {

   const [postavshiki, setPostavshiki] = useState()

   useEffect(() => {
      const getList = async () => {
         try {
            const response = await axios.get(`http://localhost:7000/spisokPostavshikov`)
            setPostavshiki(response.data)
         }
         catch (error) { throw new Error(`TR: couldn't get postavshiki`) }
      }
      getList()
   }, [])

   return (
      <>
         <p style={{ textAlign: 'center' }}>полный список</p>
         {
            postavshiki && MakingTable(postavshiki)
         }
      </>
   )
}
