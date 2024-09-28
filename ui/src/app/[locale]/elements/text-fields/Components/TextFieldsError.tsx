import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppFormControl from '@/components/Common/FormControl/FormControl'
import AppFormLabel from '@/components/Common/FormControl/FormLabel'
import AppTextField from '@/components/Common/Inputs/TextField/TextField'
import AppBox from '@/components/Common/Layout/Box'
import AppPaper from '@/components/Common/Layout/Paper'
import { RemoveRedEyeOutlined, SearchOutlined } from '@mui/icons-material'
import { CircularProgress } from '@mui/material'
import { useTranslations } from 'next-intl'

export default function TextFieldsError() {
	const t = useTranslations()
	return (
		<AppPaper
			elevation={5}
			sx={{
				padding: 2
			}}
		>
			<AppTypography variant="body1" fontWeight="bold">
				{t('components.error')}
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
						adornmentRight={<RemoveRedEyeOutlined fontSize="small" />}
						error
						helperText="This is an error message"
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
						adornmentLeft={<SearchOutlined fontSize="small" />}
						error
						helperText="This is an error message"
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
						error
						helperText="This is an error message"
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
						adornmentRight={<RemoveRedEyeOutlined />}
						disabled
						error
						helperText="This is an error message"
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
						adornmentLeft={<SearchOutlined />}
						disabled
						error
						helperText="This is an error message"
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
						error
						helperText="This is an error message"
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
						adornmentRight={
							<RemoveRedEyeOutlined
								sx={{
									width: '2rem',
									height: '2rem'
								}}
							/>
						}
						size="small"
						error
						helperText="This is an error message"
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
						adornmentLeft={
							<SearchOutlined
								sx={{
									width: '2rem',
									height: '2rem'
								}}
							/>
						}
						size="small"
						error
						helperText="This is an error message"
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
						error
						helperText="This is an error message"
					/>
				</AppFormControl>
			</AppBox>
		</AppPaper>
	)
}
