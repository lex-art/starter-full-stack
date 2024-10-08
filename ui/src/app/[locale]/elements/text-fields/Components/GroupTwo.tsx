import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppFormControl from '@/components/Common/FormControl/FormControl'
import AppFormLabel from '@/components/Common/FormControl/FormLabel'
import AppTextField from '@/components/Common/Inputs/TextField/TextField'
import AppBox from '@/components/Common/Layout/Box'
import AppPaper from '@/components/Common/Layout/Paper'
import { RemoveRedEyeOutlined, SearchOutlined } from '@mui/icons-material'
import { CircularProgress } from '@mui/material'
import { useTranslations } from 'next-intl'

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
						adornmentRight={<RemoveRedEyeOutlined fontSize="medium" />}
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
						adornmentLeft={<SearchOutlined fontSize="medium" />}
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
						adornmentRight={
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
						adornmentRight={<RemoveRedEyeOutlined fontSize="medium" />}
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
						adornmentLeft={<SearchOutlined fontSize="medium" />}
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
						adornmentRight={
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
						label="Search"
						placeholder="Search"
						adornmentRight={<RemoveRedEyeOutlined fontSize="small" />}
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
						label="Search"
						placeholder="Search"
						//adornmentLeft={<SearchOutlined fontSize="small" />}
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
						label="Search"
						placeholder="Search"
						adornmentRight={
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
