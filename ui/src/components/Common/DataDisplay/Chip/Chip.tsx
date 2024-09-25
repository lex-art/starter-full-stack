import { font } from '@/lib/designTokens'
import { Chip, ChipProps, ThemeOptions } from '@mui/material'
import { FC, forwardRef } from 'react'

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

const AppChip: FC<ChipProps> = forwardRef<HTMLDivElement, ChipProps>((props, ref) => {
	return <Chip ref={ref} {...props} />
})

AppChip.displayName = 'AppChip'
export { AppChip, AppChipTheme }
export default AppChip
