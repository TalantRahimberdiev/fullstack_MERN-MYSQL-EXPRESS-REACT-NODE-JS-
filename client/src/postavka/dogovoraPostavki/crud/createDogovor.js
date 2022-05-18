
import { useEffect, useState } from "react"
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from "axios"
import { Box } from "@mui/system"

export default function CreateDogovor() {

   const listMonthes = 'Январь Февраль Март Апрель Май Июнь Июль Август Сентябрь Октябрь Ноябрь Декабрь'.split(' ')
   const [postavshiks, setPostavshiks] = useState()
   const [text, setText] = useState()
   const [id, setId] = useState('')
   const [day, setDay] = useState('')
   const [month, setMonth] = useState('')
   const [year, setYear] = useState('')

   useEffect(() => {
      const getPostavshiks = async () => {
         try {
            const response = await axios.get('http://localhost:7000/spisokPostavshikov')
            setPostavshiks(response.data)
         }
         catch (error) { throw new (error) }
      }
      getPostavshiks()
   }, [])

   const submit = async () => {

      try {
         await axios.post(`http://localhost:7000/CreateDogovorPostavki`, { id, day, month, year, text })
         alert('dogovor postavki created successfully')
         setText('')
         setId('')
         setYear('')
      }
      catch (error) { throw new Error('TR: failed to post dogovorPostavki') }
   }

   return (
      postavshiks &&
      <div>
         <h1 style={{ textAlign: 'center' }}>заключить договор поставки</h1>
         <Box style={{ display: 'flex', justifyContent: 'space-around' }}>
            <FormControl style={{ width: '25vw' }}>
               <InputLabel>поставщики</InputLabel>
               <Select
                  label="поставщики"
                  value={id}
                  onChange={event => setId(event.target.value)
                  }
               >
                  {
                     postavshiks.map(item => <MenuItem key={item.id} value={item.id}>{item.organization}</MenuItem>)
                  }
               </Select>
            </FormControl>
            <p>ID текущего поставщика: {id}</p>
         </Box>
         {
            id &&
            <Box style={{ display: 'flex', justifyContent: 'space-around', marginTop: '8vh', alignItems: 'center' }}>
               <TextField
                  autoComplete='off'
                  size='small'
                  variant="standard"
                  sx={{ width: '25vw', m: 'auto', my: '3vh' }}
                  label='день'
                  value={day}
                  onChange={event => setDay(event.target.value)}
               />
               <FormControl style={{ width: '25vw' }}>
                  <InputLabel>месяц</InputLabel>
                  <Select
                     label="месяц"
                     value={month}
                     onChange={event => setMonth(event.target.value)
                     }
                  >
                     {
                        listMonthes.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)
                     }
                  </Select>
               </FormControl>
               <TextField
                  autoComplete='off'
                  size='small'
                  variant="standard"
                  sx={{ width: '25vw', m: 'auto', my: '3vh' }}
                  label='год'
                  value={year}
                  onChange={event => setYear(event.target.value)}
               />
            </Box>
         }
         {
            year && <textarea
               placeholder="для ввода текста договора"
               rows={15}
               style={{ width: '55vw', display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '5vh' }}
               onChange={event => setText(event.target.value)}
            />
         }
         {
            text &&
            <Button
               onClick={() => submit()}
               sx={{ display: 'block', height: '4vh', mx: 'auto', marginTop: '3vh' }}
               size='small'
               variant='outlined'
               color='success'>
               заключить
            </Button>
         }
      </div>
   )
}