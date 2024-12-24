import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

export default function InputPage() {
	const t = useTranslations()
	return (
		<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min px-4 py-2">
			<h1>
				{t('elements.button', {
					count: 1
				})}
			</h1>
			<div>
				<h2>{t('elements.contained')}</h2>
				<Button variant="default" color="primary">
					Primary
				</Button>
			</div>
		</div>
	)
}
