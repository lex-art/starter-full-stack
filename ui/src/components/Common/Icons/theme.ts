import { ThemeOptions } from '@mui/material/styles'

const AppIconsTheme: ThemeOptions = {
	components: {
		MuiSvgIcon: {
			variants: [
				{
					props: { fontSize: 'large' },
					style: {
						width: '3.9rem',
						height: '3.9rem'
					}
				},
				{
					props: { fontSize: 'medium' },
					style: {
						width: '3rem',
						height: '3rem'
					}
				},
				{
					props: { fontSize: 'small' },
					style: {
						width: '2rem',
						height: '2rem'
					}
				},
				{
					props: { fontSize: 'smaller' },
					style: {
						width: '1.5rem',
						height: '1.5rem'
					}
				}
			]
		}
	}
}

export { AppIconsTheme }
