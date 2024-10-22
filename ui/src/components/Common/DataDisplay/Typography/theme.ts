import { font } from '@/lib/designTokens'
import { ThemeOptions } from '@mui/material'

declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		body3: true
	}
}


export const AppTypographyTheme: ThemeOptions = {
	components: {
		MuiTypography: {
			variants: [
				{
					props: { variant: 'subtitle1' },
					style: {
						fontSize: font.sizes.fontTitle,
						fontWeight: 'bold',
						lineHeight: 1.6,
						whiteSpace: 'collapse',
						overflowWrap: 'break-word',
						wordWrap: 'break-word'
					}
				},
				{
					props: { variant: 'subtitle2' },
					style: {
						fontSize: font.sizes.fontSubtitle,
						fontWeight: 'bold',
						lineHeight: 1.3,
						whiteSpace: 'collapse',
						overflowWrap: 'break-word',
						wordWrap: 'break-word'
					}
				},
				{
					props: { variant: 'body1' },
					style: {
						fontSize: font.sizes.fontSizeMedium,
						lineHeight: 1.6,
						whiteSpace: 'collapse',
						overflowWrap: 'break-word',
						wordWrap: 'break-word'
					}
				},
				{
					props: { variant: 'body2' },
					style: {
						fontSize: font.sizes.fontSizeLarge,
						lineHeight: 1.6,
						whiteSpace: 'collapse',
						overflowWrap: 'break-word',
						wordWrap: 'break-word'
					}
				},
				{
					props: { variant: 'body3' },
					style: {
						fontSize: font.sizes.fontSizeSmall,
						lineHeight: 1.6,
						whiteSpace: 'collapse',
						overflowWrap: 'break-word',
						wordWrap: 'break-word'
					}
				},
				{
					props: { variant: 'caption' },
					style: {
						fontSize: font.sizes.fontSizeSmall,
						lineHeight: 1.6,
						whiteSpace: 'collapse',
						overflowWrap: 'break-word',
						wordWrap: 'break-word'
					}
				}
			],
			defaultProps: {
				variantMapping: {
					h1: 'h1',
					h2: 'h2',
					h3: 'h3',
					h4: 'h4',
					h5: 'h5',
					h6: 'h2',
					subtitle1: 'h1',
					subtitle2: 'h2',
					body1: 'span',
					body2: 'p',
					body3: 'span'
				}
			}
		}
	}
}
