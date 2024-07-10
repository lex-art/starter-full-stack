'use client'
import AppDivider from '@/components/Common/DataDisplay/Divider/Divider'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppBox from '@/components/Common/Layout/Box'
import AppGrid from '@/components/Common/Layout/Grid/Grid'
import AppPaper from '@/components/Common/Layout/Paper'
import AppTab from '@/components/Tabs/Tab'
import AppCustomTabPanel from '@/components/Tabs/TabPanel'
import AppTabs from '@/components/Tabs/Tabs'
import { useState, SyntheticEvent } from 'react'

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`
	}
}

export default function Tabs() {
	const [value, setValue] = useState(0)

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}
	return (
		<AppGrid item width="100%">
			<AppDivider marginY="0.5rem" textAlign="left">
				<AppTypography variant="subtitle2">Menus</AppTypography>
			</AppDivider>
			<AppGrid
				container
				display="grid"
				gap="2rem"
				gridTemplateColumns={{
					xs: '1fr',
					sm: '1fr'
				}}
			>
				<AppPaper
					elevation={5}
					sx={{
						padding: 2
					}}
				>
					<AppTypography variant="body1" fontWeight="bold">
						Basic Tabs
					</AppTypography>
					<AppBox sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<AppTabs value={value} onChange={handleChange} aria-label="basic tabs example">
							<AppTab label="Item One" {...a11yProps(0)} />
							<AppTab label="Item Two" {...a11yProps(1)} />
							<AppTab label="Item Three" {...a11yProps(2)} />
						</AppTabs>
					</AppBox>
					<AppCustomTabPanel value={value} index={0}>
						<AppTypography variant="body1">Item One</AppTypography>
					</AppCustomTabPanel>
					<AppCustomTabPanel value={value} index={1}>
						<AppTypography variant="body1">Item Two</AppTypography>
					</AppCustomTabPanel>
					<AppCustomTabPanel value={value} index={2}>
						<AppTypography variant="body1">Item Three</AppTypography>
					</AppCustomTabPanel>
				</AppPaper>
			</AppGrid>
		</AppGrid>
	)
}
