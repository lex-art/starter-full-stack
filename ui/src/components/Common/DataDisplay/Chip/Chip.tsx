import { font } from '@/lib/designTokens'
import { Chip, ChipProps, ThemeOptions } from '@mui/material'
import { FC, forwardRef } from 'react'



const AppChip = forwardRef<HTMLDivElement, ChipProps>((props, ref) => {
	return <Chip ref={ref} {...props} />
})

AppChip.displayName = 'AppChip'
export default AppChip
