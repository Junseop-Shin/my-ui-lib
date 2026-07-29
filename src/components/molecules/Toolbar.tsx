import * as React from "react"
import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar"
import { cn } from "@/lib/utils"

/* 차트·대시보드 상단 조작줄. 화살표 키로 항목 사이를 이동한다. */
const ToolbarRoot = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Root
    ref={ref}
    className={cn(
      "flex items-center gap-1 rounded-xl border border-border bg-background p-1",
      "data-[orientation=vertical]:flex-col",
      className
    )}
    {...props}
  />
))
ToolbarRoot.displayName = "Toolbar"

const toolbarItemBase = cn(
  "inline-flex items-center justify-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-foreground transition-colors",
  "hover:bg-accent",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
)

const ToolbarButton = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Button>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Button>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Button ref={ref} className={cn(toolbarItemBase, className)} {...props} />
))
ToolbarButton.displayName = "Toolbar.Button"

const ToolbarLink = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Link>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Link>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Link
    ref={ref}
    className={cn(toolbarItemBase, "underline-offset-4 hover:underline", className)}
    {...props}
  />
))
ToolbarLink.displayName = "Toolbar.Link"

const ToolbarSeparator = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Separator
    ref={ref}
    className={cn(
      "mx-1 bg-border",
      "data-[orientation=horizontal]:h-5 data-[orientation=horizontal]:w-px",
      "data-[orientation=vertical]:h-px data-[orientation=vertical]:w-5",
      className
    )}
    {...props}
  />
))
ToolbarSeparator.displayName = "Toolbar.Separator"

const ToolbarGroup = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Group>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Group ref={ref} className={cn("flex items-center gap-1", className)} {...props} />
))
ToolbarGroup.displayName = "Toolbar.Group"

const ToolbarInput = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Input>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Input
    ref={ref}
    className={cn(
      "h-8 rounded-lg border border-input bg-background px-3 text-sm text-foreground",
      "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
      className
    )}
    {...props}
  />
))
ToolbarInput.displayName = "Toolbar.Input"

const Toolbar = Object.assign(ToolbarRoot, {
  Button: ToolbarButton,
  Link: ToolbarLink,
  Separator: ToolbarSeparator,
  Group: ToolbarGroup,
  Input: ToolbarInput,
})

export {
  Toolbar,
  ToolbarButton,
  ToolbarLink,
  ToolbarSeparator,
  ToolbarGroup,
  ToolbarInput,
}
