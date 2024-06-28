import { robotoFont } from '@/components/Theme/theme'
import { font } from '@/lib/design-tokens'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { ThemeOptions } from '@mui/material/styles'
import { FC } from 'react'

declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		body3: true
	}
}

const AppTypographyTheme: ThemeOptions = {
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
						fontSize: font.sizes.fontSizeMedium,
						lineHeight: 1.6,
						whiteSpace: 'collapse',
						overflowWrap: 'break-word',
						wordWrap: 'break-word'
					}
				},
				{
					props: { variant: 'body3' },
					style: {
						fontSize: font.sizes.fontSizeLarge,
						lineHeight: 1.6,
						whiteSpace: 'collapse',
						overflowWrap: 'break-word',
						wordWrap: 'break-word'
					}
				}
			],
			defaultProps: {
				variantMapping: {
					h1: 'h2',
					h2: 'h2',
					h3: 'h2',
					h4: 'h2',
					h5: 'h2',
					h6: 'h2',
					subtitle1: 'h1',
					subtitle2: 'h2',
					body1: 'p',
					body2: 'span'
				}
			}
		}
	}
}

const AppTypography: FC<TypographyProps> = ({ children, ...rest }) => {
	return <Typography {...rest}>{children}</Typography>
}

AppTypography.displayName = 'AppTypography'

export { AppTypography, AppTypographyTheme }
export default AppTypography
