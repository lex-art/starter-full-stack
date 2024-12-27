import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "shadow",
        outline:
          "border border-input !bg-background !text-[--color] hover:!text-white hover:!bg-[--color] shadow-sm ",
        text:
          "!bg-transparent !text-[--color]  hover:!text-white hover:!bg-[--color]",
        pill:
          "rounded-full",
        link: "!bg-transparent !text-[--color] underline-offset-4 underline transition-all hover:scale-105",
        ghost: "hover:bg-accent hover:text-accent-foreground",

      },
      color: {
        primary: ["bg-primary", "text-primary-foreground", "border-primary", "hover:bg-primary/80",  "[--color:theme(colors.primary.DEFAULT)]"],
        secondary: ["bg-secondary", "text-secondary-foreground", "hover:text-secondary", "border-gray-400", "hover:bg-secondary-foreground/90",  "[--color:theme(colors.secondary.foreground)]"],
        success: ["bg-green-500", "text-primary-foreground", "border-green-500", "hover:bg-green-700", "[--color:theme(colors.green.500)]"],
        warning: ["bg-orange-500", "text-primary-foreground", "border-orange-500", "hover:bg-orange-700", "[--color:theme(colors.orange.500)]"],
        error: ["bg-rose-500", "text-primary-foreground", "border-rose-500", "hover:bg-rose-800", "[--color:theme(colors.rose.500)]"],
        light: ["bg-gray-100", "text-secondary-foreground", "border-gray-100", "hover:bg-gray-200", "[--color:theme(colors.gray.400)]"],
        dark: ["bg-gray-800", "text-primary-foreground", "dark:!text-white" ,"border-gray-800", "hover:bg-gray-900/80", "[--color:theme(colors.gray.800)]"],
        default: ["bg-accent", "border-accent", "hover:bg-accent/80"],
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 text-xl rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      color: "default"
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  color?: "primary" | "secondary" | "success" | "warning" | "error" | "light" | "dark" | "default"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, color, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, color, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
