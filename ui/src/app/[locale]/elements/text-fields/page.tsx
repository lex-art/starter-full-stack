import AppDivider from '@/components/Common/DataDisplay/Divider/Divider'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppGrid from '@/components/Common/Layout/Grid/Grid'
import { useTranslations } from 'next-intl'
import AutocompleteExample from './Components/AutocompleteExample'
import GroupOne from './Components/GroupOne'
import GroupTwo from './Components/GroupTwo'
import TextFieldTypes from './Components/TexFieldTypes'
import TextFieldsError from './Components/TextFieldsError'

export default function TextFields() {
	const t = useTranslations()

	return (
		<AppGrid width="100%">
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
					{t('components.typesInputs')}
				</AppTypography>
			</AppDivider>
			<AppGrid
				container
				display="grid"
				gap="2rem"
				gridTemplateColumns={{
					xs: '1fr',
					sm: '1fr',
					lg: '1fr',
					xl: '1fr',
					xxl: '1fr'
				}}
			>
				<TextFieldTypes />
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
