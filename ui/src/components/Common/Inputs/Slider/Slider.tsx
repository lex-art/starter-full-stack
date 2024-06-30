import { Rating, RatingProps, Slide, Slider, SliderProps, ThemeOptions } from '@mui/material'
import { forwardRef } from 'react'
import { font } from '@/lib/design-tokens'
import AppBox from '../../LAyout/Box'
import AppFormLabel from '../../FormControl/FormLabel'

interface AppSliderProps extends SliderProps {
	rightIcon?: React.ReactNode
	leftIcon?: React.ReactNode
	label?: string
	width?: string | number
}

const AppSliderTheme: ThemeOptions = {
	components: {
		MuiSlider: {
			defaultProps: {
				color: 'primary'
			},
			styleOverrides: {
				root: {
					fontSize: font.sizes.fontSizeLarge * 2
				}
			}
		}
	}
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
export { AppSlider, AppSliderTheme }
export default AppSlider
