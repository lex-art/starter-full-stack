import { FC, forwardRef } from 'react'
import AppBox from '../Common/Layout/Box'

interface TabPanelProps {
	children?: React.ReactNode
	index: number
	value: number
}

const AppCustomTabPanel: FC<TabPanelProps> = forwardRef<HTMLDivElement, TabPanelProps>(
	({ children, value, index, ...other }, ref) => {
		return (
			<div
				ref={ref}
				role="tabpanel"
				hidden={value !== index}
				id={`simple-tabpanel-${index}`}
				aria-labelledby={`simple-tab-${index}`}
				{...other}
			>
				{value === index && <AppBox sx={{ p: 3 }}>{children}</AppBox>}
			</div>
		)
	}
)

AppCustomTabPanel.displayName = 'AppCustomTabPanel'
export default AppCustomTabPanel
