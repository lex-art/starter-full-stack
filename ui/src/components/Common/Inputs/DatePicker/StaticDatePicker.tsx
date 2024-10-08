'use client'
import { font } from '@/lib/designTokens'
import { ThemeOptions } from '@mui/material'
import { StaticDatePicker, StaticDatePickerProps } from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'
import { FC, forwardRef } from 'react'

const AppStaticDatePickerTheme: ThemeOptions = {
	components: {
		MuiDateCalendar: {
			styleOverrides: {
				root: {
					fontSize: font.sizes.fontSizeMedium
				}
			}
		}
	}
}

interface AppStaticDatePickerProps extends StaticDatePickerProps<Dayjs> {
	error?: boolean
	helperText?: string
	toolbarTitle?: string
}
const AppStaticDatePicker: FC<AppStaticDatePickerProps> = forwardRef<
	HTMLDivElement,
	AppStaticDatePickerProps
>(({ error, helperText, ...props }, ref) => {
	return (
		<StaticDatePicker
			ref={ref}
			localeText={{
				toolbarTitle: props.toolbarTitle
			}}
			slotProps={{
				layout: {
					sx: {
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
						}
					}
				}
			}}
			{...props}
		/>
	)
})

AppStaticDatePicker.displayName = 'AppStaticDatePicker'
export { AppStaticDatePicker, AppStaticDatePickerTheme }
export default AppStaticDatePicker
