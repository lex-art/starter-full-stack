import { CircularProgress } from '@mui/material'
import { forwardRef } from 'react'
import AppGrid from '../Grid/Grid'

interface TBLoadedrProps {
	color?: 'secondary' | 'primary' | 'error' | 'info' | 'success' | 'warning' | 'inherit'
	size?: number
	width?: string | number
}
const AppCircularLoader = forwardRef<HTMLDivElement, TBLoadedrProps>((props, ref) => {
	const { color, size, width } = props
	return (
		<AppGrid ref={ref} alignContent="center" alignSelf="center" width={width ?? '100%'} textAlign="center">
			<CircularProgress color={color ?? 'primary'} size={size ?? 50} />
		</AppGrid>
	)
})

AppCircularLoader.displayName = 'AppCircularLoader'
export { AppCircularLoader }
export default AppCircularLoader
