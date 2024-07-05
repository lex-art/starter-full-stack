import { CircularProgress, SxProps, Theme } from '@mui/material'
import { forwardRef } from 'react'
import AppGrid from '../../Layout/Grid/Grid'

interface TBLoaderProps {
	color?: 'secondary' | 'primary' | 'error' | 'info' | 'success' | 'warning' | 'inherit'
	size?: number
	width?: string | number
	sxGrid?: SxProps<Theme> | undefined
}
const AppCircularLoader = forwardRef<HTMLDivElement, TBLoaderProps>((props, ref) => {
	const { color, size, width, sxGrid } = props
	return (
		<AppGrid
			ref={ref}
			alignContent="center"
			alignSelf="center"
			width={width ?? '100%'}
			textAlign="center"
			sx={sxGrid}
		>
			<CircularProgress color={color ?? 'primary'} size={size ?? 50} />
		</AppGrid>
	)
})

AppCircularLoader.displayName = 'AppCircularLoader'
export { AppCircularLoader }
export default AppCircularLoader
