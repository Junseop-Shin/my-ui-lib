import * as React from "react"
import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card"
import { cn } from "@/lib/utils"

const PreviewCardRoot = PreviewCardPrimitive.Root
const PreviewCardTrigger = PreviewCardPrimitive.Trigger

/* 호버 시 나타나는 미리보기 카드. Tooltip보다 무겁고 Popover보다 가볍다. */
const PreviewCardContent = React.forwardRef<
  React.ElementRef<typeof PreviewCardPrimitive.Popup>,
  React.ComponentPropsWithoutRef<typeof PreviewCardPrimitive.Popup> & {
    sideOffset?: React.ComponentPropsWithoutRef<
      typeof PreviewCardPrimitive.Positioner
    >["sideOffset"]
  }
>(({ className, sideOffset = 8, ...props }, ref) => (
  <PreviewCardPrimitive.Portal>
    <PreviewCardPrimitive.Positioner sideOffset={sideOffset} className="z-50">
      <PreviewCardPrimitive.Popup
        ref={ref}
        className={cn(
          "w-72 rounded-2xl border border-border bg-popover p-4 text-popover-foreground shadow-lg outline-none",
          "data-[open]:animate-in data-[closed]:animate-out",
          "data-[closed]:fade-out-0 data-[open]:fade-in-0",
          "data-[closed]:zoom-out-95 data-[open]:zoom-in-95",
          className
        )}
        {...props}
      />
    </PreviewCardPrimitive.Positioner>
  </PreviewCardPrimitive.Portal>
))
PreviewCardContent.displayName = "PreviewCard.Content"

const PreviewCard = Object.assign(PreviewCardRoot, {
  Trigger: PreviewCardTrigger,
  Content: PreviewCardContent,
})

export { PreviewCard, PreviewCardTrigger, PreviewCardContent }
