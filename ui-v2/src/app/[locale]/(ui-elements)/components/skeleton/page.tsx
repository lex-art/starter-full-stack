import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Typography } from '@/components/ui/typography'
import { useTranslations } from 'next-intl'

export default function SkeletonPage() {
	const t = useTranslations()
	return (
		<div className="w-full h-full p-4">
			<Typography variant="h2" muted>
				{t('elements.skeleton')}
			</Typography>

			<div className="grid auto-rows-max gap-4 lg:grid-cols-2 mt-4">
				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">{t('elements.skeleton')}</Typography>
					<div className="py-4 gap-4 flex flex-wrap">
						<Card className="w-[350px] ">
							<CardHeader>
								<Skeleton className="h-12 w-12 rounded-full" />
							</CardHeader>
							<CardContent>
								<div className="space-y-2">
									<Skeleton className="h-4 w-[250px]" />
									<Skeleton className="h-4 w-[200px]" />
								</div>
							</CardContent>
						</Card>

						<Card className="w-[350px]">
							<CardHeader>
								<Skeleton className="h-[125px] w-[250px] rounded-xl" />
							</CardHeader>
							<CardContent>
								<div className="space-y-2">
									<Skeleton className="h-4 w-[250px]" />
									<Skeleton className="h-4 w-[200px]" />
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	)
}
