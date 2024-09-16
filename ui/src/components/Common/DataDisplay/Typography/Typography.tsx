import { font } from '@/lib/design-tokens'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { ThemeOptions } from '@mui/material/styles'
import { FC, forwardRef } from 'react'

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

const AppTypography: FC<TypographyProps> = forwardRef<HTMLSpanElement, TypographyProps>(
	({ children, ...rest }, ref) => {
		return (
			<Typography ref={ref} {...rest}>
				{children}
			</Typography>
		)
	}
)

AppTypography.displayName = 'AppTypography'

export { AppTypography, AppTypographyTheme }
export default AppTypography
