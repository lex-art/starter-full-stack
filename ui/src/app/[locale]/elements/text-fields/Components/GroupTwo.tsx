import AppBox from '@/components/Common/Containers/Box'
import AppPaper from '@/components/Common/Containers/Paper'
import AppFormControl from '@/components/Common/FormControl/FormControl'
import AppFormLabel from '@/components/Common/FormControl/FormLabel'
import AppTextField from '@/components/Common/TextField/TextField'
import AppTypography from '@/components/Common/Typography/Typography'
import { RemoveRedEyeOutlined, SearchOutlined } from '@mui/icons-material'
import { CircularProgress } from '@mui/material'
import { useTranslations } from 'next-intl'
import React from 'react'

export default function GroupTwo() {
	const t = useTranslations()
	return (
		<AppPaper
			elevation={5}
			sx={{
				padding: 2
			}}
		>
			<AppTypography variant="body1" fontWeight="bold">
				{t('components.variants')}
			</AppTypography>
			<AppBox gap={2} display="flex" flexWrap="wrap" alignItems="end">
				<AppFormControl>
					<AppFormLabel
						focused
						sx={{
							fontWeight: 'bold'
						}}
					>
						{t('components.textField')}
					</AppFormLabel>
					<AppTextField
						fullWidth={false}
						label="Standard"
						variant="standard"
						adornment={<RemoveRedEyeOutlined />}
					/>
				</AppFormControl>
				<AppFormControl>
					<AppFormLabel
						focused
						sx={{
							fontWeight: 'bold'
						}}
					>
						{t('components.outlined')}
					</AppFormLabel>
					<AppTextField
						fullWidth={false}
						variant="outlined"
						placeholder="Search"
						adornmentPosition="start"
						adornment={<SearchOutlined />}
					/>
				</AppFormControl>
				<AppFormControl>
					<AppFormLabel
						focused
						sx={{
							fontWeight: 'bold'
						}}
					>
						{t('components.filled')}
					</AppFormLabel>
					<AppTextField
						fullWidth={false}
						label="Filled"
						variant="filled"
						adornment={
							<CircularProgress
								color="secondary"
								size={20}
								sx={{
									mt: 1.5
								}}
							/>
						}
					/>
				</AppFormControl>

				<AppFormControl>
					<AppFormLabel
						focused
						sx={{
							fontWeight: 'bold'
						}}
					>
						{t('components.textField')}
					</AppFormLabel>
					<AppTextField
						fullWidth={false}
						label="Standard"
						variant="standard"
						adornment={<RemoveRedEyeOutlined />}
						disabled
					/>
				</AppFormControl>
				<AppFormControl>
					<AppFormLabel
						focused
						sx={{
							fontWeight: 'bold'
						}}
					>
						{t('components.outlined')}
					</AppFormLabel>
					<AppTextField
						fullWidth={false}
						variant="outlined"
						placeholder="Search"
						adornmentPosition="start"
						adornment={<SearchOutlined />}
						disabled
					/>
				</AppFormControl>
				<AppFormControl>
					<AppFormLabel
						focused
						sx={{
							fontWeight: 'bold'
						}}
					>
						{t('components.filled')}
					</AppFormLabel>
					<AppTextField
						fullWidth={false}
						label="Filled"
						variant="filled"
						adornment={
							<CircularProgress
								color="secondary"
								size={20}
								sx={{
									mt: 1.5
								}}
							/>
						}
						disabled
					/>
				</AppFormControl>
				<AppFormControl>
					<AppFormLabel
						focused
						sx={{
							fontWeight: 'bold'
						}}
					>
						{t('components.smallTextField')}
					</AppFormLabel>
					<AppTextField
						fullWidth={false}
						variant="standard"
						placeholder="Search"
						adornment={
							<RemoveRedEyeOutlined
								sx={{
									width: '2rem',
									height: '2rem'
								}}
							/>
						}
						size="small"
					/>
				</AppFormControl>

				<AppFormControl>
					<AppFormLabel
						focused
						sx={{
							fontWeight: 'bold'
						}}
					>
						{t('components.smallTextField')}
					</AppFormLabel>
					<AppTextField
						fullWidth={false}
						variant="outlined"
						placeholder="Search"
						adornmentPosition="start"
						adornment={
							<SearchOutlined
								sx={{
									width: '2rem',
									height: '2rem'
								}}
							/>
						}
						size="small"
					/>
				</AppFormControl>
				<AppFormControl>
					<AppFormLabel
						focused
						sx={{
							fontWeight: 'bold'
						}}
					>
						{t('components.smallTextField')}
					</AppFormLabel>
					<AppTextField
						fullWidth={false}
						variant="filled"
						placeholder="Search"
						adornment={
							<CircularProgress
								color="secondary"
								size={15}
								sx={{
									mt: 1.5
								}}
							/>
						}
						size="small"
					/>
				</AppFormControl>
			</AppBox>
		</AppPaper>
	)
}
