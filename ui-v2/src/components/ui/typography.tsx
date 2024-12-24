import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'

const typographyVariants = cva('', {
	variants: {
		variant: {
			h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
			h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
			h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
			h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
			body: 'leading-7 [&:not(:first-child)]:mt-6',
			blockquote: 'mt-6 border-l-2 pl-6 italic',
			list: 'my-6 ml-6 list-disc [&>li]:mt-2',
      small: 'text-sm font-medium leading-none',
      large: 'text-lg font-semibold'
		},
		
    weight: {
      bold: 'font-bold',
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

export interface TypographyProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof typographyVariants> {
  children: React.ReactNode;
}

const h1 = forwardRef<HTMLHeadingElement, TypographyProps>(
	({ children, weight, muted, className, ...props }, ref) => {
		return (
			<h1
				ref={ref}
				className={
					cn(typographyVariants({ variant: 'h1', weight, muted, className }))
				}
				{...props}
			>
				{children}
			</h1>
		)
	}
)
const h2 = forwardRef<HTMLHeadingElement, TypographyProps>(
	({ children, weight, muted, className, ...props }, ref) => {
		return (
			<h2
				ref={ref}
				className={
          cn(typographyVariants({ variant: 'h2', weight, muted,className }))
        }
				{...props}
			>
				{children}
			</h2>
		)
	}
)

const h3 = forwardRef<HTMLHeadingElement, TypographyProps>(
	({ children, weight,muted, className, ...props }, ref) => {
		return (
			<h3
				ref={ref}
				className={
          cn(typographyVariants({ variant: 'h3', weight, muted, className }))
        }
				{...props}
			>
				{children}
			</h3>
		)
	}
)

const h4 = forwardRef<HTMLHeadingElement, TypographyProps>(
	({ children, weight,muted, className, ...props }, ref) => {
		return (
			<h4
				ref={ref}
				className={
          cn(typographyVariants({ variant: 'h4', weight, muted, className }))
        }
				{...props}
			>
				{children}
			</h4>
		)
	}
)

const body = forwardRef<HTMLParagraphElement, TypographyProps>(
	({ children, weight, className, ...props }, ref) => {
		return (
			<p
				ref={ref}
				className={cn(typographyVariants({ variant: 'body', weight, className }))}
				{...props}
			>
				{children}
			</p>
		)
	}
)

const blockquote = forwardRef<HTMLQuoteElement, TypographyProps>(
	({ children,weight, muted, className, ...props }, ref) => {
		return (
			<blockquote
				ref={ref}
				className={
          cn(typographyVariants({ variant: 'blockquote', weight, muted, className }))
        }
				{...props}
			>
				{children}
			</blockquote>
		)
	}
)

const small = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, weight, className, ...props }, ref) => {
    return (
      <small
        ref={ref}
        className={cn(typographyVariants({ variant: 'small', weight, className }))}
        {...props}
      >
        {children}
      </small>
    )
  }
)

const large = forwardRef<HTMLDivElement, TypographyProps>(
  ({ children, weight, className, ...props }, ref) => {
    return (
      <div ref={ref} className="text-lg font-semibold" {...props }>{children}</div>
    )
  })



const variants = {
	h1,
	h2,
	h3,
	h4,
	body,
  small,
  large,
	blockquote
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

export { Typography }
