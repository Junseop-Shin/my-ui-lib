import * as React from "react"
import { cn } from "@/lib/utils"

const Label = React.forwardRef<
  HTMLLabelElement,
  React.ComponentPropsWithoutRef<"label">
>(({ className, onMouseDown, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    onMouseDown={(event) => {
      onMouseDown?.(event)
      // 라벨을 더블클릭했을 때 텍스트가 선택되지 않도록 한다
      if (!event.defaultPrevented && event.detail > 1) {
        event.preventDefault()
      }
    }}
    {...props}
  />
))
Label.displayName = "Label"

export { Label }
