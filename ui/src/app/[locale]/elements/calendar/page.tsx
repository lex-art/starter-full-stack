'use client'
import AppDateCalendar from '@/components/Common/Inputs/DatePicker/DateCalendar'
import AppDatePicker from '@/components/Common/Inputs/DatePicker/DatePicker'
import AppStaticDatePicker from '@/components/Common/Inputs/DatePicker/StaticDatePicker'
import AppTimePicker from '@/components/Common/Inputs/DatePicker/TimePicker'
import AppDivider from '@/components/Common/DataDisplay/Divider/Divider'
import AppGrid from '@/components/Common/Layout/Grid/Grid'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import dayjs from 'dayjs'
import React from 'react'

export default function Calendar() {
	return (
		<AppGrid item width="100%">
			<AppDivider marginY="0.5rem" textAlign="left">
				<AppTypography variant="subtitle2" fontWeight="Bold">
					Calendar
				</AppTypography>
			</AppDivider>
			<AppTypography variant="subtitle2">Calendar</AppTypography>
			<AppGrid
				container
				display="grid"
				gap="2rem"
				gridTemplateColumns={{
					xs: '1fr',
					sm: '1fr',
					lg: '49% 1fr',
					xl: '49% 1fr',
					xxl: '49% 1fr'
				}}
			>
				<AppDatePicker label="Date" defaultValue={dayjs(new Date())} />
				<AppDatePicker
					label="Date"
					defaultValue={dayjs(new Date())}
					variant="standard"
					error
					helperText="This field is required"
				/>
				<AppDatePicker label="Date" defaultValue={dayjs(new Date())} variant="filled" disabled />
				<AppDatePicker label="Date" error helperText="This field is required" />
				<AppDatePicker label="Date readonly" defaultValue={dayjs(new Date())} size="medium" readOnly />
				<AppDatePicker
					label="Date clerable"
					value={dayjs(new Date())}
					defaultValue={dayjs(new Date())}
					size="small"
					onClear={() => {
						return
					}}
				/>
				<AppTimePicker label="Basic date picker" />
				<AppTimePicker label="Basic dates picker" size="small" variant="standard" />
				<AppTimePicker label="Basic time picker" size="medium" />
				<AppTimePicker label="Basic time picker" size="small" variant="outlined" />
			</AppGrid>
			<AppGrid
				container
				display="grid"
				gap="2rem"
				gridTemplateColumns="repeat(auto-fill, minmax(30rem, 1fr))"
			>
				<AppStaticDatePicker toolbarTitle="Custom title" />
				<AppStaticDatePicker />
				<AppDateCalendar />
			</AppGrid>
		</AppGrid>
	)
}
