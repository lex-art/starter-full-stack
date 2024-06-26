import React from 'react'
import AppDivider from '@/components/Common/Divider/Divider'
import AppDropdown from '@/components/Common/Dropdown/Dropdown'
import AppGrid from '@/components/Common/Grid/Grid'
import AppTypography from '@/components/Common/Typography/Typography'
import { suggestionsAutocomplete } from '@/lib/utilities/constants'
import { useTranslations } from 'next-intl'
import AppPaper from '@/components/Common/Containers/Paper'

export default function Selects() {
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
					<AppDropdown options={suggestionsAutocomplete} />
					<AppDropdown options={suggestionsAutocomplete} variant="filled" />
					<AppDropdown options={suggestionsAutocomplete} variant="standard" />
					<AppDropdown options={suggestionsAutocomplete} pills />
				</AppPaper>
			</AppGrid>
		</AppGrid>
	)
}
