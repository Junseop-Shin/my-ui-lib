import * as React from "react"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cn } from "@/lib/utils"

const TabsRoot = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center gap-1 border-b border-border",
      className
    )}
    {...props}
  />
))
TabsList.displayName = "Tabs.List"

// Base UI의 Tab이 Radix의 Trigger에 해당한다. 공개 이름은 Trigger로 유지한다.
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Tab>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Tab>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Tab
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap px-4 pb-3 pt-2 text-sm font-medium text-muted-foreground transition-all",
      "border-b-2 border-transparent -mb-px",
      "hover:text-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      // Base UI Tab은 선택 상태를 data-active로 노출한다(data-selected 아님 — 그건 Select.Item)
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "data-[active]:border-primary data-[active]:text-foreground",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = "Tabs.Trigger"

// Base UI의 Panel이 Radix의 Content에 해당한다. 공개 이름은 Content로 유지한다.
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Panel>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Panel>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Panel
    ref={ref}
    className={cn(
      "mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = "Tabs.Content"

const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
})

export { Tabs, TabsList, TabsTrigger, TabsContent }
