import { font } from '@/lib/design-tokens'
import { IconButton, TextFieldProps, styled } from '@mui/material'
import { TimePicker, TimePickerProps } from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'
import { FC, forwardRef } from 'react'

interface ITimePickerProps extends TimePickerProps<Dayjs> {
	error?: boolean
	helperText?: string
	variant?: TextFieldProps['variant']
	size?: TextFieldProps['size']
}

const StyledButton = styled(IconButton)(({ theme }) => ({
	borderRadius: theme.shape.borderRadius,
	height: '3rem',
	width: '3rem',
	padding: '0 2rem',
	fontSize: '1.5rem'
}))

const AppTimePicker: FC<ITimePickerProps> = forwardRef<HTMLDivElement, ITimePickerProps>((props, ref) => {
	const { error, helperText, variant, size, ...rest } = props

	return (
		<TimePicker
			slots={{
				openPickerButton: StyledButton
			}}
			slotProps={{
				textField: {
					error,
					helperText,
					variant,
					size
				},
				layout: {
					sx: {
						li: {
							fontSize: font.sizes.fontSizeMedium
						}
					}
				}
			}}
			ref={ref}
			{...rest}
		/>
	)
})

AppTimePicker.displayName = 'AppTimePicker'
export default AppTimePicker
