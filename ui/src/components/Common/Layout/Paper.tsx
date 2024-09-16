import { Paper, PaperProps } from '@mui/material'
import { FC } from 'react'

const AppPaper: FC<PaperProps> = ({ children, ...props }) => {
	return <Paper {...props}>{children}</Paper>
}

export default AppPaper
