import { Badge, badgeVariants } from '@/components/ui/badge'
import { Typography } from '@/components/ui/typography'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

export default function ChipPage() {
	const t = useTranslations()
	return (
		<div className="w-full h-full p-4">
			<Typography variant="h2" muted>
				{t('elements.badge')}
			</Typography>

			<div className="grid auto-rows-max gap-4 lg:grid-cols-2 mt-4">
				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">{t('elements.badge')}</Typography>
					<div className="py-4 gap-4 flex flex-wrap">
						<Badge>Badge default</Badge>
						<Badge variant="secondary">Secondary</Badge>
						<Badge variant="outline">Outline</Badge>
						<Badge variant="destructive">Destructive</Badge>
						<Link
							href="#"
							className={badgeVariants({ variant: 'outline' })}
						>
							Badge link
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
