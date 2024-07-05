import { TabProps, Tab } from '@mui/material'
import { FC, forwardRef } from 'react'

const AppTab: FC<TabProps> = forwardRef<HTMLDivElement, TabProps>((props, ref) => {
	return <Tab label {...props} ref={ref} />
})

AppTab.displayName = 'AppTab'
export default AppTab
