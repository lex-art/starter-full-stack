import SelectMain, { OptionsSelect } from '@/components/select-main'
import { Typography } from '@/components/ui/typography'
import { useTranslations } from 'next-intl'

const data: OptionsSelect = [
	{ label: 'Option 1', value: 'option1' },
	{ label: 'Option 2', value: 'option2' },
	{ label: 'Option 3', value: 'option3' },
	{ label: 'Option 4', value: 'option4' },
	{
		group: 'Group 1',
		options: [
			{ label: 'Option 5', value: 'option5' },
			{ label: 'Option 6', value: 'option6' }
		]
	}
]

export default function SelectPage() {
	const t = useTranslations()
	return (
		<div className="w-full h-full p-4">
			<Typography variant="h2" muted>
				{t('elements.select')}
			</Typography>

			<div className="grid auto-rows-max gap-4 lg:grid-cols-2 mt-4">
				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">{t('elements.solid')}</Typography>

					<div className="py-4 gap-4 flex flex-wrap">
						<SelectMain
							label="Default"
							placeholder="Select an option"
							options={data}
							variant="default"
							fullWidth
						/>
						<SelectMain
							label="Outline"
							placeholder="Select an option"
							options={data}
							variant="outline"
							fullWidth
						/>
						<SelectMain
							label="Pill"
							placeholder="Select an option"
							options={data}
							variant="pill"
							fullWidth
						/>
						<SelectMain
							label="standard"
							placeholder="Select an option"
							options={data}
							variant="standard"
							fullWidth
						/>
						<SelectMain
							label="Text"
							placeholder="Select an option"
							options={data}
							variant="text"
							fullWidth
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
