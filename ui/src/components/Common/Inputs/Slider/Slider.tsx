import { font } from '@/lib/designTokens'
import { Slider, SliderProps, ThemeOptions } from '@mui/material'
import { forwardRef } from 'react'
import AppFormLabel from '../../FormControl/FormLabel'
import AppBox from '../../Layout/Box'

interface AppSliderProps extends SliderProps {
	rightIcon?: React.ReactNode
	leftIcon?: React.ReactNode
	label?: string
	width?: string | number
}


const AppSlider = forwardRef<HTMLDivElement, AppSliderProps>((props, ref) => {
	const { rightIcon, leftIcon, label, width, ...rest } = props
	return (
		<AppBox
			sx={{
				width: width || 'auto'
			}}
		>
			<AppFormLabel>{label}</AppFormLabel>
			<AppBox display="flex">
				{leftIcon}
				<Slider
					sx={{
						mx: 1
					}}
					{...rest}
				/>
				{rightIcon}
			</AppBox>
		</AppBox>
	)
})

AppSlider.displayName = 'AppSlider'
export default AppSlider
