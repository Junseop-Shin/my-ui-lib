import * as React from "react"
import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      // Base UI Switch는 <span>을 렌더하므로 :disabled 의사클래스가 걸리지 않는다.
      // 상태는 data-disabled로 노출된다.
      "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
      "data-[unchecked]:bg-muted data-[checked]:bg-primary",
      className
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-sm ring-0 transition-transform",
        "data-[unchecked]:translate-x-0 data-[checked]:translate-x-5"
      )}
    />
  </SwitchPrimitive.Root>
))
Switch.displayName = "Switch"

export { Switch }
