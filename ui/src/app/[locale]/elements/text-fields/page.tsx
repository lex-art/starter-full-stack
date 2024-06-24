import AppPaper from '@/components/Common/Containers/Paper'
import AppDivider from '@/components/Common/Divider/Divider'
import AppGrid from '@/components/Common/Grid/Grid'
import AppTextField from '@/components/Common/TextField/TextField'
import AppTypography from '@/components/Common/Typography/Typography'
import { useTranslations } from 'next-intl'
import React from 'react'

export default function TextFields() {
	const t = useTranslations()

	return (
		<AppGrid item width="100%">
			<AppDivider marginY="0.5rem" textAlign="left">
				<AppTypography variant="subtitle2" fontWeight="Bold">
					{t('components.standard')}
				</AppTypography>
			</AppDivider>

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
				<AppPaper
					elevation={5}
					sx={{
						padding: 2
					}}
				>
					<AppTextField fullWidth label="Standard" variant="standard" />
				</AppPaper>
			</AppGrid>
		</AppGrid>
	)
}
