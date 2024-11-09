import { createContext, useContext } from 'react'

const AppGlobalContext = createContext({
	toggleColorMode: () => {},
	isLoading: false,
	setIsLoading: (value: boolean) => {}
})

const useAppTheme = () => useContext(AppGlobalContext)

export { AppGlobalContext, useAppTheme }
