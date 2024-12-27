import { Input } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'
import { useTranslations } from 'next-intl'

export default function InputPage() {
	const t = useTranslations()
	return (
		<div className="w-full h-full p-4">
			<Typography variant="h2" muted>
				{t('elements.textField')}
			</Typography>

			<div className="grid auto-rows-max gap-4 lg:grid-cols-2 mt-4">
				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">
						{t('elements.variant', {
							count: 2
						})}
					</Typography>

					<div className="py-4 gap-4 flex">
						<Input
							placeholder="Placeholder"
							helper_text="Hola"
							label="Label"
							customColor="success"
							error
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
