import Menu, { MenuProps } from '@mui/material/Menu'
import { FC } from 'react'

const AppMenu: FC<MenuProps> = ({ children, ...rest }) => {
	return <Menu {...rest}>{children}</Menu>
}

AppMenu.displayName = 'TikalBoxMenu'
export { AppMenu }
export default AppMenu
