
import { Link } from '@/i18n/routing'
import { colors } from '@/lib/designTokens'
import { FC } from 'react'

interface AppRedirectRowProps {
	to: string
	text: string
}

const AppRedirectRow: FC<AppRedirectRowProps> = ({ to = '#', text = '' }) => {
	return (
		<Link
			style={{
				color: colors.light.primary,
				textDecoration: 'underline',
				cursor: 'cursor'
			}}
			href={to}
		>
			{text}
		</Link>
	)
}

AppRedirectRow.displayName = 'AppRedirectRow'
export default AppRedirectRow
