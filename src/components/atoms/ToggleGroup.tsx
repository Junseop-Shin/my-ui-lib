import * as React from "react"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { cn } from "@/lib/utils"

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive>
>(({ className, ...props }, ref) => (
  <ToggleGroupPrimitive
    ref={ref}
    className={cn(
      "inline-flex items-center gap-1 rounded-full border border-border p-1",
      "data-[orientation=vertical]:flex-col",
      className
    )}
    {...props}
  />
))
ToggleGroup.displayName = "ToggleGroup"

export { ToggleGroup }
