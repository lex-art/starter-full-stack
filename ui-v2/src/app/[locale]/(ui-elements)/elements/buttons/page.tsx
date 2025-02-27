import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function InputPage() {
	const t = useTranslations()
	return (
		<div className="w-full h-full p-4">
			<Typography variant="h2" muted>
				{t('elements.button', {
					count: 1
				})}
			</Typography>

			<div className="grid auto-rows-max gap-4 lg:grid-cols-2 mt-4">
				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">{t('elements.solid')}</Typography>

					<div className="py-4 gap-4 flex flex-wrap">
						<Button variant="default">Primary</Button>

						<Button variant="secondary">Secondary</Button>

						<Button variant="destructive">Destructive</Button>

						<Button variant="outline">Outline</Button>

						<Button variant="ghost">Ghost</Button>

						<Button variant="link">Link</Button>

						<Button variant="outline" size="icon">
							<ChevronRight />
						</Button>
					</div>
				</div>
				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">{t('elements.outline')}</Typography>
					<div className="py-4 gap-4 flex">
						<Button variant="outline" color="primary">
							Primary
						</Button>

						<Button variant="outline" color="secondary">
							Secondary
						</Button>

						<Button variant="outline" color="success">
							Success
						</Button>

						<Button variant="outline" color="warning">
							Warning
						</Button>

						<Button variant="outline" color="error">
							error
						</Button>

						<Button variant="outline" color="light">
							Light
						</Button>

						<Button variant="outline" color="dark">
							Dark
						</Button>
					</div>
				</div>

				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">{t('elements.text')}</Typography>
					<div className="py-4 gap-4 flex flex-wrap">
						<Button variant="text" color="primary">
							Primary
						</Button>

						<Button variant="text" color="secondary">
							Secondary
						</Button>

						<Button variant="text" color="success">
							Success
						</Button>

						<Button variant="text" color="warning">
							Warning
						</Button>

						<Button variant="text" color="info">
							Info
						</Button>

						<Button variant="text" color="error">
							error
						</Button>

						<Button variant="text" color="light">
							Light
						</Button>

						<Button variant="text" color="dark">
							Dark
						</Button>
					</div>
				</div>

				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">{t('elements.pills')}</Typography>
					<div className="py-4 gap-4 flex">
						<Button variant="pill" color="primary">
							Primary
						</Button>

						<Button variant="pill" color="secondary">
							Secondary
						</Button>

						<Button variant="pill" color="success">
							Success
						</Button>

						<Button variant="pill" color="warning">
							Warning
						</Button>

						<Button variant="pill" color="error">
							error
						</Button>

						<Button variant="pill" color="light">
							Light
						</Button>

						<Button variant="pill" color="dark">
							Dark
						</Button>
					</div>
				</div>

				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">{t('elements.link')}</Typography>
					<div className="py-4 gap-4 flex">
						<Button variant="link" color="primary">
							Primary
						</Button>

						<Button variant="link" color="secondary">
							Secondary
						</Button>

						<Button variant="link" color="success">
							Success
						</Button>

						<Button variant="link" color="warning">
							Warning
						</Button>

						<Button variant="link" color="error">
							error
						</Button>

						<Button variant="link" color="light">
							Light
						</Button>

						<Button variant="link" color="dark">
							Dark
						</Button>
					</div>
				</div>

				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">{t('elements.sizes')}</Typography>
					<div className="py-4 gap-4 flex items-center ">
						<Button color="secondary" size="icon">
							Icon
						</Button>

						<Button color="primary" size="md" isLoading>
							Default
						</Button>

						<Button color="warning" size="sm">
							Small
						</Button>

						<Button color="success" size="lg">
							Large
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
