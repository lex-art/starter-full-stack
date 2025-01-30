import {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger
} from '@/components/ui/context-menu'
import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger
} from '@/components/ui/menubar'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { Typography } from '@/components/ui/typography'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { File } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { forwardRef } from 'react'

const components: { title: string; href: string; description: string }[] =
	[
		{
			title: 'Alert Dialog',
			href: '/#',
			description:
				'A modal dialog that interrupts the user with important content and expects a response.'
		},
		{
			title: 'Hover Card',
			href: '/#',
			description:
				'For sighted users to preview content available behind a link.'
		},
		{
			title: 'Progress',
			href: '/#',
			description:
				'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.'
		},
		{
			title: 'Scroll-area',
			href: '/#',
			description: 'Visually or semantically separates content.'
		},
		{
			title: 'Tabs',
			href: '/#',
			description:
				'A set of layered sections of content—known as tab panels—that are displayed one at a time.'
		},
		{
			title: 'Tooltip',
			href: '/#',
			description:
				'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.'
		}
	]

const ListItem = forwardRef<
	React.ComponentRef<'a'>,
	React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						className
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	)
})
ListItem.displayName = 'ListItem'

export default function MenuPage() {
	const t = useTranslations()
	return (
		<div className="w-full h-full p-4">
			<Typography variant="h2" muted>
				{t('elements.menu')}
			</Typography>

			<div className="grid auto-rows-max gap-4 lg:grid-cols-2 mt-4">
				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">Menubar</Typography>
					<div className="py-4 gap-4 flex flex-wrap">
						<Menubar>
							<MenubarMenu>
								<MenubarTrigger>File</MenubarTrigger>
								<MenubarContent>
									<MenubarItem>
										New Tab <MenubarShortcut>⌘T</MenubarShortcut>
									</MenubarItem>
									<MenubarItem>
										New Window <MenubarShortcut>⌘N</MenubarShortcut>
									</MenubarItem>
									<MenubarItem disabled>New Incognito Window</MenubarItem>
									<MenubarSeparator />
									<MenubarSub>
										<MenubarSubTrigger>Share</MenubarSubTrigger>
										<MenubarSubContent>
											<MenubarItem>Email link</MenubarItem>
											<MenubarItem>Messages</MenubarItem>
											<MenubarItem>Notes</MenubarItem>
										</MenubarSubContent>
									</MenubarSub>
									<MenubarSeparator />
									<MenubarItem>
										Print... <MenubarShortcut>⌘P</MenubarShortcut>
									</MenubarItem>
								</MenubarContent>
							</MenubarMenu>
							<MenubarMenu>
								<MenubarTrigger>Edit</MenubarTrigger>
								<MenubarContent>
									<MenubarItem>
										Undo <MenubarShortcut>⌘Z</MenubarShortcut>
									</MenubarItem>
									<MenubarItem>
										Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
									</MenubarItem>
									<MenubarSeparator />
									<MenubarSub>
										<MenubarSubTrigger>Find</MenubarSubTrigger>
										<MenubarSubContent>
											<MenubarItem>Search the web</MenubarItem>
											<MenubarSeparator />
											<MenubarItem>Find...</MenubarItem>
											<MenubarItem>Find Next</MenubarItem>
											<MenubarItem>Find Previous</MenubarItem>
										</MenubarSubContent>
									</MenubarSub>
									<MenubarSeparator />
									<MenubarItem>Cut</MenubarItem>
									<MenubarItem>Copy</MenubarItem>
									<MenubarItem>Paste</MenubarItem>
								</MenubarContent>
							</MenubarMenu>
							<MenubarMenu>
								<MenubarTrigger>View</MenubarTrigger>
								<MenubarContent>
									<MenubarCheckboxItem>
										Always Show Bookmarks Bar
									</MenubarCheckboxItem>
									<MenubarCheckboxItem checked>
										Always Show Full URLs
									</MenubarCheckboxItem>
									<MenubarSeparator />
									<MenubarItem inset>
										Reload <MenubarShortcut>⌘R</MenubarShortcut>
									</MenubarItem>
									<MenubarItem disabled inset>
										Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
									</MenubarItem>
									<MenubarSeparator />
									<MenubarItem inset>Toggle Fullscreen</MenubarItem>
									<MenubarSeparator />
									<MenubarItem inset>Hide Sidebar</MenubarItem>
								</MenubarContent>
							</MenubarMenu>
							<MenubarMenu>
								<MenubarTrigger>Profiles</MenubarTrigger>
								<MenubarContent>
									<MenubarRadioGroup value="benoit">
										<MenubarRadioItem value="andy">Andy</MenubarRadioItem>
										<MenubarRadioItem value="benoit">
											Benoit
										</MenubarRadioItem>
										<MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
									</MenubarRadioGroup>
									<MenubarSeparator />
									<MenubarItem inset>Edit...</MenubarItem>
									<MenubarSeparator />
									<MenubarItem inset>Add Profile...</MenubarItem>
								</MenubarContent>
							</MenubarMenu>
						</Menubar>
					</div>
				</div>
				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">Navigation menu</Typography>
					<div className="py-4 gap-4 flex flex-wrap">
						<NavigationMenu>
							<NavigationMenuList>
								<NavigationMenuItem>
									<NavigationMenuTrigger>
										Getting started
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
											<li className="row-span-3">
												<NavigationMenuLink asChild>
													<Link
														className="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-6 no-underline outline-hidden focus:shadow-md"
														href="/#"
													>
														<File className="h-6 w-6" />
														<div className="mb-2 mt-4 text-lg font-medium">
															shadcn/ui
														</div>
														<p className="text-sm leading-tight text-muted-foreground">
															Beautifully designed components built with
															Radix UI and Tailwind CSS.
														</p>
													</Link>
												</NavigationMenuLink>
											</li>
											<ListItem href="/docs" title="Introduction">
												Re-usable components built using Radix UI and
												Tailwind CSS.
											</ListItem>
											<ListItem href="/#" title="Installation">
												How to install dependencies and structure your app.
											</ListItem>
											<ListItem href="/#" title="Typography">
												Styles for headings, paragraphs, lists...etc
											</ListItem>
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<NavigationMenuTrigger>Components</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
											{components.map((component) => (
												<ListItem
													key={component.title}
													title={component.title}
													href={component.href}
												>
													{component.description}
												</ListItem>
											))}
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<Link href="/#" legacyBehavior passHref>
										<NavigationMenuLink
											className={navigationMenuTriggerStyle()}
										>
											Documentation
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
					</div>
				</div>

				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">Context menu</Typography>
					<div className="py-4 gap-4 flex flex-wrap">
						<ContextMenu>
							<ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
								Right click here
							</ContextMenuTrigger>
							<ContextMenuContent className="w-64">
								<ContextMenuItem inset>
									Back
									<ContextMenuShortcut>⌘[</ContextMenuShortcut>
								</ContextMenuItem>
								<ContextMenuItem inset disabled>
									Forward
									<ContextMenuShortcut>⌘]</ContextMenuShortcut>
								</ContextMenuItem>
								<ContextMenuItem inset>
									Reload
									<ContextMenuShortcut>⌘R</ContextMenuShortcut>
								</ContextMenuItem>
								<ContextMenuSub>
									<ContextMenuSubTrigger inset>
										More Tools
									</ContextMenuSubTrigger>
									<ContextMenuSubContent className="w-48">
										<ContextMenuItem>
											Save Page As...
											<ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
										</ContextMenuItem>
										<ContextMenuItem>Create Shortcut...</ContextMenuItem>
										<ContextMenuItem>Name Window...</ContextMenuItem>
										<ContextMenuSeparator />
										<ContextMenuItem>Developer Tools</ContextMenuItem>
									</ContextMenuSubContent>
								</ContextMenuSub>
								<ContextMenuSeparator />
								<ContextMenuCheckboxItem checked>
									Show Bookmarks Bar
									<ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
								</ContextMenuCheckboxItem>
								<ContextMenuCheckboxItem>
									Show Full URLs
								</ContextMenuCheckboxItem>
								<ContextMenuSeparator />
								<ContextMenuRadioGroup value="pedro">
									<ContextMenuLabel inset>People</ContextMenuLabel>
									<ContextMenuSeparator />
									<ContextMenuRadioItem value="pedro">
										Pedro Duarte
									</ContextMenuRadioItem>
									<ContextMenuRadioItem value="colm">
										Colm Tuite
									</ContextMenuRadioItem>
								</ContextMenuRadioGroup>
							</ContextMenuContent>
						</ContextMenu>
					</div>
				</div>
			</div>
		</div>
	)
}
