/* import { getServerSession } from 'next-auth'
import auth from '../../auth'
import Index from './Index'

export default async function IndexPage() {
	const session = await getServerSession(auth)
	return <Index session={session} />
}
 */

import configAuth from '../api/auth/configAuth'
import { getServerSession } from 'next-auth'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { useLocale } from 'next-intl'
import { Button, Typography } from '@mui/material'
import AppGrid from '@/components/Common/Grid/Grid'

type Props = {
	session: Session | null
}

export default async function Index() {
	const session = await getServerSession(configAuth)
	const locale = useLocale()

	async function onLogoutClick() {
		await signOut({
			callbackUrl: locale + '/auth/login'
		})
	}
	return (
		<AppGrid width="100%" height="100%">
			{session ? (
				<>
					{/* <p>{t('loggedIn', { username: session.user?.name })}</p>
					<p>
						<Link href={locale + '/secret'}>{t('secret')}</Link>
					</p>
					<button onClick={onLogoutClick} type="button">
						{t('logout')}
					</button> */}
					<h1>Logueado</h1>
				</>
			) : (
				<>
					{/* <p>{t('loggedOut')}</p>
					<Link href={locale + '/login'}>{t('login')}</Link> */}
					<h1>No logueado</h1>
					{/* <button onClick={onLogoutClick} type="button">
						logout
					</button> */}
					<Typography variant="h1">holaaaaaaaaaaaaa</Typography>
					<Button sx={{ fontSize: '3rem' }} variant="contained" color="secondary">
						holaaaaaaaaaaaaa
					</Button>
				</>
			)}
		</AppGrid>
	)
}
