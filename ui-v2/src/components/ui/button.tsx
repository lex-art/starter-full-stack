import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'


const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    {
      variants: {
        variant: {
          contained: "shadow",
          outlined: "border border-input bg-transparent text-accent-foreground  shadow-sm",
          pill: "rounded-full shadow",
          text: "bg-transparent",
          ghost: "shadow ",
          link: "bg-transparent underline-offset-4 underline hover:scale-105",
        },
        color: {
          primary: "",
          secondary: "",
          success: "",
          warning: "",
          error: "",
          info: "",
          light: "",
          dark: "",
        },
        size: {
          icon: "w-9 h-9",
          sm: "h-8 rounded-md px-3 text-xs",
          md: "h-9 px-4 py-2",
          lg: "h-11 text-xl rounded-md px-8",
        },
        disabled: {
          true: "cursor-not-allowed",
          false: "cursor-pointer",
        },
      },
      compoundVariants: [
        {
          variant: "contained",
          color: "primary",
          disabled: false,
          className: "bg-primary hover:bg-primary/80 text-white",
        },
        {
          variant: "contained",
          color: "secondary",
          disabled: false,
          className: "bg-secondary-foreground  hover:bg-secondary-foreground/80 text-accent",
        },
        {
          variant: "contained",
          color: "success",
          disabled: false,
          className: `bg-green-500 hover:bg-green-500/80 text-white`,
        },
        {
          variant: "contained",
          color: "warning",
          disabled: false,
          className: `bg-orange-500 hover:bg-orange-500/80 text-white`,
        },
        {
          variant: "contained",
          color: "info",
          disabled: false,
          className: `bg-cyan-500 hover:bg-cyan-500/80 text-white`,
        },
        {
          variant: "contained",
          color: "error",
          disabled: false,
          className: "bg-rose-500 hover:bg-rose-500/80 text-white",
        },
        {
          variant: "contained",
          color: "light",
          disabled: false,
          className: "bg-gray-100 hover:bg-gray-200 text-accent-foreground dark:text-accent",
        },
        {
          variant: "contained",
          color: "dark",
          disabled: false,
          className: "bg-gray-800 hover:bg-gray-900/80 text-primary",
        },
        {
          variant: "contained",
          color: ["primary", "success", "error"],
          disabled: true,
          className: "bg-cat-overlay2",
        },
        {
          variant: "outlined",
          color: "primary",
          disabled: false,
          className: "border-primary text-primary hover:bg-primary/15",
        },
        {
          variant: "outlined",
          color: "secondary",
          disabled: false,
          className: "border-secondary-foreground text-accent-foreground hover:bg-gray-400/15",
        }, 
        {
          variant: "outlined",
          color: "success",
          disabled: false,
          className: "border-green-500 text-green-500 hover:bg-green-500/15",
        },
        {
          variant: "outlined",
          color: "warning",
          disabled: false,
          className: "border-orange-500 text-orange-500 hover:bg-orange-500/15",
        },
        {
          variant: "outlined",
          color: "info",
          disabled: false,
          className: "border-cyan-500 text-cyan-500 hover:bg-cyan-500/15",
        },
        {
          variant: "outlined",
          color: "error",
          disabled: false,
          className: "border-rose-500 text-rose-500 hover:bg-rose-500/15",
        },
        {
          variant: "outlined",
          color: "light",
          disabled: false,
          className: "border-gray-200 text-accent-foreground hover:bg-gray-200",
        },
        {
          variant: "outlined",
          color: "dark",
          disabled: false,
          className: "border-gray-800 hover:bg-gray-900/15",
        },
        {
          variant: "outlined",
          color: ["primary", "success", "error"],
          disabled: true,
          className: "border-cat-overlay2 text-cat-overlay2",
        },
        {
          variant: "text",
          color: "primary",
          disabled: false,
          className: "text-primary hover:bg-primary hover:text-white",
        },
        {
          variant: "text",
          color: "secondary",
          disabled: false,
          className: "text-secondary-foreground hover:bg-secondary-foreground hover:text-accent",
        },
        {
          variant: "text",
          color: "success",
          disabled: false,
          className: "text-green-500 hover:bg-green-500 hover:text-white",
        },
        {
          variant: "text",
          color: "warning",
          disabled: false,
          className: "text-orange-500 hover:bg-orange-500 hover:text-white",
        },
        {
          variant: "text",
          color: "info",
          disabled: false,
          className: "text-cyan-500 hover:bg-cyan-500 hover:text-white",
        },
        {
          variant: "text",
          color: "error",
          disabled: false,
          className: "text-rose-500 hover:bg-rose-500 hover:text-white",
        },
        {
          variant: "text",
          color: "light",
          disabled: false,
          className: "text-accent-foreground hover:bg-gray-200",
        },
        {
          variant: "text",
          color: "dark",
          disabled: false,
          className: "text-primary hover:bg-gray-900/80",
        },
        {
          variant: "text",
          color: ["primary", "success", "error"],
          disabled: true,
          className: "text-cat-overlay2",
        },
        {
          variant: "pill",
          color: "primary",
          disabled: false,
          className: "bg-primary text-white hover:bg-primary/80",
        },
        {
          variant: "pill",
          color: "secondary",
          disabled: false,
          className: "bg-secondary-foreground text-accent hover:bg-secondary-foreground/80",
        },
        {
          variant: "pill",
          color: "success",
          disabled: false,
          className: "bg-green-500 text-white hover:bg-green-500/80",
        },
        {
          variant: "pill",
          color: "warning",
          disabled: false,
          className: "bg-orange-500 text-white hover:bg-orange-500/80",
        },
        {
          variant: "pill",
          color: "info",
          disabled: false,
          className: "bg-cyan-500 text-white hover:bg-cyan-500/80",
        },
        {
          variant: "pill",
          color: "error",
          disabled: false,
          className: "bg-rose-500 text-white hover:bg-rose-500/80",
        },
        {
          variant: "pill",
          color: "light",
          disabled: false,
          className: "bg-gray-100 text-accent-foreground dark:text-accent hover:bg-gray-200",
        },
        {
          variant: "pill",
          color: "dark",
          disabled: false,
          className: "bg-gray-800 text-primary hover:bg-gray-900/80",
        },
        {
          variant: "pill",
          color: ["primary", "success", "error"],
          disabled: true,
          className: "bg-cat-overlay2",
        },
        {
          variant: "link",
          color: "primary",
          disabled: false,
          className: "text-primary",
        },
        {
          variant: "link",
          color: "secondary",
          disabled: false,
          className: "text-secondary-foreground",
        },
        {
          variant: "link",
          color: "success",
          disabled: false,
          className: "text-green-500",
        },
        {
          variant: "link",
          color: "warning",
          disabled: false,
          className: "text-orange-500",
        },
        {
          variant: "link",
          color: "info",
          disabled: false,
          className: "text-cyan-500",
        },
        {
          variant: "link",
          color: "error",
          disabled: false,
          className: "text-rose-500",
        },
        {
          variant: "link",
          color: "light",
          disabled: false,
          className: "text-accent-foreground",
        },
        {
          variant: "link",
          color: "dark",
          disabled: false,
          className: "text-primary",
        },
      ],
      defaultVariants: {
        variant: "contained",
        color: "primary",
        disabled: false,
        size: "md",
      },
    }
)

export interface Props
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'disabled' >,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props>(
	(
		{ className, variant, size, asChild = false, color, disabled, ...props },
		ref
	) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className, color, disabled }))}
        disabled={disabled ?? false}
				ref={ref}
				{...props}
			/>
		)
	}
)
Button.displayName = 'Button'

export { Button, buttonVariants }
