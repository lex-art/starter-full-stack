import { ThemeOptions } from '@mui/material'
import { font } from '@/lib/designTokens'

const AppAutocompleteTheme: ThemeOptions = {
	components: {
		MuiAutocomplete: {
			defaultProps: {
				inputMode: 'search'
			},
			styleOverrides: {
				root: {
					'&.MuiAutocomplete-hasPopupIcon .MuiAutocomplete-inputRoot, &.MuiAutocomplete-hasClearIcon .MuiAutocomplete-inputRoot':
						{
							padding: '0 4rem 0 1rem'
						},
					'& .MuiAutocomplete-endAdornment': {
						height: '3rem',
						top: 'calc(50% - 22px)',
						'& .MuiAutocomplete-clearIndicator ': {
							'& .MuiSvgIcon-root': {
								fontSize: '2.8rem',
								height: '3rem',
								width: '3rem'
							},
							'& .MuiSvgIcon-fontSizeMedium ': {
								fontSize: '3rem',
								margin: '0',
								padding: '0'
							}
						},
						'& .MuiAutocomplete-popupIndicator ': {
							'& .MuiSvgIcon-root': {
								fontSize: '2.8rem',
								height: '4rem',
								width: '4rem'
							},
							'& .MuiSvgIcon-fontSizeMedium ': {
								fontSize: '4rem',
								margin: '0',
								padding: '0'
							}
						}
					}
				},
				listbox: {
					fontSize: font.sizes.fontSizeLarge
				},
				option: {
					fontSize: font.sizes.fontSizeLarge
				},
				noOptions: {
					fontSize: font.sizes.fontSizeLarge
				},
				loading: {
					fontSize: font.sizes.fontSizeLarge
				}
			}
		}
	}
}

export { AppAutocompleteTheme }