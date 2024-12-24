import { Typography } from '@/components/ui/typography'
import { useTranslations } from 'next-intl'

export default function TypographyPage() {
	const t = useTranslations()
	return (
		<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min px-4 py-2">
			<Typography variant="h2" muted>
				{t('elements.typography')}
			</Typography>
			<div className="py-4">
				<Typography variant="h1">Variants</Typography>
				<Typography variant="h1">{t('elements.h1')}</Typography>
				<Typography variant="h2">{t('elements.h2')}</Typography>
				<Typography variant="h3">{t('elements.h3')}</Typography>
				<Typography variant="h4">{t('elements.h4')}</Typography>
				<Typography variant="small">{t('elements.small')}</Typography>
				<Typography variant="large">{t('elements.large')}</Typography>
				<Typography variant="body">{t('elements.body')}</Typography>
				<Typography variant="blockquote">
					{t('elements.blockquote')}
				</Typography>
			</div>
		</div>
	)
}
