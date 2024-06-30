import AppCheckbox from '@/components/Common/Inputs/CheckBox/AppCheckBox'
import AppDivider from '@/components/Common/DataDisplay/Divider/Divider'
import AppGrid from '@/components/Common/LAyout/Grid/Grid'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import React from 'react'
import CustomSwitches from './Components/CustomSwitches'
import { Favorite, FavoriteBorder, VolumeDown, VolumeUp } from '@mui/icons-material'
import AppFormControl from '@/components/Common/FormControl/FormControl'
import AppBox from '@/components/Common/LAyout/Box'
import AppFormGroup from '@/components/Common/FormControl/FormGroup'
import AppFormLabel from '@/components/Common/FormControl/FormLabel'
import CheclBoxGroup from './Components/CheckoxGroup'
import AppRating from '@/components/Common/Rating/Rating'
import AppSlider from '@/components/Common/Inputs/Slider/Slider'
import AppRadio from '@/components/Common/Inputs/Radio/Radio'

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
				<AppCheckbox label="Checkbox custom" icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
				<CheclBoxGroup />
				<AppBox>
					<AppRating label="Raiting samall" value={3} size="small" />
					<AppRating label="Raiting medium" value={5} size="medium" />
					<AppRating label="Raiing large" value={3} size="large" />
					<AppSlider label="Slider whit icons" width={200} />
					<AppSlider
						label="Slider"
						defaultValue={50}
						width={200}
						leftIcon={<VolumeDown />}
						rightIcon={<VolumeUp />}
					/>
				</AppBox>
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
				<AppBox>
					<AppFormControl>
						<AppFormLabel>Checkbox Group</AppFormLabel>
						<AppFormGroup>
							<AppRadio label="Radio 1" />
							<AppRadio label="Radio 2" />
							<AppRadio label="Radio 3" disabled />
							<AppRadio label="Radio 4" size="small" />
						</AppFormGroup>
					</AppFormControl>
				</AppBox>
			</AppGrid>
			<AppDivider marginY="0.5rem" textAlign="left">
				<AppTypography variant="subtitle2" fontWeight="Bold">
					Switches
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
				<CustomSwitches />
			</AppGrid>
		</AppGrid>
	)
}
