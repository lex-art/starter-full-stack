import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, HTMLAttributes } from 'react'

const typographyVariants = cva('', {
	variants: {
		variant: {
			h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
			h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
			h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
			h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
			body: 'leading-7 not-first:mt-6',
			blockquote: 'mt-6 border-l-2 pl-6 italic',
			list: 'my-6 ml-6 list-disc [&>li]:mt-2',
			small: 'text-sm font-medium leading-none',
			large: 'text-lg font-semibold',
			helper:
				'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
		},
		color: {
			primary: 'text-primary-foreground',
			secondary: 'text-secondary-foreground',
			success: 'text-green-500',
			warning: 'text-orange-500',
			error: 'text-rose-500',
			light: 'text-gray-100',
			dark: 'text-gray-800',
			default: 'text-secondary-foreground'
		},
		weight: {
			bold: 'font-bold',
			extrabold: 'font-extrabold',
			semibold: 'font-semibold',
			medium: 'font-medium',
			regular: 'font-normal',
			light: 'font-light'
		},
		muted: {
			true: 'text-muted-foreground'
		}
	},
	defaultVariants: {
		weight: 'regular',
		variant: 'body'
	}
})

type TypographyProps = HTMLAttributes<HTMLElement> &
	VariantProps<typeof typographyVariants> & {
		children: React.ReactNode
	}

const h1 = forwardRef<HTMLHeadingElement, TypographyProps>(
	({ children, weight, muted, className, color, ...props }, ref) => {
		return (
			<h1
				ref={ref}
				className={cn(
					typographyVariants({
						variant: 'h1',
						weight,
						muted,
						color,
						className
					})
				)}
				{...props}
			>
				{children}
			</h1>
		)
	}
)
h1.displayName = 'TypographyH1'

const h2 = forwardRef<HTMLHeadingElement, TypographyProps>(
	({ children, weight, muted, className, color, ...props }, ref) => {
		return (
			<h2
				ref={ref}
				className={cn(
					typographyVariants({
						variant: 'h2',
						weight,
						muted,
						color,
						className
					})
				)}
				{...props}
			>
				{children}
			</h2>
		)
	}
)

h2.displayName = 'TypographyH2'

const h3 = forwardRef<HTMLHeadingElement, TypographyProps>(
	({ children, weight, muted, className, color, ...props }, ref) => {
		return (
			<h3
				ref={ref}
				className={cn(
					typographyVariants({
						variant: 'h3',
						weight,
						muted,
						color,
						className
					})
				)}
				{...props}
			>
				{children}
			</h3>
		)
	}
)

h3.displayName = 'TypographyH3'

const h4 = forwardRef<HTMLHeadingElement, TypographyProps>(
	({ children, weight, muted, className, color, ...props }, ref) => {
		return (
			<h4
				ref={ref}
				className={cn(
					typographyVariants({
						variant: 'h4',
						weight,
						muted,
						color,
						className
					})
				)}
				{...props}
			>
				{children}
			</h4>
		)
	}
)
h4.displayName = 'TypographyH4'

const body = forwardRef<HTMLParagraphElement, TypographyProps>(
	({ children, weight, className, color, ...props }, ref) => {
		return (
			<p
				ref={ref}
				className={cn(
					typographyVariants({
						variant: 'body',
						weight,
						color,
						className
					})
				)}
				{...props}
			>
				{children}
			</p>
		)
	}
)
body.displayName = 'TypographyBody'

const blockquote = forwardRef<HTMLQuoteElement, TypographyProps>(
	({ children, weight, muted, className, color, ...props }, ref) => {
		return (
			<blockquote
				ref={ref}
				className={cn(
					typographyVariants({
						variant: 'blockquote',
						weight,
						muted,
						color,
						className
					})
				)}
				{...props}
			>
				{children}
			</blockquote>
		)
	}
)
blockquote.displayName = 'TypographyBlockquote'

const small = forwardRef<HTMLHeadingElement, TypographyProps>(
	({ children, weight, className, color, ...props }, ref) => {
		return (
			<small
				ref={ref}
				className={cn(
					typographyVariants({
						variant: 'small',
						weight,
						color,
						className
					})
				)}
				{...props}
			>
				{children}
			</small>
		)
	}
)

small.displayName = 'TypographySmall'

const large = forwardRef<HTMLDivElement, TypographyProps>(
	({ children, weight, className, color, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(
					typographyVariants({
						variant: 'large',
						weight,
						color,
						className
					})
				)}
				{...props}
			>
				{children}
			</div>
		)
	}
)

large.displayName = 'TypographyLarge'

const list = forwardRef<HTMLUListElement, TypographyProps>(
	({ children, weight, className, color, ...props }, ref) => {
		return (
			<ul
				ref={ref}
				className={cn(
					typographyVariants({
						variant: 'list',
						weight,
						color,
						className
					})
				)}
				{...props}
			>
				{children}
			</ul>
		)
	}
)

list.displayName = 'TypographyList'

const helper = forwardRef<HTMLLabelElement, TypographyProps>(
	({ children, weight, className, color, ...props }, ref) => {
		return (
			<span
				ref={ref}
				className={cn(
					typographyVariants({
						variant: 'helper',
						weight,
						color,
						className
					})
				)}
				{...props}
			>
				{children}
			</span>
		)
	}
)
helper.displayName = 'TypographyHelper'

const variants = {
	h1,
	h2,
	h3,
	h4,
	body,
	small,
	large,
	blockquote,
	list,
	helper
}

const Typography = forwardRef<HTMLHeadingElement, TypographyProps>(
	({ variant = 'body', children, ...props }, ref) => {
		const Component = variants[variant as unknown as keyof typeof variants]
		return (
			<Component ref={ref as any} {...props}>
				{children}
			</Component>
		)
	}
)

Typography.displayName = 'Typography'
export { Typography }
