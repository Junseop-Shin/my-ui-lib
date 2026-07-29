import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof InputPrimitive> {}

const Input = React.forwardRef<
  React.ElementRef<typeof InputPrimitive>,
  InputProps
>(({ className, ...props }, ref) => (
  <InputPrimitive
    ref={ref}
    className={cn(
      "flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
      "aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive",
      className
    )}
    {...props}
  />
))
Input.displayName = "Input"

export { Input }
