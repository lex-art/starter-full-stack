import { Collapse, CollapseProps } from '@mui/material'
import { forwardRef } from 'react'

const AppCollapse = forwardRef<HTMLDivElement, CollapseProps>(({ children, ...rest }, ref) => {
	return (
		<Collapse ref={ref} {...rest}>
			{children}
		</Collapse>
	)
})

AppCollapse.displayName = 'AppCollapse'
export { AppCollapse }
export default AppCollapse
