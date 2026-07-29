import * as React from "react"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-transparent text-foreground hover:bg-accent data-[pressed]:bg-primary data-[pressed]:text-primary-foreground",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-accent data-[pressed]:border-primary data-[pressed]:bg-primary data-[pressed]:text-primary-foreground",
        ghost:
          "bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground data-[pressed]:bg-accent data-[pressed]:text-foreground",
      },
      size: {
        sm: "h-8 rounded-full px-4 text-xs",
        md: "h-10 rounded-full px-5 text-sm",
        lg: "h-12 rounded-full px-7 text-base",
        icon: "h-10 w-10 rounded-full",
        "icon-sm": "h-8 w-8 rounded-full",
        "icon-lg": "h-12 w-12 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive>,
    VariantProps<typeof toggleVariants> {}

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive>,
  ToggleProps
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive
    ref={ref}
    className={cn(toggleVariants({ variant, size }), className)}
    {...props}
  />
))
Toggle.displayName = "Toggle"

export { Toggle, toggleVariants }
