
import MenuItem, {
	MenuItemProps
} from '@mui/material/MenuItem'
import { forwardRef } from 'react'

/**
 * AppMenuItem
 * @param value <string | number | readonly string[]>: value of the item
 * @param children: <ReactNode>: The content of the component.
 * @returns component
 */
const AppMenuItem = forwardRef<
	HTMLLIElement,
	MenuItemProps
>(({ children, ...props }, ref) => {
	return (
		<MenuItem ref={ref} {...props}>
			{children}
		</MenuItem>
	)
})
AppMenuItem.displayName = 'AppBoxMenuItem'
export default AppMenuItem
