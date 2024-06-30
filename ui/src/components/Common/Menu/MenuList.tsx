import { MenuList, MenuListProps } from '@mui/material'
import { forwardRef, ElementType } from 'react'

const AppMenuList = forwardRef<
	HTMLUListElement,
	MenuListProps & { component?: ElementType<any, keyof JSX.IntrinsicElements> }
>(({ children, ...props }, ref) => {
	return (
		<MenuList ref={ref} {...props}>
			{children}
		</MenuList>
	)
})

AppMenuList.displayName = 'AppMenuList'
export { AppMenuList }
