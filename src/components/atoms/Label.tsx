import * as React from "react"
import { cn } from "@/lib/utils"

const Label = React.forwardRef<
  HTMLLabelElement,
  React.ComponentPropsWithoutRef<"label">
>(({ className, onMouseDown, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium text-foreground leading-none",
      // 네이티브 폼 요소(Input, Textarea)는 :disabled로, Base UI 컴포넌트는
      // <span>을 렌더해 data-disabled로 상태를 노출하므로 둘 다 건다.
      "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      "peer-data-[disabled]:cursor-not-allowed peer-data-[disabled]:opacity-70",
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
