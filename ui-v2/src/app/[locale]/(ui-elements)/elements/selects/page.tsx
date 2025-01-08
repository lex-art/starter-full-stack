'use client'
import { MultiSelect } from '@/components/multi-select'
import Select, { OptionsSelect } from '@/components/select-main'
import { Typography } from '@/components/ui/typography'
import {
	Cat,
	Dog,
	Fish,
	Loader2Icon,
	Rabbit,
	Search,
	Turtle
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

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

const frameworksList = [
	{ value: 'react', label: 'React', icon: Turtle },
	{ value: 'angular', label: 'Angular', icon: Cat },
	{ value: 'vue', label: 'Vue', icon: Dog },
	{ value: 'svelte', label: 'Svelte', icon: Rabbit },
	{ value: 'ember', label: 'Ember', icon: Fish }
]

export default function SelectPage() {
	const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([
		'react',
		'angular'
	])
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
						<Select
							label="Default"
							placeholder="Select an option"
							options={data}
							variant="default"
							fullWidth
						/>
						<Select
							label="Outline"
							placeholder="Select an option"
							options={data}
							variant="outline"
							fullWidth
						/>
						<Select
							label="Pill"
							placeholder="Select an option"
							options={data}
							variant="pill"
							fullWidth
						/>
						<Select
							label="standard"
							placeholder="Select an option"
							options={data}
							variant="standard"
							fullWidth
						/>
						<Select
							label="Text"
							placeholder="Select an option"
							options={data}
							variant="text"
							fullWidth
						/>
					</div>
				</div>
				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">{t('elements.icons')}</Typography>

					<div className="py-4 gap-4 flex flex-wrap">
						<Select
							label="Outline"
							placeholder="Select an option"
							options={data}
							variant="outline"
							color="primary"
							fullWidth
							iconLeft={Search}
						/>
						<Select
							label="Default"
							placeholder="Select an option"
							options={data}
							variant="outline"
							color="secondary"
							fullWidth
							iconRight={Loader2Icon}
						/>
						<Select
							label="Default"
							placeholder="Select an option"
							options={data}
							variant="pill"
							color="error"
							fullWidth
							iconLeft={Search}
							iconRight={Loader2Icon}
						/>
					</div>
				</div>

				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">{t('elements.multiselect')}</Typography>

					<div className="py-4 gap-4 flex flex-wrap">
						<div className="p-4 max-w-xl">
							<MultiSelect
								options={frameworksList}
								onValueChange={setSelectedFrameworks}
								defaultValue={selectedFrameworks}
								placeholder="Select frameworks"
								variant="inverted"
								animation={2}
								maxCount={3}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
