import { TableContainer, TableContainerProps } from '@mui/material'
import { FC } from 'react'

const AppTableContainer: FC<TableContainerProps> = ({ children, ...props }) => {
	return <TableContainer {...props}>{children}</TableContainer>
}

export { AppTableContainer }
AppTableContainer.displayName = 'AppTableContainer'
export default AppTableContainer
