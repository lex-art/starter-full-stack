import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Typography } from '@/components/ui/typography'
import { useTranslations } from 'next-intl'

const data = [
	{ label: 'Default', value: 'default' },
	{ label: 'Comfortable', value: 'comfortable' },
	{ label: 'Compact', value: 'compact' }
]

export default function CheckboxPage() {
	const t = useTranslations()
	return (
		<div className="w-full h-full p-4">
			<Typography variant="h2" muted>
				{t('elements.checkbox')}
			</Typography>

			<div className="grid auto-rows-max gap-4 lg:grid-cols-2 mt-4">
				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">{t('elements.solid')}</Typography>

					<div className="py-4 gap-4 flex flex-wrap">
						<Checkbox />
						<div className="items-top flex space-x-2">
							<Checkbox id="terms1" />
							<div className="grid gap-1.5 leading-none">
								<label
									htmlFor="terms1"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									Accept terms and conditions
								</label>
								<p className="text-sm text-muted-foreground">
									You agree to our Terms of Service and Privacy Policy.
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">Switch</Typography>

					<div className="py-4 gap-4 flex flex-wrap">
						<div className="flex items-center space-x-2">
							<Switch id="airplane-mode" label="Airplane Mode" />
						</div>
					</div>
				</div>

				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">Radio Group</Typography>
					<div className="py-4 gap-4 flex flex-wrap">
						<RadioGroup data={data} />
					</div>
				</div>
			</div>
		</div>
	)
}
