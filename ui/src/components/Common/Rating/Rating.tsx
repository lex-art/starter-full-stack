import { Rating, RatingProps, ThemeOptions } from '@mui/material'
import { forwardRef } from 'react'
import { font } from '@/lib/design-tokens'
import AppBox from '../Layout/Box'
import AppFormLabel from '../FormControl/FormLabel'

type AppRatingProps = RatingProps & {
	label: string
}

const AppRatingTheme: ThemeOptions = {
	components: {
		MuiRating: {
			defaultProps: {
				color: 'primary'
			},
			styleOverrides: {
				root: {
					fontSize: font.sizes.fontSizeLarge * 2
				},
				sizeLarge: {
					fontSize: font.sizes.fontSizeLarge * 3
				},
				sizeSmall: {
					fontSize: font.sizes.fontSizeLarge
				}
			}
		}
	}
}
const AppRating = forwardRef<HTMLDivElement, AppRatingProps>((props, ref) => {
	const { label, ...rest } = props
	return (
		<AppBox display="flex" flexDirection="column">
			<AppFormLabel>{label}</AppFormLabel>
			<Rating {...rest} />
		</AppBox>
	)
})

AppRating.displayName = 'AppRadio'
export { AppRating, AppRatingTheme }
export default AppRating
