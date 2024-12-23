import { Link } from '@/i18n/routing'

export default function InputPage() {
	return (
		<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min px-4 py-2">
			<h1>Input Page</h1>
			<Link href="/dashboard">User</Link>
		</div>
	)
}
