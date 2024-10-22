import AppDivider from '@/components/Common/DataDisplay/Divider/Divider'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppBox from '@/components/Common/Layout/Box'
import AppGrid from '@/components/Common/Layout/Grid/Grid'
import AppPaper from '@/components/Common/Layout/Paper'

export default function Typography() {
	return (
		<AppGrid width="100%">
			<AppDivider marginY="0.5rem" textAlign="left">
				<AppTypography variant="subtitle2">Typography</AppTypography>
			</AppDivider>
			<AppGrid container display="grid" gap="2rem">
				<AppPaper
					elevation={5}
					sx={{
						padding: 2
					}}
				>
					<AppTypography variant="body1" fontWeight="bold">
						Font
					</AppTypography>
					<AppBox flexDirection="column">
						<AppTypography variant="h1">H1</AppTypography>
						<AppTypography variant="h2">H2</AppTypography>
						<AppTypography variant="h3">H3</AppTypography>
						<AppTypography variant="h4">H4</AppTypography>
						<AppTypography variant="h5">H5</AppTypography>
						<AppTypography variant="h6">H6</AppTypography>

						<AppTypography variant="subtitle1">Subtitle 1</AppTypography>
						<AppTypography variant="subtitle2">Subtitle 2</AppTypography>

						<AppTypography variant="body1">Body 1</AppTypography>
						<AppTypography variant="body2">Body 2</AppTypography>
						<AppTypography variant="body3">Body 3</AppTypography>
						<br />
						<AppTypography variant="button">Button</AppTypography>
					</AppBox>
				</AppPaper>
			</AppGrid>
		</AppGrid>
	)
}
