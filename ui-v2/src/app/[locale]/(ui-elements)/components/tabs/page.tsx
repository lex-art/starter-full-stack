import { Tabs } from '@/components/ui/tabs'
import { Typography } from '@/components/ui/typography'
import { useTranslations } from 'next-intl'

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
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function TabsPage() {
	const t = useTranslations()
	return (
		<div className="w-full h-full p-4">
			<Typography variant="h2" muted>
				{t('elements.tabs')}
			</Typography>

			<div className="grid auto-rows-max gap-4 lg:grid-cols-2 mt-4">
				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">{t('elements.tabs')}</Typography>
					<div className="py-4 gap-4 flex flex-wrap">
						<Tabs defaultValue="account" className="w-[400px]">
							<TabsList className="grid w-full grid-cols-2">
								<TabsTrigger value="account">Account</TabsTrigger>
								<TabsTrigger value="password">Password</TabsTrigger>
							</TabsList>
							<TabsContent value="account">
								<Card>
									<CardHeader>
										<CardTitle>Account</CardTitle>
										<CardDescription>
											Make changes to your account here. Click save when
											you&apos;re done.
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-2">
										<div className="space-y-1">
											<Label htmlFor="name">Name</Label>
											<Input id="name" defaultValue="Pedro Duarte" />
										</div>
										<div className="space-y-1">
											<Label htmlFor="username">Username</Label>
											<Input id="username" defaultValue="@peduarte" />
										</div>
									</CardContent>
									<CardFooter>
										<Button>Save changes</Button>
									</CardFooter>
								</Card>
							</TabsContent>
							<TabsContent value="password">
								<Card>
									<CardHeader>
										<CardTitle>Password</CardTitle>
										<CardDescription>
											Change your password here. After saving, you&apos;ll
											be logged out.
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-2">
										<div className="space-y-1">
											<Label htmlFor="current">Current password</Label>
											<Input id="current" type="password" />
										</div>
										<div className="space-y-1">
											<Label htmlFor="new">New password</Label>
											<Input id="new" type="password" />
										</div>
									</CardContent>
									<CardFooter>
										<Button>Save password</Button>
									</CardFooter>
								</Card>
							</TabsContent>
						</Tabs>
					</div>
				</div>
			</div>
		</div>
	)
}
