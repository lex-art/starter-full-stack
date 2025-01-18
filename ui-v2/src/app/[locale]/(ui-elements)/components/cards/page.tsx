import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	SelectContent,
	SelectItem,
	SelectRoot,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'
import { useTranslations } from 'next-intl'

export default function CardPage() {
	const t = useTranslations()
	return (
		<div className="w-full h-full p-4">
			<Typography variant="h2" muted>
				{t('elements.card')}
			</Typography>

			<div className="grid auto-rows-max gap-4 lg:grid-cols-2 mt-4">
				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">{t('elements.card')}</Typography>
					<div className="py-4 gap-4 flex flex-wrap">
						<Card>
							<CardHeader>
								<CardTitle>Card Title</CardTitle>
								<CardDescription>Card Description</CardDescription>
							</CardHeader>
							<CardContent>
								<p>Card Content</p>
							</CardContent>
							<CardFooter>
								<p>Card Footer</p>
							</CardFooter>
						</Card>
					</div>
				</div>
				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">{t('elements.card')}</Typography>
					<div className="py-4 gap-4 flex flex-wrap">
						<Card className="w-[350px]">
							<CardHeader>
								<CardTitle>Create project</CardTitle>
								<CardDescription>
									Deploy your new project in one-click.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<form>
									<div className="grid w-full items-center gap-4">
										<div className="flex flex-col space-y-1.5">
											<Label htmlFor="name">Name</Label>
											<Input
												id="name"
												placeholder="Name of your project"
											/>
										</div>
										<div className="flex flex-col space-y-1.5">
											<Label htmlFor="framework">Framework</Label>
											<SelectRoot>
												<SelectTrigger id="framework">
													<SelectValue placeholder="Select" />
												</SelectTrigger>
												<SelectContent position="popper">
													<SelectItem value="next">Next.js</SelectItem>
													<SelectItem value="sveltekit">
														SvelteKit
													</SelectItem>
													<SelectItem value="astro">Astro</SelectItem>
													<SelectItem value="nuxt">Nuxt.js</SelectItem>
												</SelectContent>
											</SelectRoot>
										</div>
									</div>
								</form>
							</CardContent>
							<CardFooter className="flex justify-between">
								<Button variant="outline" color="error">
									Cancel
								</Button>
								<Button>Deploy</Button>
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</div>
	)
}
