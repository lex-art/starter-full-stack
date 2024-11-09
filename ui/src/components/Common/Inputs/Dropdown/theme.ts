import { font } from '@/lib/designTokens'
import { ThemeOptions } from '@mui/material'

const AppDropdownTheme: ThemeOptions = {
	components: {
		MuiSelect: {
			defaultProps: {
				variant: 'outlined'
			},
			styleOverrides: {
				root: {
					'& .MuiSelect-select': {
						alignItems: 'center',
						display: 'flex'
					},
					'& .MuiSvgIcon-fontSizeMedium ': {
						fontSize: '4.5rem',
						margin: '0',
						padding: '0'
					},
					'& .MuiTypography-root': {
						textOverflow: 'ellipsis',
						overflow: 'hidden',
						whiteSpace: 'nowrap',
						maxWidth: '100%'
					}
				},
				icon: {
					height: '4.5rem',
					width: '3rem',
					fontSize: font.sizes.fontSizeMedium
				}
			},
			variants: [
				{
					props: { variant: 'standard' },
					style: {
						'& .MuiSelect-select': {
							padding: '1.5rem 1rem'
						}
					}
				},
				{
					props: { size: 'small' },
					style: {
						top: '4%'
					}
				}
			]
		}
	}
}

export { AppDropdownTheme }
