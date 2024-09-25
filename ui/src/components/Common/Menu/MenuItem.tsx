import { font } from '@/lib/designTokens'
import { ThemeOptions } from '@mui/material'
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import { FC, forwardRef } from 'react'

const AppMuiItemTheme: ThemeOptions = {
	components: {
		MuiMenuItem: {
			styleOverrides: {
				root: {
					fontSize: font.sizes.fontSizeMedium,
					fontWeight: 400,
					lineHeight: '3rem',
					padding: '1rem 2rem'
				}
			}
		}
	}
}

/**
 * AppMenuItem
 * @param value <string | number | readonly string[]>: value of the item
 * @param children: <ReactNode>: The content of the component.
 * @returns component
 */
const AppMenuItem: FC<MenuItemProps> = forwardRef<HTMLLIElement, MenuItemProps>(
	({ children, ...props }, ref) => {
		return (
			<MenuItem ref={ref} {...props}>
				{children}
			</MenuItem>
		)
	}
)
AppMenuItem.displayName = 'AppBoxMenuItem'
export { AppMenuItem, AppMuiItemTheme }
export default AppMenuItem
