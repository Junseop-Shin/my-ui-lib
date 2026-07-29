import * as React from "react"
import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

/* Combobox와 달리 값을 고르지 않고 자유 입력을 유지한다. 검색어 제안에 쓴다. */
const AutocompleteRoot = AutocompletePrimitive.Root
const AutocompleteGroup = AutocompletePrimitive.Group

const AutocompleteInputGroup = React.forwardRef<
  React.ElementRef<typeof AutocompletePrimitive.InputGroup>,
  React.ComponentPropsWithoutRef<typeof AutocompletePrimitive.InputGroup>
>(({ className, ...props }, ref) => (
  <AutocompletePrimitive.InputGroup
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center gap-1 rounded-xl border border-input bg-background px-3",
      "focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent",
      className
    )}
    {...props}
  />
))
AutocompleteInputGroup.displayName = "Autocomplete.InputGroup"

const AutocompleteInput = React.forwardRef<
  React.ElementRef<typeof AutocompletePrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof AutocompletePrimitive.Input>
>(({ className, ...props }, ref) => (
  <AutocompletePrimitive.Input
    ref={ref}
    className={cn(
      "min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none",
      className
    )}
    {...props}
  />
))
AutocompleteInput.displayName = "Autocomplete.Input"

const AutocompleteClear = React.forwardRef<
  React.ElementRef<typeof AutocompletePrimitive.Clear>,
  React.ComponentPropsWithoutRef<typeof AutocompletePrimitive.Clear>
>(({ className, children, ...props }, ref) => (
  <AutocompletePrimitive.Clear
    ref={ref}
    className={cn("shrink-0 text-muted-foreground transition-colors hover:text-foreground", className)}
    {...props}
  >
    {children ?? <X className="h-4 w-4" />}
  </AutocompletePrimitive.Clear>
))
AutocompleteClear.displayName = "Autocomplete.Clear"

const AutocompleteContent = React.forwardRef<
  React.ElementRef<typeof AutocompletePrimitive.Popup>,
  React.ComponentPropsWithoutRef<typeof AutocompletePrimitive.Popup> & {
    sideOffset?: React.ComponentPropsWithoutRef<
      typeof AutocompletePrimitive.Positioner
    >["sideOffset"]
  }
>(({ className, children, sideOffset = 4, ...props }, ref) => (
  <AutocompletePrimitive.Portal>
    <AutocompletePrimitive.Positioner sideOffset={sideOffset} className="z-50">
      <AutocompletePrimitive.Popup
        ref={ref}
        className={cn(
          "max-h-72 w-[var(--anchor-width)] overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground shadow-lg",
          "data-[open]:animate-in data-[closed]:animate-out",
          "data-[closed]:fade-out-0 data-[open]:fade-in-0",
          className
        )}
        {...props}
      >
        {children}
      </AutocompletePrimitive.Popup>
    </AutocompletePrimitive.Positioner>
  </AutocompletePrimitive.Portal>
))
AutocompleteContent.displayName = "Autocomplete.Content"

const AutocompleteList = React.forwardRef<
  React.ElementRef<typeof AutocompletePrimitive.List>,
  React.ComponentPropsWithoutRef<typeof AutocompletePrimitive.List>
>(({ className, ...props }, ref) => (
  <AutocompletePrimitive.List
    ref={ref}
    className={cn("max-h-72 overflow-y-auto p-1", className)}
    {...props}
  />
))
AutocompleteList.displayName = "Autocomplete.List"

const AutocompleteItem = React.forwardRef<
  React.ElementRef<typeof AutocompletePrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AutocompletePrimitive.Item>
>(({ className, ...props }, ref) => (
  <AutocompletePrimitive.Item
    ref={ref}
    className={cn(
      "flex w-full cursor-default select-none items-center rounded-lg px-2 py-1.5 text-sm outline-none transition-colors",
      "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  />
))
AutocompleteItem.displayName = "Autocomplete.Item"

const AutocompleteEmpty = React.forwardRef<
  React.ElementRef<typeof AutocompletePrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof AutocompletePrimitive.Empty>
>(({ className, ...props }, ref) => (
  <AutocompletePrimitive.Empty
    ref={ref}
    className={cn("px-3 py-6 text-center text-sm text-muted-foreground", className)}
    {...props}
  />
))
AutocompleteEmpty.displayName = "Autocomplete.Empty"

const Autocomplete = Object.assign(AutocompleteRoot, {
  InputGroup: AutocompleteInputGroup,
  Input: AutocompleteInput,
  Clear: AutocompleteClear,
  Content: AutocompleteContent,
  List: AutocompleteList,
  Item: AutocompleteItem,
  Empty: AutocompleteEmpty,
  Group: AutocompleteGroup,
})

export {
  Autocomplete,
  AutocompleteInputGroup,
  AutocompleteInput,
  AutocompleteClear,
  AutocompleteContent,
  AutocompleteList,
  AutocompleteItem,
  AutocompleteEmpty,
}
