import * as React from "react"
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const TooltipRoot = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

// Base UI는 Radix의 Content를 Positioner(위치 계산) + Popup(내용)으로 나눈다.
// sideOffset은 Positioner의 prop이므로 여기서 갈라 넘긴다.
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Popup>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Popup> &
    Pick<
      React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Positioner>,
      "sideOffset" | "side" | "align" | "alignOffset"
    >
>(({ className, sideOffset = 6, side, align, alignOffset, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Positioner
      sideOffset={sideOffset}
      side={side}
      align={align}
      alignOffset={alignOffset}
      className="z-50"
    >
      <TooltipPrimitive.Popup
        ref={ref}
        // Base UI Popup은 role을 붙이지 않는다. Radix Content가 주던 시맨틱을 유지한다.
        role="tooltip"
        className={cn(
          "overflow-hidden rounded-xl bg-foreground px-3 py-1.5 text-xs text-background shadow-md",
          "animate-in fade-in-0 zoom-in-95",
          "data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </TooltipPrimitive.Positioner>
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = "Tooltip.Content"

const Tooltip = Object.assign(TooltipRoot, {
  Provider: TooltipProvider,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
})

export { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent }
