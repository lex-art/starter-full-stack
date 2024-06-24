import Button, { ButtonProps } from '@mui/material/Button'
import { ThemeOptions } from '@mui/material/styles'
import { forwardRef } from 'react'
import { colors, font } from '@/lib/design-tokens'
import { Padding } from '@mui/icons-material'

declare module '@mui/material/Button' {
	interface ButtonPropsVariantOverrides {
		gradient: true
	}
}

const AppButtonThemeOptions: ThemeOptions = {
	typography: {
		button: {
			color: colors.light.white,
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
					borderRadius: '5rem'
				},
				contained: {
					fontSize: font.sizes.fontSizeMedium,
					//fontFamily: font.fontFamilyBold,
					color: colors.light.white
				},
				text: {
					fontSize: font.sizes.fontSizeMedium
					//fontFamily: font.fontFamilyBold
				},
				outlined: {
					fontSize: font.sizes.fontSizeMedium
					//fontFamily: font.fontFamilyBold
				},
				sizeSmall: {
					fontSize: font.sizes.fontSizeSmall,
					padding: '0rem 0rem'
				},
				sizeMedium: {
					fontSize: font.sizes.fontSizeMedium,
					Padding: '1rem 2rem'
				},
				sizeLarge: {
					fontSize: font.sizes.fontSizeLarge,
					padding: '1.5rem 3rem'
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

const AppButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const { children, variant, ...rest } = props
	return (
		<Button ref={ref} variant={variant} {...rest}>
			{children}
		</Button>
	)
})

AppButton.displayName = 'AppButton'
export { AppButton, AppButtonThemeOptions }
export default AppButton
