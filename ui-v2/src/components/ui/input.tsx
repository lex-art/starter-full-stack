import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Typography } from './typography';

const inputVariants = cva(
	'flex h-9 w-full rounded-md border bg-transparent px-3 py-1  shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
	{
		variants: {
			variant: {
				outline: 'text-base',
				pill: 'text-base',
				filled: 'text-base',
			},
			customColor: {
				primary:['border-primary', 'focus-visible:ring-primary', 'text-primary', 'border-primary'],
				secondary: ['border-secondary', 'focus-visible:ring-secondary-foreground', 'border-secondary-foreground'],
				success: ['border-green-500', 'focus-visible:ring-green-500', 'border-green-500'],
				warning: ['bg-orange-500', 'text-primary-foreground', 'border-orange-500', 'hover:bg-orange-700'],
				info: ['border-blue-500', 'focus-visible:ring-blue-500', 'border-blue-500', ],
				error: ['border-rose-500', 'focus-visible:ring-rose-500', 'text-rose-500', 'border-rose-800'],
				light: ['bg-gray-100', 'text-secondary-foreground', 'border-gray-100', 'hover:bg-gray-200'],
				dark: ['bg-gray-800', 'text-primary-foreground', 'dark:!text-white', 'border-gray-800', 'hover:bg-gray-900/80'],
				default: [
					'border-input', 'focus-visible:ring-ring', 'text-base'
				]	
			},
			inputSize: {
				default: 'text-base',
				sm: 'text-sm',
				lg: 'text-lg'
			}
		},
		defaultVariants: {
			variant: 'outline',
			inputSize: 'default'
		}
	}
)


export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement>,
				VariantProps<typeof inputVariants> {
					inputSize?: 'default' | 'sm' | 'lg';
					helper_text?: string;
					label?: string;
					error?: boolean;
		}

const Input = React.forwardRef<
	HTMLInputElement,
	InputProps
>(({ className, type, inputSize, variant, customColor, id, error, ...props }, ref) => {
	return (
		<div className="flex flex-col w-full">
		<label htmlFor={id} >{props.label}</label>
		<input
			id={id}
			type={type}
			className={
				cn(inputVariants({ variant, inputSize, ...{
					customColor: error ? 'error' : customColor
				}, className }))
			}
			ref={ref}
			{...props}
			/>
		{props?.helper_text && (
			<Typography variant="helper" customColor={
				error ? 'error' : 'default'
			} className='p-1' >{props.helper_text}</Typography>
		)}
			</div>
	)
})
Input.displayName = 'Input'

export { Input }

