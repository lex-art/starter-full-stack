import { colors } from '@/lib/design-tokens'
import { Chip, ChipProps, ThemeOptions } from '@mui/material'
import { FC } from 'react'

const AppChipTheme: ThemeOptions = {
	components: {
		MuiChip: {
			styleOverrides: {
				root: {
					lineHeight: '1.6rem',
					fontSize: '1.8rem'
				}
			},
			variants: [
				{
					props: { variant: 'filled' },
					style: {
						color: colors.light.white
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
