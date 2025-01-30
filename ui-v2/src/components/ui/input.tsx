import { colors } from '@/design-tokens/colors'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { LucideIcon } from 'lucide-react'
import { ComponentProps, forwardRef } from 'react'
import { Typography } from './typography'

const inputVariants = cva(
	'flex h-9 w-full rounded-md border bg-transparent px-3 py-1 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
	{
		variants: {
			variant: {
				default: 'border-input focus-visible:ring-ring shadow-xs ',
				outline: 'shadow-xs',
				pill: 'rounded-full shadow-xs',
				standard:
					'rounded-none focus-visible:ring-0 border-b-1 focus-visible:border-b-2 border-t-0 border-l-0 border-r-0 ',
				text: 'border-0 focus-visible:ring-0 text-(--color)!'
			},
			color: {
				primary: [
					'focus-visible:ring-primary',
					'text-base',
					'border-primary',
					colors.primary
				],
				secondary: [
					'border-secondary',
					'focus-visible:ring-secondary-foreground',
					'border-secondary-foreground',
					colors.secondary
				],
				success: [
					'border-green-500',
					'focus-visible:ring-green-500',
					colors.success
				],
				warning: [
					'text-primary-foreground',
					'border-orange-500',
					colors.warning
				],
				info: [
					'border-blue-500',
					'focus-visible:ring-blue-500',
					colors.info
				],
				error: [
					'border-rose-500',
					'focus-visible:ring-rose-500',
					'text-rose-500',
					'border-rose-800',
					colors.error
				],
				light: [
					'bg-gray-100',
					'text-secondary-foreground',
					'border-gray-100',
					'hover:bg-gray-200',
					colors.light
				],
				dark: [
					'bg-gray-800',
					'text-primary-foreground',
					'dark:text-white!',
					'border-gray-800',
					'hover:bg-gray-900/80',
					colors.dark
				],
				default: ['border-input', 'focus-visible:ring-ring', 'text-base']
			},
			size: {
				default: 'text-base',
				sm: 'text-sm',
				lg: 'text-lg'
			},
			icon: {
				right: 'pr-9',
				left: 'pl-9'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
			color: 'default'
		}
	}
)

type InputProps = ComponentProps<'input'> &
	VariantProps<typeof inputVariants> & {
		iconRight?: LucideIcon
		iconLeft?: LucideIcon
		error?: boolean
		helperText?: string
		fullWidth?: boolean
		labelText?: string
	}

const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			id,
			className,
			fullWidth,
			size,
			type,
			variant,
			color,
			error,
			labelText,
			iconLeft: IconLeft,
			iconRight: IconRight,
			helperText,
			...props
		},
		ref
	) => {
		const marginIcon = () => {
			if (IconRight) return 'right'
			if (IconLeft) return 'left'
			return undefined
		}
		return (
			<div
				className={`grid w-full max-w-sm items-center gap-1 ${fullWidth ? 'min-w-full' : ''}`}
			>
				<label htmlFor={id}>{labelText}</label>
				<div className="relative w-full">
					<div className="absolute top-1/2 transform -translate-y-1/2 left-2">
						{IconLeft && <IconLeft />}
					</div>
					<input
						id={id}
						type={type}
						className={cn(
							inputVariants({
								variant,
								size,
								...{
									color: error ? 'error' : color
								},
								icon: marginIcon(),
								className
							})
						)}
						ref={ref}
						{...props}
					/>
					{IconRight && (
						<IconRight className="absolute top-1/2 transform -translate-y-1/2 right-2" />
					)}
				</div>
				{helperText && (
					<Typography
						variant="helper"
						color={error ? 'error' : 'default'}
						className="p-1"
					>
						{helperText}
					</Typography>
				)}
			</div>
		)
	}
)
Input.displayName = 'Input'

export { Input }
