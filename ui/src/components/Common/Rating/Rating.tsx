import { font } from '@/lib/designTokens'
import { Rating, RatingProps, ThemeOptions } from '@mui/material'
import { forwardRef } from 'react'
import AppFormLabel from '../FormControl/FormLabel'
import AppBox from '../Layout/Box'

type AppRatingProps = RatingProps & {
	label: string
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
export default AppRating
