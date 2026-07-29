import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox"
import { Check, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"

/* 입력으로 걸러 고르는 선택 상자. 종목·계좌 검색처럼 항목이 많을 때 쓴다. */
const ComboboxRoot = ComboboxPrimitive.Root
const ComboboxGroup = ComboboxPrimitive.Group
const ComboboxValue = ComboboxPrimitive.Value

const ComboboxInputGroup = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.InputGroup>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.InputGroup>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitive.InputGroup
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center gap-1 rounded-xl border border-input bg-background px-3",
      "focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent",
      "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
      className
    )}
    {...props}
  />
))
ComboboxInputGroup.displayName = "Combobox.InputGroup"

const ComboboxInput = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Input>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitive.Input
    ref={ref}
    className={cn(
      "min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none",
      className
    )}
    {...props}
  />
))
ComboboxInput.displayName = "Combobox.Input"

const ComboboxTrigger = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <ComboboxPrimitive.Trigger
    ref={ref}
    className={cn("shrink-0 text-muted-foreground transition-colors hover:text-foreground", className)}
    {...props}
  >
    {children ?? <ChevronDown className="h-4 w-4" />}
  </ComboboxPrimitive.Trigger>
))
ComboboxTrigger.displayName = "Combobox.Trigger"

const ComboboxClear = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Clear>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Clear>
>(({ className, children, ...props }, ref) => (
  <ComboboxPrimitive.Clear
    ref={ref}
    className={cn("shrink-0 text-muted-foreground transition-colors hover:text-foreground", className)}
    {...props}
  >
    {children ?? <X className="h-4 w-4" />}
  </ComboboxPrimitive.Clear>
))
ComboboxClear.displayName = "Combobox.Clear"

const ComboboxContent = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Popup>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Popup> & {
    sideOffset?: React.ComponentPropsWithoutRef<
      typeof ComboboxPrimitive.Positioner
    >["sideOffset"]
  }
>(({ className, children, sideOffset = 4, ...props }, ref) => (
  <ComboboxPrimitive.Portal>
    <ComboboxPrimitive.Positioner sideOffset={sideOffset} className="z-50">
      <ComboboxPrimitive.Popup
        ref={ref}
        className={cn(
          "max-h-72 w-[var(--anchor-width)] overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground shadow-lg",
          "data-[open]:animate-in data-[closed]:animate-out",
          "data-[closed]:fade-out-0 data-[open]:fade-in-0",
          "data-[closed]:zoom-out-95 data-[open]:zoom-in-95",
          className
        )}
        {...props}
      >
        {children}
      </ComboboxPrimitive.Popup>
    </ComboboxPrimitive.Positioner>
  </ComboboxPrimitive.Portal>
))
ComboboxContent.displayName = "Combobox.Content"

const ComboboxList = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.List>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitive.List
    ref={ref}
    className={cn("max-h-72 overflow-y-auto p-1", className)}
    {...props}
  />
))
ComboboxList.displayName = "Combobox.List"

const ComboboxItem = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <ComboboxPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-lg py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
      "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ComboboxPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-primary" />
      </ComboboxPrimitive.ItemIndicator>
    </span>
    {children}
  </ComboboxPrimitive.Item>
))
ComboboxItem.displayName = "Combobox.Item"

const ComboboxEmpty = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Empty>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitive.Empty
    ref={ref}
    className={cn("px-3 py-6 text-center text-sm text-muted-foreground", className)}
    {...props}
  />
))
ComboboxEmpty.displayName = "Combobox.Empty"

const ComboboxGroupLabel = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.GroupLabel>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.GroupLabel>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitive.GroupLabel
    ref={ref}
    className={cn("px-2 py-1.5 text-xs font-semibold text-muted-foreground", className)}
    {...props}
  />
))
ComboboxGroupLabel.displayName = "Combobox.GroupLabel"

const Combobox = Object.assign(ComboboxRoot, {
  InputGroup: ComboboxInputGroup,
  Input: ComboboxInput,
  Trigger: ComboboxTrigger,
  Clear: ComboboxClear,
  Value: ComboboxValue,
  Content: ComboboxContent,
  List: ComboboxList,
  Item: ComboboxItem,
  Empty: ComboboxEmpty,
  Group: ComboboxGroup,
  GroupLabel: ComboboxGroupLabel,
})

export {
  Combobox,
  ComboboxInputGroup,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxClear,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxGroupLabel,
}
