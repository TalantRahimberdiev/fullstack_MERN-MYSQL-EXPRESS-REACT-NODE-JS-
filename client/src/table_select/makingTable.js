
import { TableHead, TableRow, TableCell, TableBody, TableContainer, Table, Paper } from '@mui/material'

export const MakingTable = tovary => {
   return (
      <TableContainer component={Paper} sx={{ maxWidth: '89vw', backgroundColor: 'powderblue', m: 'auto', mb: '5vh', mt: '3vh' }}>
         <Table>
            <TableHead sx={{ backgroundColor: 'black' }}>
               <TableRow>
                  {
                     Object.keys(tovary[0]).map((key, index) => {
                        return <TableCell sx={{ color: 'white' }} key={index}>{key}</TableCell>
                     })
                  }
               </TableRow>
            </TableHead>
            
            <TableBody>
               {
                  tovary.map((item, index) => {
                     return (
                        <TableRow key={index}>
                           {
                              Object.values(item).map((value, i) => {
                                 return <TableCell key={i}>{value}</TableCell>
                              })
                           }
                        </TableRow>
                     )
                  })
               }
            </TableBody>
         </Table>
      </TableContainer>
   )
}