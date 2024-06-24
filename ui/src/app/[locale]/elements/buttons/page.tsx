import AppButton from '@/components/Common/Button/Button'
import AppGrid from '@/components/Common/Grid/Grid'
import AppTypography from '@/components/Common/Typography/Typography'
import { Box, Paper } from '@mui/material'
import { useTranslations } from 'next-intl'
import React from 'react'

export default function Buttons() {
	const t = useTranslations()
	return (
		<AppGrid container display="grid" gap="2rem" gridTemplateColumns="repeat(auto-fit, minmax(49%, 1fr))">
			<Paper
				elevation={5}
				sx={{
					padding: 2
				}}
			>
				<AppTypography variant="subtitle2" fontWeight="Bold">
					{t('components.buttonContained')}
				</AppTypography>

				<Box gap={1} display="flex">
					<AppButton variant="contained" color="primary">
						{t('components.primary')}
					</AppButton>
					<AppButton variant="contained" color="secondary">
						{t('components.secondary')}
					</AppButton>
					<AppButton variant="contained" color="success">
						{t('components.success')}
					</AppButton>
					<AppButton variant="contained" color="error">
						{t('components.error')}
					</AppButton>
					<AppButton variant="contained" color="warning">
						{t('components.warning')}
					</AppButton>
					<AppButton variant="contained" color="info">
						{t('components.info')}
					</AppButton>
					<AppButton variant="contained" color="inherit">
						{t('components.inherit')}
					</AppButton>
				</Box>
			</Paper>

			<Paper
				elevation={5}
				sx={{
					padding: 2
				}}
			>
				<AppTypography variant="subtitle2" fontWeight="Bold">
					{t('components.buttonOutlined')}
				</AppTypography>
				<Box gap={1} display="flex">
					<AppButton variant="outlined" color="primary">
						{t('components.primary')}
					</AppButton>
					<AppButton variant="outlined" color="secondary">
						{t('components.secondary')}
					</AppButton>
					<AppButton variant="outlined" color="success">
						{t('components.success')}
					</AppButton>
					<AppButton variant="outlined" color="error">
						{t('components.error')}
					</AppButton>
					<AppButton variant="outlined" color="warning">
						{t('components.warning')}
					</AppButton>
					<AppButton variant="outlined" color="info">
						{t('components.info')}
					</AppButton>
					<AppButton variant="outlined" color="inherit">
						{t('components.inherit')}
					</AppButton>
				</Box>
			</Paper>

			<Paper
				elevation={5}
				sx={{
					padding: 2
				}}
			>
				<AppTypography variant="subtitle2" fontWeight="Bold">
					{t('components.buttonText')}
				</AppTypography>
				<Box gap={1} display="flex">
					<AppButton variant="text" color="primary">
						{t('components.primary')}
					</AppButton>
					<AppButton variant="text" color="secondary">
						{t('components.secondary')}
					</AppButton>
					<AppButton variant="text" color="success">
						{t('components.success')}
					</AppButton>
					<AppButton variant="text" color="error">
						{t('components.error')}
					</AppButton>
					<AppButton variant="text" color="warning">
						{t('components.warning')}
					</AppButton>
					<AppButton variant="text" color="info">
						{t('components.info')}
					</AppButton>
					<AppButton variant="text" color="inherit">
						{t('components.inherit')}
					</AppButton>
				</Box>
			</Paper>

			<Paper
				elevation={5}
				sx={{
					padding: 2
				}}
			>
				<AppTypography variant="subtitle2" fontWeight="Bold">
					{t('components.buttonSize')}
				</AppTypography>
				<Box gap={1} display="flex">
					<AppButton variant="contained" color="primary" size="small">
						{t('components.small')}
					</AppButton>
					<AppButton variant="contained" color="secondary" size="medium">
						{t('components.medium')}
					</AppButton>
					<AppButton variant="contained" color="success" size="large">
						{t('components.large')}
					</AppButton>
				</Box>
			</Paper>
		</AppGrid>
	)
}
