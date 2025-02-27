import RichTextEditor from '@/components/rich-text-editor'
import { Typography } from '@/components/ui/typography'
import { useTranslations } from 'next-intl'

export default function EditorPage() {
	const t = useTranslations()
	return (
		<div className="w-full h-full p-4">
			<Typography variant="h2" muted>
				{t('elements.editors')}
			</Typography>

			<div className="grid auto-rows-max gap-4 lg:grid-cols-2 mt-4">
				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">{t('elements.editors')}</Typography>
					<div className="py-4 gap-4 flex flex-wrap w-full">
						<RichTextEditor />
					</div>
				</div>
			</div>
		</div>
	)
}
