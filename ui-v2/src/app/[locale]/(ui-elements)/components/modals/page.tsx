import { Button } from '@/components/ui/button'
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger
} from '@/components/ui/context-menu'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Typography } from '@/components/ui/typography'
import { Copy } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function ModalPage() {
	const t = useTranslations()
	return (
		<div className="w-full h-full p-4">
			<Typography variant="h2" muted>
				{t('elements.dialog')}
			</Typography>

			<div className="grid auto-rows-max gap-4 lg:grid-cols-2 mt-4">
				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">{t('elements.dialog')}</Typography>
					<div className="py-4 gap-4 flex flex-wrap">
						<Dialog>
							<DialogTrigger asChild>
								<Button variant="outline">Edit Profile</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>Edit profile</DialogTitle>
									<DialogDescription>
										Make changes to your profile here. Click save when
										you&apos;re done.
									</DialogDescription>
								</DialogHeader>
								<div className="grid gap-4 py-4">
									<div className="grid grid-cols-4 items-center gap-4">
										<Label htmlFor="name" className="text-right">
											Name
										</Label>
										<Input
											id="name"
											defaultValue="Pedro Duarte"
											className="col-span-3"
										/>
									</div>
									<div className="grid grid-cols-4 items-center gap-4">
										<Label htmlFor="username" className="text-right">
											Username
										</Label>
										<Input
											id="username"
											defaultValue="@peduarte"
											className="col-span-3"
										/>
									</div>
								</div>
								<DialogFooter>
									<Button type="submit">Save changes</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>

						<Dialog>
							<DialogTrigger asChild>
								<Button variant="outline" color="secondary">
									Share
								</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-md">
								<DialogHeader>
									<DialogTitle>Share link</DialogTitle>
									<DialogDescription>
										Anyone who has this link will be able to view this.
									</DialogDescription>
								</DialogHeader>
								<div className="flex items-center space-x-2">
									<div className="grid flex-1 gap-2">
										<Label htmlFor="link" className="sr-only">
											Link
										</Label>
										<Input
											id="link"
											defaultValue="https://ui.shadcn.com/docs/installation"
											readOnly
										/>
									</div>
									<Button type="submit" size="sm" className="px-3">
										<span className="sr-only">Copy</span>
										<Copy />
									</Button>
								</div>
								<DialogFooter className="sm:justify-start">
									<DialogClose asChild>
										<Button type="button" variant="secondary">
											Close
										</Button>
									</DialogClose>
								</DialogFooter>
							</DialogContent>
						</Dialog>

						<Dialog>
							<ContextMenu>
								<ContextMenuTrigger>Right click</ContextMenuTrigger>
								<ContextMenuContent>
									<ContextMenuItem>Open</ContextMenuItem>
									<ContextMenuItem>Download</ContextMenuItem>
									<DialogTrigger asChild>
										<ContextMenuItem>
											<span>Delete</span>
										</ContextMenuItem>
									</DialogTrigger>
								</ContextMenuContent>
							</ContextMenu>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Are you absolutely sure?</DialogTitle>
									<DialogDescription>
										This action cannot be undone. Are you sure you want to
										permanently delete this file from our servers?
									</DialogDescription>
								</DialogHeader>
								<DialogFooter>
									<Button type="submit">Confirm</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
				</div>
			</div>
		</div>
	)
}
