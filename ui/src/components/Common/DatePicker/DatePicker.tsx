import { colors } from '@/lib/design-tokens'
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded'
import { IconButton } from '@mui/material'
import { ThemeOptions, styled } from '@mui/material/styles'
import { PickersDay } from '@mui/x-date-pickers'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker'
import type {} from '@mui/x-date-pickers/themeAugmentation'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { FC } from 'react'

const AppDatePickerTheme: ThemeOptions = {
	components: {
		MuiDateCalendar: {
			styleOverrides: {
				root: {
					borderRadius: 22,
					borderWidth: 0
				}
			}
		},
		MuiDatePicker: {}
	}
}

const StyledButton = styled(IconButton)(({ theme }) => ({
	borderRadius: theme.shape.borderRadius,
	fontSize: '3.5rem'
}))

const StyledDay = styled(PickersDay)(({ theme }) => ({
	borderRadius: theme.shape.borderRadius,

	':hover': {
		backgroundColor: colors.light.secondary,
		color: 'white'
	},
	':focus': {
		backgroundColor: colors.light.secondary,
		color: 'white'
	}
}))

interface IDatePickerProps extends DatePickerProps<dayjs.Dayjs> {
	error?: boolean
	helperText?: string
}

const AppDatePicker: FC<IDatePickerProps> = ({ error, helperText, ...rest }) => {
	return (
		<DatePicker
			slots={{
				openPickerIcon: EditCalendarRoundedIcon,
				openPickerButton: StyledButton,
				day: StyledDay as any
			}}
			slotProps={{
				openPickerIcon: { fontSize: '3.5rem' },
				popper: { color: 'secondary' },
				textField: {
					error,
					helperText
				},
				layout: {
					sx: {
						'& .MuiPickersYear-yearButton.Mui-selected': {
							backgroundColor: colors.light.secondary,
							color: 'white'
						},
						'& .MuiPickersYear-yearButton.Mui-selected:focus': {
							backgroundColor: colors.light.secondary,
							color: 'white'
						},
						'&.MuiButtonBase-root': {
							'&.MuiSvgIcon-root ': {
								fontSize: '6rem',
								backgroundColor: colors.light.secondary
							},
							svg: {
								width: '5rem',
								height: '5rem',
								fontSize: '6rem'
							}
						},
						'& .MuiPickersDay-root': {
							'&.Mui-selected': {
								backgroundColor: colors.light.secondary,
								colors: 'white'
							},
							'&.Mui-selected:focus': {
								backgroundColor: colors.light.secondary,
								colors: 'white'
							}
						},
						'&.MuiPickersLayout-root': {
							svg: {
								width: '3rem',
								height: '3rem'
							},
							div: {
								fontSize: '2.3rem'
							},
							button: {
								fontSize: '1.9rem'
							},
							span: {
								fontSize: '1.9rem'
							}
						}
					}
				}
			}}
			{...rest}
		/>
	)
}

AppDatePicker.displayName = 'App Date Picker'
export { AppDatePicker, AppDatePickerTheme }
export default AppDatePicker
