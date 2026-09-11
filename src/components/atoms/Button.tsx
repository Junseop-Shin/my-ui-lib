import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-(--duration-normal) ease-theme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.97]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-accent active:scale-[0.97]",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-accent active:scale-[0.97]",
        ghost:
          "bg-transparent text-foreground hover:bg-accent active:scale-[0.97]",
        destructive:
          "bg-destructive text-destructive-foreground hover:opacity-90 active:scale-[0.97]",
        link: "bg-transparent text-primary underline-offset-4 hover:underline h-auto p-0",
      },
      size: {
        sm: "h-button-sm rounded-button px-button-x-sm text-xs",
        md: "h-button-md rounded-button px-button-x-md text-sm",
        lg: "h-button-lg rounded-button px-button-x-lg text-base",
        icon: "h-button-md w-button-md rounded-button",
        "icon-sm": "h-button-sm w-button-sm rounded-button",
        "icon-lg": "h-button-lg w-button-lg rounded-button",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof ButtonPrimitive>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<
  React.ElementRef<typeof ButtonPrimitive>,
  ButtonProps
>(({ className, variant, size, ...props }, ref) => (
  <ButtonPrimitive
    ref={ref}
    className={cn(buttonVariants({ variant, size }), className)}
    {...props}
    data-ui="button"
    data-variant={variant ?? "default"}
    data-size={size ?? "md"}
  />
))
Button.displayName = "Button"

export { Button, buttonVariants }
