'use client'
import AppIcons from '@/components/Common/Icons/Icons'
import AppBox from '@/components/Common/Layout/Box'
import AppPaper from '@/components/Common/Layout/Paper'
import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import { FC, useState } from 'react'

export const Footer: FC = () => {
	const [value, setValue] = useState(0)
	return (
		<AppPaper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
			<AppBox gridArea="footer">
				<BottomNavigation
					showLabels
					value={value}
					onChange={(event, newValue) => {
						setValue(newValue)
					}}
				>
					<BottomNavigationAction label="Recents" icon={<AppIcons.Restore />} />
					<BottomNavigationAction label="Favorites" icon={<AppIcons.Favorite />} />
					<BottomNavigationAction label="Nearby" icon={<AppIcons.LocationOn />} />
				</BottomNavigation>
			</AppBox>
		</AppPaper>
	)
}
