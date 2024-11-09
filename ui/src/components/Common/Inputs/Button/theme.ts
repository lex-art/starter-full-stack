import { colors, font, sizes } from '@/lib/designTokens'
import { ThemeOptions } from '@mui/material'

declare module '@mui/material/Button' {
	interface ButtonPropsVariantOverrides {
		gradient: true
	}
}

export const AppButtonTheme: ThemeOptions = {
	typography: {
		button: {
			textTransform: 'none'
		}
	},
	components: {
		MuiButton: {
			defaultProps: {
				color: 'primary',
				variant: 'contained'
			},
			styleOverrides: {
				root: {
					borderRadius: '0.7rem',
					paddingTop: '0.05rem',
					paddingBottom: '0.1rem',
					minHeight: sizes.medium
				},
				contained: {
					fontSize: font.sizes.fontSizeMedium,
					color: colors.light.white
				},
				text: {
					fontSize: font.sizes.fontSizeMedium
				},
				outlined: {
					fontSize: font.sizes.fontSizeMedium
				},
				sizeSmall: {
					minHeight: sizes.small,
					fontSize: font.sizes.fontSizeSmall,
					padding: '0.5rem 0.5rem'
				},
				sizeMedium: {
					minHeight: sizes.medium,
					fontSize: font.sizes.fontSizeMedium,
					Padding: '0.5rem 3rem'
				},
				sizeLarge: {
					minHeight: sizes.large,
					fontSize: font.sizes.fontSizeLarge,
					padding: '0.5rem 3.5rem'
				}
			},
			variants: [
				{
					props: { variant: 'gradient' },
					style: {
						background: 'linear-gradient(to right, #7C80EF, #494FE9)', //Does not evaluate as a design token
						color: colors.light.white,
						fontSize: '16'
					}
				}
			]
		}
	}
}
