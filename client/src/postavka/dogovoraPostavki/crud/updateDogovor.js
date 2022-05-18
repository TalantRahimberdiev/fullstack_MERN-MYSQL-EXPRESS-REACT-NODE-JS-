
import { useState, useEffect } from 'react'
import { Box, TextField, Button, FormControl, Select, MenuItem, InputLabel } from '@mui/material'
import axios from 'axios'

export default function UpdateDogovor() {

	const [token, setToken] = useState('')
	const [text, setText] = useState()
	const [postavshiks, setPostavshiks] = useState()
	const [id, setId] = useState('')

	const getDogovor = async () => {
		try {
			const response = await axios.get(`http://localhost:7000/getDogovorPostavkiById/${token}`)
			setText(response.data[0].text)
			setId(response.data[0].id_postavshik)
		}
		catch (error) { throw new Error('failed to get dogovor postavki') }
	}

	const updateDogovor = async () => {
		try {
			await axios.post(`http://localhost:7000/updateDogovorPostavki`, { text, id, token })
			alert('dogovor postavki updated successfully')
			setToken('')
			setText('')
		}
		catch (error) { throw new Error('TR: failed to post dogovor na postavku') }
	}

	useEffect(() => {
		if (token) getDogovor()
	}, [token])

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

	return (
		<div>
			<h1 style={{ textAlign: 'center' }}>Редактировать договор поставки</h1>
			<TextField
				value={token}
				onChange={event => setToken(event.target.value)}
				sx={{ width: '23vw', marginLeft: '36.5vw', marginBottom: '3vh' }}
				autoComplete='off'
				label="введите № договора поставки"
				variant="standard" />
			{
				token &&
				<div>
					<Box style={{ display: 'flex', justifyContent: 'space-around' }}>
						<FormControl style={{ width: '25vw' }}>
							<InputLabel>поставщик</InputLabel>
							<Select
								label="поставщик"
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
					<div>
						<textarea
							value={text}
							rows={15}
							style={{ width: '55vw', display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '5vh' }}
							onChange={event => setText(event.target.value)}
						/>
						<Button
							onClick={() => updateDogovor()}
							sx={{ height: '4vh', display: 'block', mx: 'auto', my: '3vh' }} size='small' variant='outlined' color='success'>update</Button>
					</div>
				</div>
			}
		</div>
	)
}
