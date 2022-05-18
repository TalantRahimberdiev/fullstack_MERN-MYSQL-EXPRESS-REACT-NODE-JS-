
import { Link, Routes, Route } from "react-router-dom"
import { Box } from '@mui/material'

import CreateShetaPostavki from './crud/createShetaPostavki'
import UnpaidShetaList from "./crud/unpaidSheta"
import PaidShetaList from "./crud/paidSheta"

import DailySales from "./crud/dailySales"
import DecadeSales from "./crud/decadeSales"
import MonthlySales from "./crud/monthlySales"
import YearlySales from './crud/yearlySales'

export default function MainShetaPostavki() {

	return (
		<div>
			<Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', my: '3vh' }}>
				<Link style={{ marginBottom: '2vh' }} to='CreateShetaPostavki'>оплатить заказ</Link>
				<Link style={{ marginBottom: '2vh' }} to='UnpaidShetaList'>неоплаченные счета</Link>
				<Link style={{ marginBottom: '2vh' }} to='PaidShetaList'>оплаченные счета</Link>
			</Box>

			<Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', my: '3vh' }}>
				<Link style={{ marginBottom: '2vh' }} to='DailySales'>поставки за сутки</Link>
				<Link style={{ marginBottom: '2vh' }} to='DecadeSales'>поставки за декаду</Link>
				<Link style={{ marginBottom: '2vh' }} to='MonthlySales'>поставки за месяц</Link>
				<Link style={{ marginBottom: '2vh' }} to='YearlySales'>поставки за год</Link>
			</Box>

			<Routes>
				<Route path="CreateShetaPostavki" element={<CreateShetaPostavki />} />
				<Route path="UnpaidShetaList" element={<UnpaidShetaList />} />
				<Route path="PaidShetaList" element={<PaidShetaList />} />
				<Route path="DailySales" element={<DailySales />} />
				<Route path="DecadeSales" element={<DecadeSales />} />
				<Route path="MonthlySales" element={<MonthlySales />} />
				<Route path="YearlySales" element={<YearlySales />} />
			</Routes>
		</div>
	)
}