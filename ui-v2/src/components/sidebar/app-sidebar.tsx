'use client'

import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react'
import * as React from 'react'

import { NavUser } from '@/components/nav-user'
import { NavMain } from '@/components/sidebar/nav-main'
import { TeamSwitcher } from '@/components/team-switcher'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail
} from '@/components/ui/sidebar'
import { menuRoutes } from './menu-route'

// This is sample data.
const data = {
	user: {
		name: 'shadcn',
		email: 'm@example.com',
		avatar: '/avatars/profile.webp'
	},
	teams: [
		{
			name: 'Acme Inc',
			logo: GalleryVerticalEnd,
			plan: 'Enterprise'
		},
		{
			name: 'Acme Corp.',
			logo: AudioWaveform,
			plan: 'Startup'
		},
		{
			name: 'Evil Corp.',
			logo: Command,
			plan: 'Free'
		}
	]
}

export function AppSidebar({ ...props }: React.ComponentProps<'div'>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>
			<SidebarContent>
				{menuRoutes.map((item) => (
					<NavMain
						key={item.section}
						items={item.data}
						title={item.section}
					/>
				))}
				{/*   <NavProjects projects={data.projects} /> */}
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
