import * as React from "react"
import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

/* 사이트 상단 내비게이션. Trigger에 붙은 Content가 공용 Popup(Viewport)으로 옮겨져 렌더된다. */
const NavigationMenuRoot = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn("relative flex justify-center", className)}
    {...props}
  >
    {children}
    <NavigationMenuPrimitive.Portal>
      <NavigationMenuPrimitive.Positioner sideOffset={8} className="z-50">
        <NavigationMenuPrimitive.Popup
          className={cn(
            "overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground shadow-lg",
            "data-[open]:animate-in data-[closed]:animate-out",
            "data-[closed]:fade-out-0 data-[open]:fade-in-0",
            "data-[closed]:zoom-out-95 data-[open]:zoom-in-95"
          )}
        >
          <NavigationMenuPrimitive.Viewport />
        </NavigationMenuPrimitive.Popup>
      </NavigationMenuPrimitive.Positioner>
    </NavigationMenuPrimitive.Portal>
  </NavigationMenuPrimitive.Root>
))
NavigationMenuRoot.displayName = "NavigationMenu"

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn("flex items-center gap-1", className)}
    {...props}
  />
))
NavigationMenuList.displayName = "NavigationMenu.List"

const NavigationMenuItem = NavigationMenuPrimitive.Item

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-foreground transition-colors",
      "hover:bg-accent data-[popup-open]:bg-accent",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuPrimitive.Icon
      render={<ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 data-[popup-open]:rotate-180" />}
    />
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = "NavigationMenu.Trigger"

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn("w-64 p-2", className)}
    {...props}
  />
))
NavigationMenuContent.displayName = "NavigationMenu.Content"

const NavigationMenuLink = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Link>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Link
    ref={ref}
    className={cn(
      "block rounded-lg px-3 py-2 text-sm text-foreground transition-colors",
      "hover:bg-accent focus-visible:outline-none focus-visible:bg-accent",
      className
    )}
    {...props}
  />
))
NavigationMenuLink.displayName = "NavigationMenu.Link"

const NavigationMenu = Object.assign(NavigationMenuRoot, {
  List: NavigationMenuList,
  Item: NavigationMenuItem,
  Trigger: NavigationMenuTrigger,
  Content: NavigationMenuContent,
  Link: NavigationMenuLink,
})

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
}
