'use client'

import getSessionClient from '@/actions/auth/get-session-client.action'
import getTokenApi from '@/actions/auth/get-token.action'
import userPermission from '@/actions/auth/user-permission.action'
import { Typography } from '@/components/ui/typography'
import { Session } from 'next-auth'
import { useLocale, useTranslations } from 'next-intl'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function HomePage() {
	const t = useTranslations('common')
	const locale = useLocale()
	const [session, setSession] = useState<Session | null>(null)
	const [token, setToken] = useState<RequestCookie | undefined>()
	const [access, setAccess] = useState({})

	useEffect(() => {
		getAccess()
	}, [])

	const getAccess = async () => {
		const access = await userPermission('projects')
		const session = await getSessionClient()
		const token = await getTokenApi()
		setAccess(access)
		setSession(session)
		setToken(token)
	}

	return (
		<div>
			<h1>{t('home')} from Client</h1>
			<div className="w-full h-full p-4">
				<Typography variant="h2" muted>
					session data
				</Typography>

				<div className="grid auto-rows-max gap-4 lg:grid-cols-2 mt-4">
					<div className="w-full h-full rounded-xl bg-muted/50 p-4">
						<Typography variant="h2">user</Typography>
						<div className="py-4 gap-4 flex flex-wrap">
							<code>{JSON.stringify(session, null, 2)}</code>
						</div>
					</div>
					<div className="w-full h-full rounded-xl bg-muted/50 p-4">
						<Typography variant="h2">token</Typography>
						<div className="py-4 gap-4 flex flex-wrap">
							<code>{JSON.stringify(token, null, 2)}</code>
						</div>
					</div>
				</div>
				<div className="grid auto-rows-max gap-4 lg:grid-cols-2 mt-4">
					<div className="w-full h-full rounded-xl bg-muted/50 p-4">
						<Typography variant="h2">Permisos</Typography>
						<div className="py-4 gap-4 flex flex-wrap">
							<code>{JSON.stringify(access, null, 2)}</code>
						</div>
					</div>
					<div className="w-full h-full rounded-xl bg-muted/50 p-4">
						<Typography variant="h2">context</Typography>
						<div className="py-4 gap-4 flex flex-wrap">
							<code>{JSON.stringify({ locale }, null, 2)}</code>
						</div>
					</div>
				</div>
			</div>
			<Link href="/">{t('home')} from Server</Link>
		</div>
	)
}
