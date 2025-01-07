'use client'

import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport
} from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

export function Toaster() {
	const { toasts } = useToast()

	return (
		<ToastProvider>
			{toasts.map(function ({
				id,
				title,
				description,
				action,
				position,
				...props
			}) {
				return (
					<Toast
						key={id}
						className={cn(
							'm-1',
							{
								'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4':
									position === 'top-right',
								'bottom-0 left-0 flex fixed md:max-w-[420px] md:bottom-4 md:left-4':
									position === 'bottom-left',
								'top-0 left-0 flex fixed md:max-w-[420px] md:top-4 md:left-4':
									position === 'top-left'
							},
							props.className
						)}
						{...props}
					>
						<div className="grid gap-1">
							{title && <ToastTitle>{title}</ToastTitle>}
							{description && (
								<ToastDescription>{description}</ToastDescription>
							)}
						</div>
						{action}
						<ToastClose />
					</Toast>
				)
			})}
			<ToastViewport />
		</ToastProvider>
	)
}
