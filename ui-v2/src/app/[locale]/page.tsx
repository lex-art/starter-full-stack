import userPermission from '@/actions/auth/user-permission.action'
import { auth } from '@/auth'
import { Typography } from '@/components/ui/typography'
import { Link } from '@/i18n/routing'
import { PageParams } from '@/types/page-params'
import { getTranslations } from 'next-intl/server'

export default async function HomePage(params: PageParams) {
	const t = await getTranslations('common')
	const session = await auth()
	//const locale = useLocale() //TODO: get locale from session from header and set from ui
	const access = await userPermission('projects')

	return (
		<div>
			<h1>{t('home')} from server</h1>
			<div className="w-full h-full p-4">
				<Typography variant="h2" muted>
					session data
				</Typography>

				<div className="grid auto-rows-max gap-4 lg:grid-cols-2 mt-4">
					<div className="w-full h-full rounded-xl bg-muted/50 p-4">
						<Typography variant="h2">user</Typography>
						<div className="py-4 gap-4 flex flex-wrap">
							<code className="whitespace-pre-line break-all block">
								{JSON.stringify(session, null, 2)}
							</code>
						</div>
					</div>
					<div className="w-full h-full rounded-xl bg-muted/50 p-4">
						<Typography variant="h2">
							token third-party backends
						</Typography>
						<div className="py-4 gap-4 flex flex-wrap">
							<code className="whitespace-pre-line break-words">
								{JSON.stringify(
									{
										accessToken: session?.data?.accessToken,
										refreshToken: session?.data?.refreshToken
									},
									null,
									2
								)}
							</code>
						</div>
					</div>
				</div>
				<div className="grid auto-rows-max gap-4 lg:grid-cols-2 mt-4">
					<div className="w-full h-full rounded-xl bg-muted/50 p-4">
						<Typography variant="h2">Permisos</Typography>
						<div className="py-4 gap-4 flex flex-wrap">
							<code className="whitespace-pre-line break-words">
								{JSON.stringify(access, null, 2)}
							</code>
						</div>
					</div>
					<div className="w-full h-full rounded-xl bg-muted/50 p-4">
						<Typography variant="h2">context</Typography>
						<div className="py-4 gap-4 flex flex-wrap">
							<code className="whitespace-pre-line break-words">
								{JSON.stringify(
									{
										...(await params.params),
										...(await params.searchParams)
									},
									null,
									2
								)}
							</code>
						</div>
					</div>
				</div>
			</div>
			<Link href="/client">{t('home')} from Client</Link>
		</div>
	)
}
