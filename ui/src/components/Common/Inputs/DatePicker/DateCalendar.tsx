import { font } from '@/lib/design-tokens'
import { TextFieldProps } from '@mui/material'
import { DateCalendar, DateCalendarProps } from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'
import { FC, forwardRef } from 'react'

interface AppDateCalendarProps extends DateCalendarProps<Dayjs> {
	error?: boolean
	helperText?: string
	variant?: 'standard' | 'outlined' | 'filled'
	size?: TextFieldProps['size']
}

const AppDateCalendar: FC<AppDateCalendarProps> = forwardRef<HTMLDivElement, AppDateCalendarProps>(
	(props, ref) => {
		const { error, helperText, variant, size, sx, ...rest } = props
		return (
			<DateCalendar
				sx={{
					...sx,
					svg: {
						width: '3.5rem',
						height: '3.5rem'
					},
					div: {
						fontSize: font.sizes.fontSizeMedium
					},
					button: {
						fontSize: font.sizes.fontSizeMedium
					},
					span: {
						fontSize: font.sizes.fontSizeMedium
					},
					li: {
						fontSize: font.sizes.fontSizeMedium
					}
				}}
				{...rest}
				ref={ref}
			/>
		)
	}
)

AppDateCalendar.displayName = 'AppDateCalendar'
export default AppDateCalendar
