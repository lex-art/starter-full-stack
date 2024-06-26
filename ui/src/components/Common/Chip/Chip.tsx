import { colors, font } from '@/lib/design-tokens'
import { Chip, ChipProps, ThemeOptions } from '@mui/material'
import { FC } from 'react'

const AppChipTheme: ThemeOptions = {
	components: {
		MuiChip: {
			styleOverrides: {
				root: {
					lineHeight: font.sizes.fontSizeMedium,
					fontSize: font.sizes.fontSizeMedium
				}
			},
			variants: [
				{
					props: { variant: 'filled' },
					style: {
						fontSize: font.sizes.fontSizeMedium
					}
				}
			]
		}
	}
}

const AppChip: FC<ChipProps> = (props) => {
	return <Chip {...props} />
}

AppChip.displayName = 'AppChip'
export { AppChip, AppChipTheme }
export default AppChip
