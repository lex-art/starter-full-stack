'use client'
import AppDivider from '@/components/Common/DataDisplay/Divider/Divider'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppIcons from '@/components/Common/Icons/Icons'
import AppIconButton from '@/components/Common/Inputs/IconButton/IconButton'
import AppGrid from '@/components/Common/Layout/Grid/Grid'
import AppPaper from '@/components/Common/Layout/Paper'

export default function Icons() {
	return (
		<AppGrid item width="100%">
			<AppDivider marginY="0.5rem" textAlign="left">
				<AppTypography variant="subtitle2" fontWeight="Bold">
					Icons
				</AppTypography>
			</AppDivider>
			<AppGrid container display="grid" gap="2rem">
				<AppPaper
					elevation={5}
					sx={{
						padding: 2,
						gap: 2
					}}
				>
					<AppTypography variant="body1" fontWeight="bold">
						small
					</AppTypography>
					<AppIcons.AccessibilityNewOutlined fontSize="small" color="primary" />
					<AppIcons.BabyChangingStation fontSize="small" color="primary" />
					<AppIcons.CabinOutlined fontSize="small" color="primary" />
					<AppIcons.DangerousOutlined fontSize="small" color="secondary" />
					<AppIcons.EMobiledataOutlined fontSize="small" color="secondary" />
					<AppIcons.Face2Outlined fontSize="small" color="secondary" />
					<AppIcons.Google fontSize="small" color="error" />
					<AppIcons.HPlusMobiledataOutlined fontSize="small" color="error" />
					<AppIcons.IceSkatingOutlined fontSize="small" color="error" />
				</AppPaper>

				<AppPaper
					elevation={5}
					sx={{
						padding: 2
					}}
				>
					<AppTypography variant="body1" fontWeight="bold">
						medium
					</AppTypography>
					<AppIcons.AccessibilityNewOutlined fontSize="medium" color="primary" />
					<AppIcons.BabyChangingStation fontSize="medium" color="primary" />
					<AppIcons.CabinOutlined fontSize="medium" color="primary" />
					<AppIcons.DangerousOutlined fontSize="medium" color="secondary" />
					<AppIcons.EMobiledataOutlined fontSize="medium" color="secondary" />
					<AppIcons.Face2Outlined fontSize="medium" color="secondary" />
					<AppIcons.Google fontSize="medium" color="error" />
					<AppIcons.HPlusMobiledataOutlined fontSize="medium" color="error" />
					<AppIcons.IceSkatingOutlined fontSize="medium" color="error" />
				</AppPaper>

				<AppPaper
					elevation={5}
					sx={{
						padding: 2
					}}
				>
					<AppTypography variant="body1" fontWeight="bold">
						large
					</AppTypography>
					<AppIcons.AccessibilityNewOutlined fontSize="large" color="primary" />
					<AppIcons.BabyChangingStation fontSize="large" color="primary" />
					<AppIcons.CabinOutlined fontSize="large" color="primary" />
					<AppIcons.DangerousOutlined fontSize="large" color="secondary" />
					<AppIcons.EMobiledataOutlined fontSize="large" color="secondary" />
					<AppIcons.Face2Outlined fontSize="large" color="secondary" />
					<AppIcons.Google fontSize="large" color="error" />
					<AppIcons.HPlusMobiledataOutlined fontSize="large" color="error" />
					<AppIcons.IceSkatingOutlined fontSize="large" color="error" />
				</AppPaper>
				<AppPaper
					elevation={5}
					sx={{
						padding: 2
					}}
				>
					<AppTypography variant="body1" fontWeight="bold">
						Icon Button
					</AppTypography>
					<AppIconButton>
						<AppIcons.AccessibilityNewOutlined fontSize="large" color="primary" />
					</AppIconButton>
					<AppIconButton>
						<AppIcons.BabyChangingStation fontSize="large" color="primary" />
					</AppIconButton>
					<AppIconButton>
						<AppIcons.CabinOutlined fontSize="large" color="primary" />
					</AppIconButton>
					<AppIconButton>
						<AppIcons.DangerousOutlined fontSize="large" color="secondary" />
					</AppIconButton>
					<AppIconButton>
						<AppIcons.EarbudsBatteryOutlined fontSize="large" color="secondary" />
					</AppIconButton>
					<AppIconButton>
						<AppIcons.Face2Outlined fontSize="large" color="secondary" />
					</AppIconButton>
					<AppIconButton>
						<AppIcons.Google fontSize="large" color="error" />
					</AppIconButton>
					<AppIconButton>
						<AppIcons.HPlusMobiledataOutlined fontSize="large" color="error" />
					</AppIconButton>
					<AppIconButton>
						<AppIcons.IceSkatingOutlined fontSize="large" color="error" />
					</AppIconButton>
				</AppPaper>
			</AppGrid>
		</AppGrid>
	)
}
