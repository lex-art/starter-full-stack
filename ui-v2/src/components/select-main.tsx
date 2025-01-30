import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Label } from './ui/label'
import {
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectRoot,
	SelectTrigger,
	SelectValue,
	SelectVariants
} from './ui/select'

export type OptionsSelect = Array<
	| {
			label: string
			value: string
	  }
	| {
			group: string
			options: {
				label: string
				value: string
			}[]
	  }
>

export default function SelectMain({
	label,
	placeholder,
	options,
	className,
	fullWidth,
	iconRight: IconRight,
	iconLeft: IconLeft,
	...props
}: {
	label: string
	placeholder?: string
	options: OptionsSelect
	className?: string
	fullWidth?: boolean
	color?: string
	variant?: string
	iconRight?: LucideIcon
	iconLeft?: LucideIcon
	disabled?: boolean
} & SelectVariants) {
	const t = useTranslations()
	return (
		<div className={cn(fullWidth && 'min-w-full')}>
			<Label>{label}</Label>
			<SelectRoot>
				<SelectTrigger className={className} {...props}>
					<div className="flex gap-2 items-center w-full">
						{IconLeft && <IconLeft />}
						<SelectValue
							placeholder={placeholder ?? t('elements.selectAnOption')}
						/>
					</div>
					{IconRight && <IconRight />}
				</SelectTrigger>
				<SelectContent position="popper">
					<SelectGroup>
						{options?.length === 0 && (
							<SelectItem value="none" disabled>
								{t('elements.noOptions')}
							</SelectItem>
						)}
						{options?.length > 0 &&
							options?.map((option) =>
								'group' in option ? (
									<SelectGroup key={option.group}>
										<SelectLabel>{option.group}</SelectLabel>
										{option.options.map((option) => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectGroup>
								) : (
									<SelectItem key={option.value} value={option.value}>
										{option.label}
									</SelectItem>
								)
							)}
					</SelectGroup>
				</SelectContent>
			</SelectRoot>
		</div>
	)
}
