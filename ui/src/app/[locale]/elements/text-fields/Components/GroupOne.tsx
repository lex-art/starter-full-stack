import AppPaper from '@/components/Common/Layout/Paper'
import AppFormLabel from '@/components/Common/FormControl/FormLabel'
import AppTextField from '@/components/Common/Inputs/TextField/TextField'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import { useTranslations } from 'next-intl'
import React from 'react'

export default function GroupOne() {
	const t = useTranslations()
	return (
		<AppPaper
			elevation={5}
			sx={{
				padding: 2
			}}
		>
			<AppTypography variant="body1" fontWeight="bold">
				{t('components.textField')}
			</AppTypography>

			<AppTextField fullWidth label="Standard" variant="standard" />
			<AppFormLabel
				focused
				sx={{
					fontWeight: 'bold'
				}}
			>
				{t('components.outlined')}
			</AppFormLabel>
			<AppTextField fullWidth label="Outlined" variant="outlined" />
			<AppFormLabel
				focused
				sx={{
					fontWeight: 'bold'
				}}
			>
				{t('components.filled')}
			</AppFormLabel>
			<AppTextField fullWidth label="Filled" variant="filled" />
		</AppPaper>
	)
}
