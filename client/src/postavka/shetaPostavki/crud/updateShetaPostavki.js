
import { useState, useReducer, useEffect } from 'react'
import { Box, TextField, Button } from '@mui/material'
import axios from 'axios'

export default function UpdateProizvoditel() {

	const [token, setToken] = useState('')

	const initialState = {
		organization: '',
		address: '',
		manager: '',
		costController: '',
		production: '',
		bankRequisites: '',
		byType: '',
	}

	const [state, dispatch] = useReducer(reducer, initialState)

	function reducer(state, action) {
		switch (action.type) {
			case 'GETPROIZVODITEL': return { ...action.payload }
			case 'ORGANIZATION': return { ...state, organization: action.payload }
			case 'ADDRESS': return { ...state, address: action.payload }
			case 'MANAGER': return { ...state, manager: action.payload }
			case 'COSTCONTROLLER': return { ...state, costController: action.payload }
			case 'PRODUCTION': return { ...state, production: action.payload }
			case 'BANKREQUISITES': return { ...state, bankRequisites: action.payload }
			case 'BYTYPE': return { ...state, byType: action.payload }
			case 'CLEAR': return { organization: '', address: '', manager: '', costController: '', production: '', bankRequisites: '', byType: '' }
			default: return state
		}
	}
	const cases = 'ORGANIZATION ADDRESS MANAGER COSTCONTROLLER PRODUCTION BANKREQUISITES BYTYPE'.split(' ')


	//-----------------------GET MATCHING PROIZVODITEL-------------------------------------------------------------

	const getProizvoditel = async () => {
		try {
			const response = await axios.get(`http://localhost:7000/getSelectedById/${token}`)

			dispatch({ type: 'GETPROIZVODITEL', payload: { ...response.data[0] } })
		}
		catch (error) { }
	}

	//------------------------UPDATE PROIZVODITEL-------------------------------------------------------------------

	const updateProizvoditel = async () => {
		try {
			const organization = state.organization
			const address = state.address
			const manager = state.manager
			const costController = state.costController
			const production = state.production
			const bankRequisites = state.bankRequisites
			const byType = state.byType;

			await axios.post(`http://localhost:7000/updateProizvoditel`, { organization, address, manager, costController, production, bankRequisites, byType, token })
			alert('proizvoditel updated successfully')
			dispatch({ type: 'CLEAR' })
		}
		catch (error) { throw new Error('TR: fail in posting proizvoditel') }
	}

	useEffect(() => {
		if (token) {
			dispatch({ type: 'CLEAR' })
			getProizvoditel()
		}
	}, [token])

	//-----------------------------------------------------------------------------------------------------------------
	return (
		<div>
			<h1 style={{ textAlign: 'center' }}>Редактировать производителя</h1>
			<Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
				<TextField
					value={token}
					onChange={event => setToken(event.target.value)}
					sx={{ width: '23vw' }}
					autoComplete='off'
					label="введите № производителя"
					variant="standard" />
			</Box>
			{
				state.organization && (
					<div>
						<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
							{
								Object.entries(state).map((item, index) => {
									return (
										<TextField
											autoComplete='off'
											key={index}
											variant="standard"
											sx={{ width: '35%', m: 'auto', my: '3vh' }}
											size='small'
											label={item[0]}
											value={item[1]}
											onChange={(event) => dispatch({ type: cases[index], payload: event.target.value })}
										/>
									)
								})
							}
						</Box>
						<Box sx={{ display: 'flex', justifyContent: 'center' }}>
							<Button onClick={() => updateProizvoditel()} sx={{ height: '4vh', mx: 'auto' }} size='small' variant='outlined' color='success'>update</Button>
						</Box>
					</div>
				)
			}
		</div>
	)
}
