import * as React from "react"
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"
import { cn } from "@/lib/utils"

const CollapsibleRoot = CollapsiblePrimitive.Root

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  />
))
CollapsibleTrigger.displayName = "Collapsible.Trigger"

const CollapsiblePanel = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Panel>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Panel>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.Panel
    ref={ref}
    className={cn(
      "overflow-hidden text-sm text-muted-foreground",
      "data-[starting-style]:h-0 data-[ending-style]:h-0",
      "transition-[height] duration-200",
      className
    )}
    {...props}
  />
))
CollapsiblePanel.displayName = "Collapsible.Panel"

const Collapsible = Object.assign(CollapsibleRoot, {
  Trigger: CollapsibleTrigger,
  Panel: CollapsiblePanel,
})

export { Collapsible, CollapsibleTrigger, CollapsiblePanel }
