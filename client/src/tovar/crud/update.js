
import { useState, useEffect } from 'react'
import { Box, TextField, Button, FormControl, Select, MenuItem, InputLabel } from '@mui/material'
import axios from 'axios'
import { MakingTable } from '../../table_select/makingTable'

export default function Update() {

	const [tovars, setTovars] = useState()
	const [token, setToken] = useState('')
	const [product, setProduct] = useState('')
	const [unit, setUnit] = useState('')
	const [currentTovar, setCurrentTovar] = useState()
	const measurement = ['метр', 'кг', 'литр', 'мешок', 'тонна', 'штука']

	const getTovar = async () => {
		try {
			const response = await axios.get(`http://localhost:7000/getTovarById/${token}`)
			setProduct(response.data[0].product)
			setUnit(response.data[0].unit)
			setCurrentTovar(response.data)
		}
		catch (error) { throw new Error('failed to get tovar') }
	}

	const updateTovar = async () => {
		try {
			await axios.post(`http://localhost:7000/updateTovar`, { product, unit, token })
			alert('tovar updated successfully')
			setToken('')
			setTovars('')
		}
		catch (error) { throw new Error('TR: failed to post dogovor na postavku') }
	}

	useEffect(() => {
		if (token) getTovar()
	}, [token])

	useEffect(() => {
		const getTovars = async () => {
			try {
				const response = await axios.get('http://localhost:7000/spisokTovarov')
				setTovars(response.data)
			}
			catch (error) { throw new (error) }
		}
		getTovars()
	}, [])

	return (
		<div>
			<h1 style={{ textAlign: 'center' }}>Редактировать товар</h1>
			<TextField
				value={token}
				onChange={event => setToken(event.target.value)}
				sx={{ width: '23vw', marginLeft: '36.5vw', marginBottom: '3vh' }}
				autoComplete='off'
				label="введите № товара"
				variant="standard" />
			{
				!token && tovars && MakingTable(tovars)
			}
			{
				token &&
				<div>
					{
						currentTovar && MakingTable(currentTovar)
					}
					<Box style={{ display: 'flex', justifyContent: 'space-around' }}>
						<TextField
							autoComplete='off'
							size='small'
							variant="standard"
							label='название товара'
							value={product}
							onChange={event => setProduct(event.target.value)}
						/>
						<FormControl style={{ width: '25vw' }}>
							<InputLabel>поставщик</InputLabel>
							<Select
								label="поставщик"
								value={unit}
								onChange={event => setUnit(event.target.value)}
							>
								{
									measurement.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
								}
							</Select>
						</FormControl>
					</Box>
					<div>
						<Button
							onClick={() => updateTovar()}
							sx={{ height: '4vh', display: 'block', mx: 'auto', my: '3vh' }} size='small' variant='outlined' color='success'>update</Button>
					</div>
				</div>
			}
		</div>
	)
}
