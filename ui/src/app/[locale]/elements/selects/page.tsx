import React from 'react'
import AppDivider from '@/components/Common/DataDisplay/Divider/Divider'
import AppGrid from '@/components/Common/LAyout/Grid/Grid'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import { useTranslations } from 'next-intl'
import AppPaper from '@/components/Common/LAyout/Paper'
import SelectsCatalogue from './components/SelectsCatalogue'
import AppBox from '@/components/Common/LAyout/Box'
import { suggestionsArrayExample } from '@/lib/utilities/constants'
import AppDropdown from '@/components/Common/Inputs/Dropdown/Dropdown'

export default function Selects() {
	const t = useTranslations()
	return (
		<AppGrid item width="100%">
			<AppDivider marginY="0.5rem" textAlign="left">
				<AppTypography variant="subtitle2" fontWeight="Bold">
					{t('components.selects')}
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
						padding: 2,
						gap: '2rem'
					}}
				>
					<AppTypography variant="subtitle2">Selects</AppTypography>
					<SelectsCatalogue />
				</AppPaper>
				<AppPaper
					elevation={5}
					sx={{
						padding: 2,
						gap: '2rem'
					}}
				>
					<AppTypography variant="subtitle2">Error</AppTypography>
					<SelectsCatalogue showError />
				</AppPaper>
			</AppGrid>

			<AppDivider marginY="0.5rem" textAlign="left">
				<AppTypography variant="subtitle2" fontWeight="Bold">
					{t('components.selects')}
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
						padding: 2,
						gap: '2rem'
					}}
				>
					<AppTypography variant="subtitle2">Sizes</AppTypography>
					<AppBox display="flex" gap="2rem">
						<AppDropdown value="" label="Select disabled" options={[]} width="49%" disabled size="medium" />
						<AppDropdown
							value=""
							label="Select disabled"
							options={[]}
							width="49%"
							disabled
							size="small"
							pills
						/>
					</AppBox>
					<AppBox display="flex" gap="2rem">
						<AppDropdown value="" label="Select medium" options={[]} width="49%" />
						<AppDropdown
							label="Select small whit error"
							value=""
							options={[]}
							width="49%"
							size="small"
							pills
							error
							helperText="This field is required"
						/>
					</AppBox>
					<AppBox display="flex" gap="2rem">
						<AppDropdown value="" label="Select medium" options={[]} width="49%" size="medium" />
						<AppDropdown value="" label="Select small" options={[]} width="49%" size="small" pills loading />
					</AppBox>
				</AppPaper>
				<AppPaper
					elevation={5}
					sx={{
						padding: 2,
						gap: '2rem'
					}}
				>
					<AppTypography variant="subtitle2">Adornment</AppTypography>
					<AppBox display="flex" gap="2rem">
						<AppDropdown value="" label="Select clerable" options={suggestionsArrayExample} clearable />
						<AppDropdown value="" label="Select pills" options={suggestionsArrayExample} pills loading />
					</AppBox>
				</AppPaper>
			</AppGrid>
		</AppGrid>
	)
}
