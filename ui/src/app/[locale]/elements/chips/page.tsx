'use client'
import AppAvatar from '@/components/Common/DataDisplay/Avtar/Avatar'
import AppChip from '@/components/Common/DataDisplay/Chip/Chip'
import AppDivider from '@/components/Common/DataDisplay/Divider/Divider'
import AppTooltip from '@/components/Common/DataDisplay/Tooltip/Tooltip'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppIcons from '@/components/Common/Icons/Icons'
import AppBox from '@/components/Common/Layout/Box'
import AppGrid from '@/components/Common/Layout/Grid/Grid'
import AppPaper from '@/components/Common/Layout/Paper'

export default function ChipsExamples() {
	return (
		<AppGrid width="100%">
			<AppDivider marginY="0.5rem" textAlign="left">
				<AppTypography variant="subtitle1" fontWeight="Bold">
					Chpips
				</AppTypography>
			</AppDivider>
			<AppGrid container display="grid" gap="2rem">
				<AppPaper
					elevation={5}
					sx={{
						padding: 2
					}}
				>
					<AppTypography variant="body1" fontWeight="bold">
						Chips
					</AppTypography>
					<AppBox display="flex" gap="1rem" flexWrap="wrap">
						<AppChip label="Chip Normal" />
						<AppChip label="Chip Disabled" disabled />
						<AppChip label="Chip Outlined" variant="outlined" />
						<AppChip label="Chip Filled Disabled" variant="filled" disabled />
						<AppChip label="Chip Clerable" variant="outlined" onDelete={() => {}} />

						<AppChip label="Chip Success" color="primary" />
						<AppChip label="Chip Success" color="secondary" />
						<AppChip label="Chip Success" color="success" />
						<AppChip label="Chip Warning" color="warning" />
						<AppChip label="Chip Error" color="error" />
						<AppChip label="Chip Info" color="info" />

						<AppChip
							label="Chip withe custom icon delete"
							onDelete={() => {}}
							variant="outlined"
							color="error"
							deleteIcon={<AppIcons.DeleteOutline />}
						/>
						<AppChip avatar={<AppAvatar>MB</AppAvatar>} label="Chip with avatar" />

						<AppChip
							sx={{
								'& .MuiChip-label': {
									display: 'block',
									whiteSpace: 'normal'
								}
							}}
							label="This is a chip that has multiple lines."
						/>
					</AppBox>
				</AppPaper>
			</AppGrid>
			<AppDivider marginY="0.5rem" textAlign="left">
				<AppTypography variant="subtitle1" fontWeight="Bold">
					Tooltips
				</AppTypography>
			</AppDivider>
			<AppGrid container display="grid" gap="2rem">
				<AppPaper
					elevation={5}
					sx={{
						padding: 2
					}}
				>
					<AppTypography variant="body1" fontWeight="bold">
						Tooltips
					</AppTypography>
					<AppBox display="flex" gap="1rem" flexWrap="wrap">
						<AppTooltip title="Tooltip on top" placement="top">
							<AppChip label="Chip with tooltip top" />
						</AppTooltip>
						<AppTooltip title="Tooltip on right" placement="right">
							<AppChip label="Chip with tooltip right" />
						</AppTooltip>

						<AppTooltip title="Tooltip on bottom" placement="bottom">
							<AppChip label="Chip with tooltip bottom" />
						</AppTooltip>

						<AppTooltip title="Tooltip on left" placement="left">
							<AppChip label="Chip with tooltip left" />
						</AppTooltip>

						<AppTooltip title="Tooltip on top" placement="top" open>
							<AppChip label="Chip with tooltip top" />
						</AppTooltip>

						<AppTooltip title="Tooltip on top" placement="top" variant="light" open>
							<AppChip avatar={<AppAvatar>MB</AppAvatar>} label="Chip ligth" />
						</AppTooltip>

						<AppTooltip title="Tooltip on top" placement="top" variant="bootstrap" open>
							<AppChip avatar={<AppAvatar>MB</AppAvatar>} label="Chip bootstrap" />
						</AppTooltip>

						<AppTooltip title="Tooltip following cursos" followCursor placement="top" variant="light">
							<AppChip avatar={<AppAvatar>MB</AppAvatar>} label="Chip tooltip follow cursor" />
						</AppTooltip>
					</AppBox>
				</AppPaper>
			</AppGrid>
		</AppGrid>
	)
}
