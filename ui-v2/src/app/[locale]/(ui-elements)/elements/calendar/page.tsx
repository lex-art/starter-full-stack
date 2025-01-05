'use client'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'

import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function CalendarPage() {
	const t = useTranslations()
	const [date, setDate] = useState<Date | undefined>(new Date())
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="w-full h-full p-4">
			<Typography variant="h2" muted>
				{t('elements.calendar')}
			</Typography>

			<div className="grid auto-rows-max gap-4 lg:grid-cols-2 mt-4">
				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">{t('elements.calendar')}</Typography>
					<div className="py-4 gap-4 flex flex-wrap">
						<Popover open={isOpen} onOpenChange={setIsOpen}>
							<PopoverTrigger asChild>
								<Button
									variant={'outline'}
									className={cn('w-full font-normal')}
								>
									<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
								</Button>
							</PopoverTrigger>
							<PopoverContent
								className="w-80 p-0 flex items-start"
								align="start"
							>
								<Calendar
									mode="single"
									captionLayout="dropdown"
									selected={date}
									onSelect={setDate}
									fromYear={2000}
									toYear={2025}
								/>
							</PopoverContent>
						</Popover>
					</div>
				</div>
				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">{t('elements.calendar')}</Typography>
					<div className="py-4 gap-4 flex flex-wrap">
						<Calendar
							mode="single"
							captionLayout="dropdown"
							selected={date}
							onSelect={setDate}
							fromYear={2000}
							toYear={2025}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
