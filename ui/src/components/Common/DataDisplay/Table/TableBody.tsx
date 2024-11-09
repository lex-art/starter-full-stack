import { TableBody, TableBodyProps } from '@mui/material'
import { FC } from 'react'

const AppTableBody: FC<TableBodyProps> = ({ children, ...props }) => {
	return <TableBody {...props}>{children}</TableBody>
}

AppTableBody.displayName = 'AppTableBody'
export default AppTableBody
