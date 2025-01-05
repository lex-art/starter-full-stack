import { Typography } from '@/components/ui/typography'
import {
	Home,
	Loader,
	LoaderCircle,
	Search,
	Settings,
	User
} from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function IconPage() {
	const t = useTranslations()
	return (
		<div className="w-full h-full p-4">
			<Typography variant="h2" muted>
				{t('elements.icons')}
			</Typography>

			<div className="grid auto-rows-max gap-4 lg:grid-cols-2 mt-4">
				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">lucide react</Typography>
					<div className="py-4 gap-4 flex flex-wrap">
						<Search />
						<Loader className="animate-spin" />
						<LoaderCircle className="animate-spin" />
						<Loader className="animate-spin" color="red" size={36} />
						<LoaderCircle
							className="animate-spin"
							color="blue"
							size={48}
						/>
					</div>
				</div>
				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">Colors</Typography>
					<div className="py-4 gap-4 flex flex-wrap">
						<Search color="red" />
						<Settings color="blue" />
						<Home color="green" />
						<User color="purple" />
					</div>
				</div>

				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">Size</Typography>
					<div className="py-4 gap-4 flex flex-wrap">
						<Search size={16} />
						<Settings size={24} />
						<Home size={36} />
						<User size={48} />
					</div>
				</div>
			</div>
		</div>
	)
}
