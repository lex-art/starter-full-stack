import AppCheckbox from '@/components/Common/CheckBox/AppCheckBox'
import AppDivider from '@/components/Common/Divider/Divider'
import AppGrid from '@/components/Common/Grid/Grid'
import AppRadio from '@/components/Common/Radio/AppRadio'
import AppTypography from '@/components/Common/Typography/Typography'
import { Radio } from '@mui/material'
import React from 'react'

export default function Checkboxes() {
	return (
		<AppGrid item width="100%">
			<AppDivider marginY="0.5rem" textAlign="left">
				<AppTypography variant="subtitle2" fontWeight="Bold">
					Checkboxes
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
				<AppCheckbox label="Checkbox" />
			</AppGrid>
			<AppDivider marginY="0.5rem" textAlign="left">
				<AppTypography variant="subtitle2" fontWeight="Bold">
					Radios
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
				<AppRadio label="Radio" />
			</AppGrid>
		</AppGrid>
	)
}
