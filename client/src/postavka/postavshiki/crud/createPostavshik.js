
import { useReducer } from "react"
import { Box, Button, TextField } from '@mui/material'
import axios from "axios"

export default function CreatePostavshik() {

   const initialState = {
      organization: '',
      address: '',
      manager: '',
      costController: '',
      bankRequisites: '',
   }

   const [state, dispatch] = useReducer(reducer, initialState)

   function reducer(state, action) {
      switch (action.type) {
         case 'ORGANIZATION': return { ...state, organization: action.payload }
         case 'ADDRESS': return { ...state, address: action.payload }
         case 'MANAGER': return { ...state, manager: action.payload }
         case 'COSTCONTROLLER': return { ...state, costController: action.payload }
         case 'BANKREQUISITES': return { ...state, bankRequisites: action.payload }
         case 'CLEAR': return { organization: '', address: '', manager: '', costController: '', production: '', bankRequisites: '', byType: '' }
         default: return state
      }
   }
   const cases = 'ORGANIZATION ADDRESS MANAGER COSTCONTROLLER BANKREQUISITES'.split(' ')

   //-------------------CREATE-----------------------------------------

   const submit = async () => {

      const organization = state.organization
      const address = state.address
      const manager = state.manager
      const costController = state.costController
      const bankRequisites = state.bankRequisites

      try {
         await axios.post(`http://localhost:7000/CreatePostavshik`, { organization, address, manager, costController, bankRequisites })
         alert('postavshik created successfully')
         dispatch({ type: 'CLEAR' })
      }
      catch (error) { throw new Error('TR: fail in posting postavshik') }
   }
   //-----------------------------------------------------------------------------------------------------------------

   return (
      <div>
         <h1 style={{ textAlign: 'center' }}>Ввести поставщика</h1>
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