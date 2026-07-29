import * as React from "react"
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

/* 모바일 시트. 스와이프로 닫을 수 있고 위치는 side로 지정한다. */
const DrawerRoot = DrawerPrimitive.Root
const DrawerTrigger = DrawerPrimitive.Trigger
const DrawerClose = DrawerPrimitive.Close
const DrawerProvider = DrawerPrimitive.Provider
const DrawerSwipeArea = DrawerPrimitive.SwipeArea

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Backdrop>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Backdrop>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Backdrop
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm",
      "data-[open]:animate-in data-[closed]:animate-out",
      "data-[closed]:fade-out-0 data-[open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DrawerOverlay.displayName = "Drawer.Overlay"

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Popup>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Popup>
>(({ className, children, ...props }, ref) => (
  <DrawerPrimitive.Portal>
    <DrawerOverlay />
    <DrawerPrimitive.Popup
      ref={ref}
      className={cn(
        "fixed z-50 border border-border bg-background shadow-xl outline-none",
        // side에 따라 붙는 위치와 모서리를 바꾼다
        "data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:rounded-t-2xl",
        "data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:rounded-b-2xl",
        "data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:w-80 data-[side=left]:rounded-r-2xl",
        "data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:w-80 data-[side=right]:rounded-l-2xl",
        "data-[open]:animate-in data-[closed]:animate-out",
        className
      )}
      {...props}
    >
      <DrawerPrimitive.Content className="relative p-6">
        {children}
        <DrawerPrimitive.Close className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DrawerPrimitive.Close>
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Popup>
  </DrawerPrimitive.Portal>
))
DrawerContent.displayName = "Drawer.Content"

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-tight text-foreground", className)}
    {...props}
  />
))
DrawerTitle.displayName = "Drawer.Title"

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("mt-1 text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = "Drawer.Description"

const Drawer = Object.assign(DrawerRoot, {
  Provider: DrawerProvider,
  Trigger: DrawerTrigger,
  SwipeArea: DrawerSwipeArea,
  Content: DrawerContent,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Close: DrawerClose,
})

export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
}
