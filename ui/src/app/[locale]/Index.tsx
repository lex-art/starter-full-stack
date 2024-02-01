'use client'

import Link from 'next/link'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { useLocale, useTranslations } from 'next-intl'
import PageLayout from '@/components/PageLayout/PageLayout'

type Props = {
	session: Session | null
}

export default function Index({ session }: Props) {
	const t = useTranslations('common.Index')
	const locale = useLocale()

	function onLogoutClick() {
		signOut({
			callbackUrl: locale + '/auth/login'
		})
	}
	return (
		<PageLayout>
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
				</>
			)}
		</PageLayout>
	)
}
