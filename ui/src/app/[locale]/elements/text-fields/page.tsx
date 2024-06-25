import AppDivider from '@/components/Common/Divider/Divider'
import AppGrid from '@/components/Common/Grid/Grid'
import AppTypography from '@/components/Common/Typography/Typography'
import { useTranslations } from 'next-intl'
import React from 'react'
import GroupOne from './Components/GroupOne'
import GroupTwo from './Components/GroupTwo'
import AutocompleteExample from './Components/AutocompleteExample'
import TextFieldsError from './Components/TextFieldsError'

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
				<GroupOne />
				<GroupTwo />
			</AppGrid>
			<AppDivider marginY="0.5rem" textAlign="left">
				<AppTypography variant="subtitle2" fontWeight="Bold">
					{t('components.autocomplete')}
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
				<AutocompleteExample />
				<TextFieldsError />
			</AppGrid>
		</AppGrid>
	)
}
