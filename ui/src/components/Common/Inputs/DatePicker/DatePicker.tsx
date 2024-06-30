'use client'
import { FC, forwardRef } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { colors, font } from '@/lib/design-tokens'
import { IconButton, TextFieldProps } from '@mui/material'
import { ThemeOptions, styled } from '@mui/material/styles'
import { LocalizationProvider, PickersDay } from '@mui/x-date-pickers'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker'
import type {} from '@mui/x-date-pickers/themeAugmentation'
import dayjs from 'dayjs'
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded'
import 'dayjs/locale/es'

const AppDatePickerTheme: ThemeOptions = {
	components: {
		MuiDateCalendar: {
			styleOverrides: {
				root: {
					borderWidth: 0
				}
			}
		},
		MuiDayCalendar: {
			styleOverrides: {
				root: {
					borderRadius: '0.5rem'
				}
			}
		},
		MuiDatePicker: {
			defaultProps: {}
		}
	}
}

const StyledButton = styled(IconButton)(({ theme }) => ({
	borderRadius: theme.shape.borderRadius,
	fontSize: '2rem'
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
	variant?: 'standard' | 'outlined' | 'filled'
	size?: TextFieldProps['size']
	onClear?: () => void
}

const AppDatePicker: FC<IDatePickerProps> = forwardRef<HTMLDivElement, IDatePickerProps>(
	({ error, helperText, variant, size, onClear, ...rest }, ref) => {
		return (
			<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
				<DatePicker
					ref={ref}
					slots={{
						openPickerIcon: EditCalendarRoundedIcon,
						openPickerButton: StyledButton,
						day: StyledDay as any
					}}
					slotProps={{
						openPickerIcon: { fontSize: '1.5rem' },
						popper: { color: 'secondary' },
						textField: {
							error,
							helperText,
							variant,
							size
						},
						field: {
							clearable: !!onClear,
							onClear
						},
						layout: {
							sx: {
								'&.MuiButtonBase-root': {
									'&.MuiSvgIcon-root ': {
										fontSize: '2rem'
									},
									svg: {
										width: '0.8rem',
										height: '0.8rem',
										fontSize: '0.8rem'
									}
								},
								'&.MuiPickersLayout-root': {
									svg: {
										width: '3rem',
										height: '3rem'
									},
									div: {
										fontSize: font.sizes.fontSizeMedium
									},
									button: {
										fontSize: font.sizes.fontSizeMedium
									},
									span: {
										fontSize: font.sizes.fontSizeMedium
									}
								}
							}
						}
					}}
					{...rest}
				/>
			</LocalizationProvider>
		)
	}
)

AppDatePicker.displayName = 'App Date Picker'
export { AppDatePicker, AppDatePickerTheme }
export default AppDatePicker
