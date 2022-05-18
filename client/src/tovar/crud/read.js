
import axios from 'axios'
import { useEffect, useState } from 'react'

import { MakingTable } from '../../table_select/makingTable'

export default function ReadDogovor() {

   const [tovary, setTovary] = useState()
   const [quantity, setQuantity] = useState()
   const [cost, setCost] = useState(0)

   useEffect(() => {
      const getList = async () => {
         try {
            const response = await axios.get(`http://localhost:7000/spisokDostupnihTovarov`)
            setTovary(response.data)
            setQuantity(response.data.length)
         }
         catch (error) { throw new Error(`TR: failed to get tovary`) }
      }
      getList()
   }, [])

   useEffect(() => {
      const getTotalCost = async () => {
         try {
            const response = await axios.get(`http://localhost:7000/totalCostOfTovar`)
            setCost(response.data[0]['SUM(totalCost)'])
         }
         catch (error) { throw new Error(`TR: failed to get totalCost of Tovar`) }
      }
      getTotalCost()
   }, [])

   return (
      <>
         <h1 style={{ textAlign: 'center' }}>список товаров</h1>
         <p style={{ textAlign: 'center' }}>общее количество товаров:{quantity}. На общую сумму:{cost}</p>
         {
            tovary && MakingTable(tovary)
         }
      </>
   )
}
