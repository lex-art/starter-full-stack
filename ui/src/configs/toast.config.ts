import { font } from '@/lib/design-tokens'
import { SnackbarOrigin } from 'notistack'
import { CSSProperties } from 'react'

interface SettingsToast {
	anchorOrigin: SnackbarOrigin | undefined
	style: CSSProperties | undefined
}
export const SETTINGS_TOAST: SettingsToast = {
	anchorOrigin: {
		vertical: 'top',
		horizontal: 'right'
	},
	style: {
		fontSize: font.sizes.fontSizeLarge,
		whiteSpace: 'pre-line'
	}
}
