
import { useState, useReducer, useEffect } from 'react'
import { Box, TextField, Button } from '@mui/material'
import axios from 'axios'

export default function UpdateClient() {

	const [token, setToken] = useState('')

	const initialState = {
		organization: '',
		address: '',
		manager: '',
		costController: '',
		bank_account: '',
	}

	const [state, dispatch] = useReducer(reducer, initialState)

	function reducer(state, action) {
		switch (action.type) {
			case 'POSTAVSHIK': return { ...action.payload }
			case 'ORGANIZATION': return { ...state, organization: action.payload }
			case 'ADDRESS': return { ...state, address: action.payload }
			case 'MANAGER': return { ...state, manager: action.payload }
			case 'COSTCONTROLLER': return { ...state, costController: action.payload }
			case 'BANK': return { ...state, bank_account: action.payload }
			case 'CLEAR': return { organization: '', address: '', manager: '', costController: '', bank_account: '' }
			default: return state
		}
	}
	const cases = 'ORGANIZATION ADDRESS MANAGER COSTCONTROLLER BANK'.split(' ');

	const getPostavshik = async () => {
		try {
			const response = await axios.get(`http://localhost:7000/getPostavshikById/${token}`)

			dispatch({ type: 'POSTAVSHIK', payload: { ...response.data[0] } })
		}
		catch (error) { throw new (error) }
	}

	const updatePostavshik = async () => {
		try {
			const organization = state.organization
			const address = state.address
			const manager = state.manager
			const costController = state.costController
			const bank_account = state.bank_account

			await axios.post(`http://localhost:7000/updatePostavshik`, { organization, address, manager, costController, bank_account, token })
			alert('postavshik updated successfully')
			setToken('')
			dispatch({ type: 'CLEAR' })
		}
		catch (error) { throw new Error('TR: fail in posting postavshik') }
	}

	useEffect(() => {
		if (token) {
			dispatch({ type: 'CLEAR' })
			getPostavshik()
		}
	}, [token])

	//-----------------------------------------------------------------------------------------------------------------
	return (
		<div>
			<h1 style={{ textAlign: 'center' }}>Редактировать поставщика</h1>
			<Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
				<TextField
					value={token}
					onChange={event => setToken(event.target.value)}
					sx={{ width: '23vw' }}
					autoComplete='off'
					label="введите № поставщика"
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
							<Button onClick={() => updatePostavshik()} sx={{ height: '4vh', mx: 'auto' }} size='small' variant='outlined' color='success'>update</Button>
						</Box>
					</div>
				)
			}
		</div>
	)
}
