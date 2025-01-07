'use client'

import { Button } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast'
import { Typography } from '@/components/ui/typography'
import { useToast } from '@/hooks/use-toast'
import { useTranslations } from 'next-intl'

export default function SnackbarPage() {
	const t = useTranslations()
	const { toast } = useToast()
	return (
		<div className="w-full h-full p-4">
			<Typography variant="h2" muted>
				{t('elements.toast')}
			</Typography>

			<div className="grid auto-rows-max gap-4 lg:grid-cols-2 mt-4">
				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">{t('elements.toast')}</Typography>
					<div className="py-4 gap-4 flex flex-wrap">
						<Button
							variant="outline"
							onClick={() => {
								toast({
									title: 'Scheduled: Catch up ',
									description: 'Friday, February 10, 2023 at 5:57 PM',
									action: (
										<ToastAction altText="Goto schedule to undo">
											Undo
										</ToastAction>
									)
								})
							}}
						>
							Add to calendar
						</Button>

						<Button
							variant="outline"
							color="error"
							onClick={() => {
								toast({
									position: 'top-right',
									variant: 'destructive',
									title: 'Scheduled: Catch up ',
									description: 'Friday, February 10, 2023 at 5:57 PM',
									action: (
										<ToastAction altText="Goto schedule to undo">
											Undo
										</ToastAction>
									)
								})
							}}
						>
							Destructive
						</Button>
						<Button
							variant="outline"
							color="info"
							onClick={() => {
								toast({
									position: 'bottom-left',
									description: 'Friday, February 10, 2023 at 5:57 PM',
									action: (
										<ToastAction altText="Goto schedule to undo">
											Undo
										</ToastAction>
									)
								})
							}}
						>
							Simple
						</Button>

						<Button
							variant="outline"
							color="warning"
							onClick={() => {
								toast({
									position: 'bottom-left',
									title: 'Scheduled: Catch up ',
									action: (
										<ToastAction altText="Goto schedule to undo">
											Undo
										</ToastAction>
									)
								})
							}}
						>
							Title
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
