import { Input } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'
import { Eye, Search } from 'lucide-react'
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

					<div className="py-4 gap-4 flex flex-wrap">
						<Input placeholder="Default" labelText="Default" fullWidth />
						<Input
							variant="outline"
							placeholder="Outline"
							labelText="Outline"
							fullWidth
						/>
						<Input
							variant="pill"
							placeholder="Pill"
							labelText="Pill"
							fullWidth
						/>
						<Input
							variant="standard"
							placeholder="Standard"
							labelText="Standard"
							fullWidth
						/>
						<Input
							variant="text"
							placeholder="Text"
							labelText="Text"
							fullWidth
						/>
					</div>
				</div>

				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">
						{t('elements.color', {
							count: 2
						})}
					</Typography>

					<div className="py-4 gap-4 flex flex-wrap">
						<Input
							placeholder="Primary"
							color="primary"
							labelText="Primary"
							fullWidth
						/>
						<Input
							variant="outline"
							placeholder="Success"
							labelText="Success"
							fullWidth
							color="success"
						/>
						<Input
							variant="outline"
							placeholder="Error"
							labelText="Error"
							fullWidth
							color="error"
						/>
						<Input
							variant="pill"
							placeholder="Secondary"
							labelText="Secondary"
							fullWidth
							color="secondary"
						/>
						<Input
							variant="standard"
							placeholder="Info"
							labelText="Info"
							fullWidth
							color="info"
						/>
						<Input
							variant="text"
							placeholder="warning"
							labelText="Warning"
							fullWidth
							color="warning"
						/>
					</div>
				</div>

				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">
						{t('elements.text', {
							count: 2
						})}
					</Typography>

					<div className="py-4 gap-4 flex flex-wrap">
						<Input
							placeholder="Primary"
							labelText="Primary"
							fullWidth
							error
							helperText="This field is required"
						/>
					</div>
				</div>

				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">
						{t('elements.icons', {
							count: 2
						})}
					</Typography>

					<div className="py-4 gap-4 flex flex-wrap">
						<Input
							placeholder="Icons left"
							labelText="Icons left"
							fullWidth
							type="number"
							iconLeft={Search}
							prefix="$"
						/>
						<Input
							placeholder="Icon right"
							labelText="Icon right"
							fullWidth
							type="number"
							iconRight={Eye}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
