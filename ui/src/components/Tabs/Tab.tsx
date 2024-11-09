import { font } from '@/lib/designTokens'
import { Tab, TabProps, ThemeOptions } from '@mui/material'
import { forwardRef } from 'react'


const AppTab = forwardRef<HTMLDivElement, TabProps>((props, ref) => {
	return <Tab label {...props} ref={ref} />
})

AppTab.displayName = 'AppTab'
export default AppTab
