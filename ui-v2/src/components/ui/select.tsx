'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp, LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { useTranslations } from 'next-intl'
import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from 'react'
import { Label } from './label'

const SelectRoot = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const selectVariants = cva(
	'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs ring-offset-background placeholder:text-muted-foreground focus:outline-hidden focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
	{
		variants: {
			variant: {
				default: 'border-input focus-visible:ring-primary',
				outline: 'border-input shadow-xs',
				pill: 'border-input rounded-full shadow-xs',
				text: 'border-0 focus:ring-0 shadow-none',
				standard:
					'rounded-none focus:ring-0 border-b-1 focus:border-b-2  border-t-0 border-l-0 border-r-0'
			},
			color: {
				default: '',
				primary: '',
				secondary: '',
				success: '',
				warning: '',
				info: '',
				error: 'border-rose-500 focus-visible:ring-rose-500',
				light: ''
			},
			size: {
				sm: 'h-7',
				md: 'h-9',
				lg: 'h-11'
			},
			disabled: {
				true: 'cursor-not-allowed',
				false: 'cursor-pointer'
			}
		},
		compoundVariants: [
			{
				variant: 'default',
				color: 'default',
				disabled: false,
				className: 'focus-visible:ring-primary'
			},
			{
				variant: ['outline', 'pill'],
				color: 'primary',
				disabled: false,
				className: 'border-primary focus-visible:ring-primary'
			},
			{
				color: 'secondary',
				variant: ['outline', 'pill'],
				disabled: false,
				className:
					'border-secondary focus-visible:ring-secondary-foreground'
			},
			{
				color: 'success',
				variant: ['outline', 'pill'],
				disabled: false,
				className: 'border-green-500 focus-visible:ring-green-500'
			},
			{
				color: 'warning',
				variant: ['outline', 'pill'],
				disabled: false,
				className: 'border-orange-500'
			},
			{
				variant: ['outline', 'pill'],
				color: 'info',
				disabled: false,
				className: 'border-blue-500 focus-visible:ring-blue-500'
			},
			{
				variant: ['outline', 'pill'],
				color: 'error',
				disabled: false,
				className: 'border-rose-500 focus-visible:ring-rose-500'
			},
			{
				color: 'light',
				variant: ['outline', 'pill'],
				disabled: false,
				className: 'border-gray-300 focus-visible:ring-gray-300'
			}
		],
		defaultVariants: {
			variant: 'default',
			color: 'default',
			disabled: false
		}
	}
)

type SelectVariants = VariantProps<typeof selectVariants> & {
	iconLeft?: LucideIcon
	iconRight?: LucideIcon
}

const SelectTrigger = forwardRef<
	ComponentRef<typeof SelectPrimitive.Trigger>,
	ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & SelectVariants
>(
	(
		{
			className,
			children,
			variant,
			color = 'default',
			disabled,
			size,
			...props
		},
		ref
	) => (
		<SelectPrimitive.Trigger
			ref={ref}
			className={cn(
				selectVariants({
					variant,
					color,
					disabled,
					size,
					className
				})
			)}
			{...props}
		>
			{children}
			<SelectPrimitive.Icon asChild>
				<ChevronDown className="h-4 w-4 opacity-50" />
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	)
)
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = forwardRef<
	ComponentRef<typeof SelectPrimitive.ScrollUpButton>,
	ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.ScrollUpButton
		ref={ref}
		className={cn(
			'flex cursor-default items-center justify-center py-1',
			className
		)}
		{...props}
	>
		<ChevronUp className="h-4 w-4" />
	</SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName =
	SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = forwardRef<
	ComponentRef<typeof SelectPrimitive.ScrollDownButton>,
	ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.ScrollDownButton
		ref={ref}
		className={cn(
			'flex cursor-default items-center justify-center py-1',
			className
		)}
		{...props}
	>
		<ChevronDown className="h-4 w-4" />
	</SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
	SelectPrimitive.ScrollDownButton.displayName

const SelectContent = forwardRef<
	ComponentRef<typeof SelectPrimitive.Content>,
	ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
	<SelectPrimitive.Portal>
		<SelectPrimitive.Content
			ref={ref}
			className={cn(
				'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
				position === 'popper' &&
					'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
				className
			)}
			position={position}
			{...props}
		>
			<SelectScrollUpButton />
			<SelectPrimitive.Viewport
				className={cn(
					'p-1',
					position === 'popper' &&
						'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
				)}
			>
				{children}
			</SelectPrimitive.Viewport>
			<SelectScrollDownButton />
		</SelectPrimitive.Content>
	</SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = forwardRef<
	ComponentRef<typeof SelectPrimitive.Label>,
	ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.Label
		ref={ref}
		className={cn('px-2 py-1.5 text-sm font-semibold', className)}
		{...props}
	/>
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = forwardRef<
	ComponentRef<typeof SelectPrimitive.Item>,
	ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
	<SelectPrimitive.Item
		ref={ref}
		className={cn(
			'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
			className
		)}
		{...props}
	>
		<span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
			<SelectPrimitive.ItemIndicator>
				<Check className="h-4 w-4" />
			</SelectPrimitive.ItemIndicator>
		</span>
		<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
	</SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = forwardRef<
	ComponentRef<typeof SelectPrimitive.Separator>,
	ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.Separator
		ref={ref}
		className={cn('-mx-1 my-1 h-px bg-muted', className)}
		{...props}
	/>
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

type OptionsSelect = Array<
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

const Select = forwardRef<
	ComponentRef<typeof SelectPrimitive.Trigger>,
	ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> &
		SelectVariants & {
			label: string
			placeholder?: string
			options: OptionsSelect
			fullWidth?: boolean
			iconRight?: LucideIcon
			iconLeft?: LucideIcon
			className?: string
			onChangeValue?: (value: string) => void
			defaultValue?: string
		}
>(
	(
		{
			className,
			fullWidth,
			label,
			iconLeft: IconLeft,
			iconRight: IconRight,
			placeholder,
			options,
			defaultValue,
			onChangeValue,
			...props
		},
		ref
	) => {
		const t = useTranslations()
		return (
			<div className={cn(fullWidth && 'min-w-full')}>
				<Label>{label}</Label>
				<SelectRoot
					defaultValue={defaultValue}
					onValueChange={(value) => onChangeValue?.(value)}
				>
					<SelectTrigger ref={ref} className={className} {...props}>
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
												<SelectItem
													key={option.value}
													value={option.value}
												>
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
)
Select.displayName = SelectRoot.displayName

export {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectRoot,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue
}

export type { OptionsSelect, SelectVariants }
