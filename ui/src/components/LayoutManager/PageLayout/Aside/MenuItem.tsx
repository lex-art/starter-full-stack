import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import Icons from '@/components/Common/Icons/Icons'
import AppList from '@/components/Common/Menu/ListMenu/List'
import AppListItem from '@/components/Common/Menu/ListMenu/ListItem'
import AppListItemButton from '@/components/Common/Menu/ListMenu/ListItemButton'
import AppListItemIcon from '@/components/Common/Menu/ListMenu/ListItemIcon'
import AppListItemText from '@/components/Common/Menu/ListMenu/ListItemText'
import { useRouter } from '@/i18n/routing'
import { ISubMenuRoute } from '@/types/MenuRoute'
import { Collapse } from '@mui/material'
import { useTranslations } from 'next-intl'
import { ReactNode, useState } from 'react'
import messages from '../../../../i18n/locales/es/common.json'

interface MenuItemProps {
	text: keyof typeof messages
	icon?: ReactNode
	link?: string
	index?: number
	submenu?: Array<ISubMenuRoute>
	openAside?: boolean
	handleDrawerClose?(): void
	section?: keyof typeof messages
	defaultOpen?: boolean
}

export default function MenuItem({
	text,
	icon,
	link,
	index,
	submenu,
	openAside,
	handleDrawerClose,
	section,
	defaultOpen
}: Readonly<MenuItemProps>) {
	const t = useTranslations('common')
	const [open, setOpen] = useState(defaultOpen ?? false)
	const redirect = useRouter()

	const handleClick = () => {
		if (submenu) {
			setOpen(!open)
		} else {
			handleDrawerClose && handleDrawerClose()
			//TODO: Add navigation
			if (link) {
				redirect.push(link)
			}
		}
	}

	return (
		<AppListItem disablePadding sx={{ display: 'block' }}>
			{section && openAside && (
				<AppTypography
					variant="h5"
					fontWeight="bold"
					color="primary"
					sx={{ px: 2.5, py: 1, opacity: openAside ? 1 : 0 }}
				>
					{t(section)}
				</AppTypography>
			)}
			<AppListItemButton
				sx={{
					minHeight: 48,
					justifyContent: openAside ? 'initial' : 'center',
					px: 2.5
				}}
				onClick={handleClick}
				selected={!!link}
			>
				<AppListItemIcon
					sx={{
						minWidth: 0,
						mr: openAside ? 3 : 'auto',
						justifyContent: 'center'
					}}
				>
					{icon}
				</AppListItemIcon>
				{openAside && <AppListItemText primary={t(text) + ' ' + index} sx={{ opacity: openAside ? 1 : 0 }} />}
				{submenu && openAside ? open ? <Icons.ExpandLess /> : <Icons.ExpandMore /> : null}
			</AppListItemButton>
			{submenu && (
				<Collapse in={open} timeout="auto" unmountOnExit>
					<AppList component="div" disablePadding>
						{submenu.map((subMenu, index) => (
							<AppListItemButton
								sx={{
									pl: openAside ? 5 : 3,
									minHeight: 48,
									backgroundColor: 'rgba(0, 0, 0, 0.04)',
									justifyContent: openAside ? 'initial' : 'center'
								}}
								key={'sub-' + subMenu.text + index}
								onClick={() => {
									handleDrawerClose && handleDrawerClose()
									redirect.push(subMenu.link)
								}}
							>
								<AppListItemIcon
									sx={{
										minWidth: 0,
										mr: openAside ? 3 : 'auto',
										justifyContent: 'center'
									}}
								>
									{subMenu.icon}
								</AppListItemIcon>
								{openAside && (
									<AppListItemText
										primary={t(subMenu.text) + ' ' + index}
										sx={{ opacity: openAside ? 1 : 0 }}
									/>
								)}
							</AppListItemButton>
						))}
					</AppList>
				</Collapse>
			)}
		</AppListItem>
	)
}
