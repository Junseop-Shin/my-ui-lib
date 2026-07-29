import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const PopoverRoot = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger

/* Radix의 Content 하나가 Base UI에서는 Positioner(위치) + Popup(표면)으로 나뉜다.
   sideOffset은 Positioner의 prop이므로 갈라서 넘긴다. */
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Popup>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Popup> & {
    sideOffset?: React.ComponentPropsWithoutRef<
      typeof PopoverPrimitive.Positioner
    >["sideOffset"]
    side?: React.ComponentPropsWithoutRef<
      typeof PopoverPrimitive.Positioner
    >["side"]
    align?: React.ComponentPropsWithoutRef<
      typeof PopoverPrimitive.Positioner
    >["align"]
  }
>(({ className, sideOffset = 6, side, align, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Positioner
      sideOffset={sideOffset}
      side={side}
      align={align}
      className="z-50"
    >
      <PopoverPrimitive.Popup
        ref={ref}
        className={cn(
          "w-72 rounded-2xl border border-border bg-popover p-4 text-popover-foreground shadow-lg outline-none",
          "data-[open]:animate-in data-[closed]:animate-out",
          "data-[closed]:fade-out-0 data-[open]:fade-in-0",
          "data-[closed]:zoom-out-95 data-[open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Positioner>
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = "Popover.Content"

const PopoverTitle = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Title>
>(({ className, ...props }, ref) => (
  <PopoverPrimitive.Title
    ref={ref}
    className={cn("text-sm font-semibold text-foreground", className)}
    {...props}
  />
))
PopoverTitle.displayName = "Popover.Title"

const PopoverDescription = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Description>
>(({ className, ...props }, ref) => (
  <PopoverPrimitive.Description
    ref={ref}
    className={cn("mt-1 text-sm text-muted-foreground", className)}
    {...props}
  />
))
PopoverDescription.displayName = "Popover.Description"

const PopoverClose = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Close>
>(({ className, children, ...props }, ref) => (
  <PopoverPrimitive.Close
    ref={ref}
    className={cn(
      "absolute right-3 top-3 rounded-full p-1 text-muted-foreground transition-colors",
      "hover:bg-accent hover:text-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      className
    )}
    {...props}
  >
    {children ?? (
      <>
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </>
    )}
  </PopoverPrimitive.Close>
))
PopoverClose.displayName = "Popover.Close"

const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Title: PopoverTitle,
  Description: PopoverDescription,
  Close: PopoverClose,
})

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
  PopoverClose,
}
