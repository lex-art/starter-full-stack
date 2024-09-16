import AppDivider from '@/components/Common/DataDisplay/Divider/Divider'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppButton from '@/components/Common/Inputs/Button/Button'
import AppBox from '@/components/Common/Layout/Box'
import AppGrid from '@/components/Common/Layout/Grid/Grid'
import AppPaper from '@/components/Common/Layout/Paper'
import { colors } from '@mui/material'
import { useTranslations } from 'next-intl'

export default function Buttons() {
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
					<AppTypography variant="body3" fontWeight="Bold">
						{t('components.buttonContained')}
					</AppTypography>

					<AppBox gap={1} display="flex" flexWrap="wrap">
						<AppButton variant="contained" color="primary">
							{t('components.primary')}
						</AppButton>
						<AppButton variant="contained" color="secondary">
							{t('components.secondary')}
						</AppButton>
						<AppButton variant="contained" color="success">
							{t('components.success')}
						</AppButton>
						<AppButton variant="contained" color="error">
							{t('components.error')}
						</AppButton>
						<AppButton variant="contained" color="warning">
							{t('components.warning')}
						</AppButton>
						<AppButton variant="contained" color="info">
							{t('components.info')}
						</AppButton>
					</AppBox>
				</AppPaper>

				<AppPaper
					elevation={5}
					sx={{
						padding: 2
					}}
				>
					<AppTypography variant="body3" fontWeight="Bold">
						{t('components.buttonOutlined')}
					</AppTypography>
					<AppBox gap={1} display="flex" flexWrap="wrap">
						<AppButton variant="outlined" color="primary">
							{t('components.primary')}
						</AppButton>
						<AppButton variant="outlined" color="secondary">
							{t('components.secondary')}
						</AppButton>
						<AppButton variant="outlined" color="success">
							{t('components.success')}
						</AppButton>
						<AppButton variant="outlined" color="error">
							{t('components.error')}
						</AppButton>
						<AppButton variant="outlined" color="warning">
							{t('components.warning')}
						</AppButton>
						<AppButton variant="outlined" color="info">
							{t('components.info')}
						</AppButton>
					</AppBox>
				</AppPaper>

				<AppPaper
					elevation={5}
					sx={{
						padding: 2
					}}
				>
					<AppTypography variant="body3" fontWeight="Bold">
						{t('components.buttonText')}
					</AppTypography>
					<AppBox gap={1} display="flex" flexWrap="wrap">
						<AppButton variant="text" color="primary">
							{t('components.primary')}
						</AppButton>
						<AppButton variant="text" color="secondary">
							{t('components.secondary')}
						</AppButton>
						<AppButton variant="text" color="success">
							{t('components.success')}
						</AppButton>
						<AppButton variant="text" color="error">
							{t('components.error')}
						</AppButton>
						<AppButton variant="text" color="warning">
							{t('components.warning')}
						</AppButton>
						<AppButton variant="text" color="info">
							{t('components.info')}
						</AppButton>
						<AppButton variant="text" color="inherit">
							{t('components.inherit')}
						</AppButton>
					</AppBox>
				</AppPaper>

				<AppPaper
					elevation={5}
					sx={{
						padding: 2
					}}
				>
					<AppTypography variant="body3" fontWeight="Bold">
						{t('components.buttonSize')}
					</AppTypography>
					<AppBox gap={1} display="flex" flexWrap="wrap" alignItems="center">
						<AppBox>
							<AppButton variant="contained" color="primary" size="small">
								{t('components.small')}
							</AppButton>
						</AppBox>
						<AppBox>
							<AppButton variant="contained" color="secondary" size="medium">
								{t('components.medium')}
							</AppButton>
						</AppBox>
						<AppBox>
							<AppButton variant="contained" color="success" size="large">
								{t('components.large')}
							</AppButton>
						</AppBox>
					</AppBox>
				</AppPaper>
			</AppGrid>

			<AppDivider marginY="0.5rem" textAlign="left">
				<AppTypography variant="subtitle2" fontWeight="Bold">
					{t('components.pills')}
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
					<AppTypography variant="body3" fontWeight="Bold">
						{t('components.buttonContained')}
					</AppTypography>

					<AppBox gap={1} display="flex" flexWrap="wrap" color={colors.lightBlue}>
						<AppButton variant="contained" color="primary" pills>
							{t('components.primary')}
						</AppButton>
						<AppButton variant="contained" color="secondary" pills>
							{t('components.secondary')}
						</AppButton>
						<AppButton variant="contained" color="success" pills>
							{t('components.success')}
						</AppButton>
						<AppButton variant="contained" color="error" pills>
							{t('components.error')}
						</AppButton>
						<AppButton variant="contained" color="warning" pills>
							{t('components.warning')}
						</AppButton>
						<AppButton variant="contained" color="info" pills>
							{t('components.info')}
						</AppButton>
					</AppBox>
				</AppPaper>

				<AppPaper
					elevation={5}
					sx={{
						padding: 2
					}}
				>
					<AppTypography variant="body3" fontWeight="Bold">
						{t('components.buttonOutlined')}
					</AppTypography>
					<AppBox gap={1} display="flex" flexWrap="wrap">
						<AppButton variant="outlined" color="primary" pills>
							{t('components.primary')}
						</AppButton>
						<AppButton variant="outlined" color="secondary" pills>
							{t('components.secondary')}
						</AppButton>
						<AppButton variant="outlined" color="success" pills>
							{t('components.success')}
						</AppButton>
						<AppButton variant="outlined" color="error" pills>
							{t('components.error')}
						</AppButton>
						<AppButton variant="outlined" color="warning" pills>
							{t('components.warning')}
						</AppButton>
						<AppButton variant="outlined" color="info" pills>
							{t('components.info')}
						</AppButton>
						<AppButton variant="outlined" color="inherit" pills>
							{t('components.inherit')}
						</AppButton>
					</AppBox>
				</AppPaper>

				<AppPaper
					elevation={5}
					sx={{
						padding: 2
					}}
				>
					<AppTypography variant="body3" fontWeight="Bold">
						{t('components.buttonText')}
					</AppTypography>
					<AppBox gap={1} display="flex" flexWrap="wrap" color={colors.lightBlue}>
						<AppButton variant="text" color="primary" pills>
							{t('components.primary')}
						</AppButton>
						<AppButton variant="text" color="secondary" pills>
							{t('components.secondary')}
						</AppButton>
						<AppButton variant="text" color="success" pills>
							{t('components.success')}
						</AppButton>
						<AppButton variant="text" color="error" pills>
							{t('components.error')}
						</AppButton>
						<AppButton variant="text" color="warning" pills>
							{t('components.warning')}
						</AppButton>
						<AppButton variant="text" color="info" pills>
							{t('components.info')}
						</AppButton>
						<AppButton variant="text" color="inherit" pills>
							{t('components.inherit')}
						</AppButton>
					</AppBox>
				</AppPaper>

				<AppPaper
					elevation={5}
					sx={{
						padding: 2
					}}
				>
					<AppTypography variant="body3" fontWeight="Bold">
						{t('components.buttonSize')}
					</AppTypography>
					<AppBox gap={1} display="flex" flexWrap="wrap" alignItems="center">
						<AppBox
							sx={{
								flex: '0 0 auto'
							}}
						>
							<AppButton variant="contained" color="primary" size="small" pills>
								{t('components.small')}
							</AppButton>
						</AppBox>
						<AppBox
							sx={{
								flex: '0 0 auto'
							}}
						>
							<AppButton variant="contained" color="secondary" size="medium" pills>
								{t('components.medium')}
							</AppButton>
						</AppBox>
						<AppBox
							sx={{
								flex: '0 0 auto'
							}}
						>
							<AppButton variant="contained" color="success" size="large" pills>
								{t('components.large')}
							</AppButton>
						</AppBox>
					</AppBox>
				</AppPaper>
			</AppGrid>
		</AppGrid>
	)
}
