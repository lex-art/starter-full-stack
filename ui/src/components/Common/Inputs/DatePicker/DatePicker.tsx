'use client'
import { colors, font } from '@/lib/designTokens'
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded'
import { IconButton, TextFieldProps } from '@mui/material'
import { ThemeOptions, styled } from '@mui/material/styles'
import { PickersDay } from '@mui/x-date-pickers'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker'
import type {} from '@mui/x-date-pickers/themeAugmentation'
import { Dayjs } from 'dayjs'
import 'dayjs/locale/es'
import { FC, forwardRef } from 'react'


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

interface IDatePickerProps extends DatePickerProps<Dayjs> {
	error?: boolean
	helperText?: string
	variant?: 'standard' | 'outlined' | 'filled'
	size?: TextFieldProps['size']
	onClear?: () => void
}

const AppDatePicker: FC<IDatePickerProps> = forwardRef<HTMLDivElement, IDatePickerProps>(
	({ error, helperText, variant, size, onClear, ...rest }, ref) => {
		return (
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
		)
	}
)

AppDatePicker.displayName = 'App Date Picker'
export default AppDatePicker
