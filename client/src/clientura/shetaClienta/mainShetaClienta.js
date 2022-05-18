
import { Link, Routes, Route } from "react-router-dom"
import { Box } from '@mui/material'

import CreateShetaClienta from './crud/createShetaClienta'
import UnpaidShetaList from "./crud/unpaidSheta"
import PaidShetaList from "./crud/paidSheta"
import DailySales from "./crud/dailySales"
import DecadeSales from "./crud/decadeSales"
import MonthlySales from "./crud/monthlySales"
import YearlySales from './crud/yearlySales'

export default function MainShetaProdaji() {

	return (
		<div>
			<Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', my: '3vh' }}>
				<Link style={{ marginBottom: '2vh' }} to='CreateShetaClienta'>оплатить заказ клиента</Link>
				<Link style={{ marginBottom: '2vh' }} to='UnpaidShetaList'>неоплаченные счета клиентов</Link>
				<Link style={{ marginBottom: '2vh' }} to='PaidShetaList'>оплаченные счета клиентов</Link>

			</Box>
			<Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', my: '3vh' }}>
				<Link style={{ marginBottom: '2vh' }} to='DailySales'>продажи за сутки</Link>
				<Link style={{ marginBottom: '2vh' }} to='DecadeSales'>продажи за декаду</Link>
				<Link style={{ marginBottom: '2vh' }} to='MonthlySales'>продажи за месяц</Link>
				<Link style={{ marginBottom: '2vh' }} to='YearlySales'>продажи за год</Link>

			</Box>
			<Routes>
				<Route path="CreateShetaClienta" element={<CreateShetaClienta />} />
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