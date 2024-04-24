import CardComponent from '../../../components/card'
import React from 'react'

const DataMatrixSummaryTable = () => {
  return (
   <CardComponent text={"Data Matrix Summary"}/>
  )
}

export default DataMatrixSummaryTable

// import {
//     Collapse,
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableRow,
//   } from '@mui/material'
//   import { useState } from 'react'
// import CardComponent from '../../../components/card'
  
//   export default function DataMatrixSummaryTable() {
//     const Row = () => {
//       const [exp, setExp] = useState(false)
  
//       return (
//         <>
//           <Table>
//             <TableBody>
//               <TableRow>
//                 <TableCell onClick={() => setExp(!exp)}>Expand</TableCell>
//                 <TableCell colSpan={4}></TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//           <Collapse in={exp} timeout='auto' unmountOnExit>
//             <Table>
//               <TableBody>
//                 <TableRow>
//                   <TableCell />
//                   <TableCell>E</TableCell>
//                   <TableCell>F</TableCell>
//                   <TableCell>G</TableCell>
//                   <TableCell>H</TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </Collapse>
//         </>
//       )
//     }
  
//     return (
//       <>
//       <CardComponent text={"DataMatrixSummaryTable"}/>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell />
//               <TableCell>Header 1</TableCell>
//               <TableCell>Header 2</TableCell>
//               <TableCell>Header 3</TableCell>
//               <TableCell>Header 4</TableCell>
//             </TableRow>
//           </TableHead>
//         </Table>
//         {Array(5)
//           .fill()
//           .map(item => (
//             <Row />
//           ))}
//       </>
//     )
//   }