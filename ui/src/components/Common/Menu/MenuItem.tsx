import { font } from '@/lib/design-tokens'
import { ThemeOptions } from '@mui/material'
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import { FC } from 'react'

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
const AppMenuItem: FC<MenuItemProps> = ({ children, ...props }) => {
	return <MenuItem {...props}>{children}</MenuItem>
}

AppMenuItem.displayName = 'TikalBoxMenuItem'
export { AppMenuItem, AppMuiItemTheme }
export default AppMenuItem
