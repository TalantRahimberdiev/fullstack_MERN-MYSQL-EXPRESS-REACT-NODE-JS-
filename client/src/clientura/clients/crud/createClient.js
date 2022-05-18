
import { useReducer } from "react"
import { Box, Button, TextField } from '@mui/material'
import axios from "axios"

export default function CreateClient() {

   const initialState = {
      firstname: '',
      lastname: '',
      contacts: '',
      address: '',
   }

   const [state, dispatch] = useReducer(reducer, initialState)

   function reducer(state, action) {
      switch (action.type) {
         case 'firstname': return { ...state, firstname: action.payload }
         case 'lastname': return { ...state, lastname: action.payload }
         case 'contacts': return { ...state, contacts: action.payload }
         case 'address': return { ...state, address: action.payload }
         case 'CLEAR': return { firstname: '', lastname: '', contacts: '', address: '' }
         default: return state
      }
   }
   const cases = 'firstname lastname contacts address'.split(' ')

   //-------------------CREATE-----------------------------------------

   const submit = async () => {

      const firstname = state.firstname
      const lastname = state.lastname
      const contacts = state.contacts
      const address = state.address

      try {
         await axios.post(`http://localhost:7000/CreateClient`, { firstname, lastname, contacts, address })
         alert('client created successfully')
         dispatch({ type: 'CLEAR' })
      }
      catch (error) { throw new Error('TR: fail in posting client') }
   }
   //-----------------------------------------------------------------------------------------------------------------

   return (
      <div>
         <h1 style={{ textAlign: 'center' }}>Ввести клиента</h1>
         <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {
               Object.keys(state).map((key, index) => {
                  return (
                     <TextField
                        autoComplete='off'
                        key={index}
                        size='small'
                        variant="standard"
                        sx={{ width: '35%', m: 'auto', my: '3vh' }}
                        label={`${key}...`}
                        value={state[key]}
                        onChange={(event) => dispatch({ type: cases[index], payload: event.target.value })}
                     />
                  )
               })
            }
         </Box>
         <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
               onClick={() => submit()}
               sx={{ height: '4vh', mx: 'auto' }}
               size='small'
               variant='outlined'
               color='success'>
               submit
            </Button>
         </Box>
      </div>
   )
}