import { FC } from 'react'
import { Paper, PaperProps } from '@mui/material'

const AppPaper: FC<PaperProps> = ({ children, ...props }) => {
	return <Paper {...props}>{children}</Paper>
}

export default AppPaper
