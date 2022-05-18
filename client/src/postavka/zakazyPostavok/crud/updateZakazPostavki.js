
import { useState, useEffect } from 'react'
import { Box, TextField, Button, FormControl, Select, MenuItem, InputLabel } from '@mui/material'
import axios from 'axios'
import { MakingTable } from '../../../table_select/makingTable'

export default function UpdateZakazPostavki() {

	const [zakazy, setZakazy] = useState()
	const [token, setToken] = useState('')
	const [idProduct, setIdProduct] = useState('')
	const [idDogovor, setIdDogovor] = useState('')
	const [quantity, setQuantity] = useState('')
	const [price, setPrice] = useState('')
	const [totalCost, setTotalCost] = useState('')
	const [currentZakaz, setCurrentZakaz] = useState('')
	const [tovary, setTovary] = useState()
	const [dogovora, setDogovora] = useState()

	const getZakaz = async () => {
		try {
			const response = await axios.get(`http://localhost:7000/getZakazPostavkiById/${token}`)
			setCurrentZakaz(response.data)
			setIdProduct(response.data[0].id_tovar)
			setIdDogovor(response.data[0].id_dogovor)
			setQuantity(response.data[0].quantity)
			setPrice(response.data[0].price)
			setTotalCost(response.data[0].totalCost)
		}
		catch (error) { throw new Error(setCurrentZakaz()) }
	}

	const getTovary = async () => {
		try {
			const response = await axios.get(`http://localhost:7000/spisokTovarov`)
			setTovary(response.data)
		}
		catch (error) { throw new Error(`TR: failed to get tovary`) }
	}

	const getDogovora = async () => {
		try {
			const response = await axios.get(`http://localhost:7000/spisokDogovorovPostavki`)
			setDogovora(response.data)
		}
		catch (error) { throw new Error(`TR: couldn't get dogovora postavki`) }
	}

	const getZakazy = async () => {
		try {
			const response = await axios.get('http://localhost:7000/spisokZakazovPostavki')
			setZakazy(response.data)
		}
		catch (error) { throw new ('failed to get zakazy') }
	}

	const updateZakaz = async () => {
		try {
			await axios.post(`http://localhost:7000/updateZakazPostavki`, { idProduct, idDogovor, quantity, price, totalCost, token })
			alert('zakaz postavki updated successfully')
			getZakazy()
			setToken('')
		}
		catch (error) { throw new Error('TR: failed to post dogovor postavki') }
	}

	useEffect(() => {
		getTovary()
		getDogovora()
		getZakazy()
	}, [])

	useEffect(() => {
		if (token) {
			getZakaz()
		}
	}, [token])

	useEffect(() => {
		setTotalCost(+quantity * +price)
	}, [quantity, price])

	return (
		<div>
			<h1 style={{ textAlign: 'center' }}>Редактировать заказ поставки</h1>
			<TextField
				value={token}
				onChange={event => setToken(event.target.value)}
				sx={{ width: '23vw', marginLeft: '36.5vw', marginBottom: '3vh' }}
				autoComplete='off'
				label="введите № заказа поставки"
				variant="standard" />
			{
				!token && zakazy && MakingTable(zakazy)
			}
			<div>
				{
					token && currentZakaz && MakingTable(currentZakaz)
				}
				{
					token && currentZakaz &&
					<div>
						<Box style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
							<FormControl style={{ width: '20vw' }}>
								<InputLabel>товар</InputLabel>
								<Select
									label="товар"
									value={idProduct ? idProduct : ''}
									onChange={event => setIdProduct(event.target.value)}
								>
									{
										tovary.map((item, index) => <MenuItem key={index} value={item.id}>{item.product}</MenuItem>)
									}
								</Select>
							</FormControl>

							<FormControl style={{ width: '20vw' }}>
								<InputLabel>договор</InputLabel>
								<Select
									label="договор"
									value={idDogovor}
									onChange={event => setIdDogovor(event.target.value)}
								>
									{
										dogovora.map((item, index) => <MenuItem key={index} value={item.id}>{item.id}</MenuItem>)
									}
								</Select>
							</FormControl>

							<TextField
								autoComplete='off'
								size='small'
								variant="standard"
								label='количество'
								value={quantity}
								onChange={event => setQuantity(event.target.value)}
							/>
							<TextField
								autoComplete='off'
								size='small'
								variant="standard"
								label='цена'
								value={price}
								onChange={event => setPrice(event.target.value)}
							/>
							<p style={{ textAlign: 'center' }}>общая стоимость: {totalCost}</p>
						</Box>
						<Button
							onClick={() => updateZakaz()}
							sx={{ height: '4vh', display: 'block', mx: 'auto', my: '3vh' }} size='small' variant='outlined' color='success'>update</Button>
					</div>
				}
			</div>
		</div>
	)
}
