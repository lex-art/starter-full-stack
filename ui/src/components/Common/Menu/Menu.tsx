import Menu, { MenuProps } from '@mui/material/Menu'
import { FC, forwardRef } from 'react'

const AppMenu: FC<MenuProps> = forwardRef<HTMLDivElement, MenuProps>(({ children, ...rest }, ref) => {
	return (
		<Menu ref={ref} {...rest}>
			{children}
		</Menu>
	)
})

AppMenu.displayName = 'AppMenu'
export { AppMenu }
export default AppMenu
