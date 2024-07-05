import { Tabs, TabsProps } from '@mui/material'
import { FC, forwardRef } from 'react'

const AppTabs: FC<TabsProps> = forwardRef<HTMLDivElement, TabsProps>(({ children, ...rest }, ref) => {
	return (
		<Tabs {...rest} ref={ref}>
			{children}
		</Tabs>
	)
})

AppTabs.displayName = 'AppTabs'
export default AppTabs
