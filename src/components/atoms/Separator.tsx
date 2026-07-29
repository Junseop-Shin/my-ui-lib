import * as React from "react"
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive> & { decorative?: boolean }
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <SeparatorPrimitive
    ref={ref}
    orientation={orientation}
    // Base UI Separator는 role을 붙이지 않고 data-orientation만 렌더한다.
    // Radix가 decorative로 처리하던 접근성 시맨틱을 직접 지정한다.
    role={decorative ? "none" : "separator"}
    aria-orientation={
      !decorative && orientation === "vertical" ? "vertical" : undefined
    }
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
      className
    )}
    {...props}
  />
))
Separator.displayName = "Separator"

export { Separator }
