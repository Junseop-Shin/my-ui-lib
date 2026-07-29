import * as React from "react"
import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

/* ─── Root ─── */
const NumberFieldRoot = React.forwardRef<
  React.ElementRef<typeof NumberFieldPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NumberFieldPrimitive.Root>
>(({ className, ...props }, ref) => (
  <NumberFieldPrimitive.Root
    ref={ref}
    className={cn("flex flex-col gap-1.5 data-[disabled]:opacity-50", className)}
    {...props}
  />
))
NumberFieldRoot.displayName = "NumberField"

/* ─── Group (Decrement · Input · Increment를 묶는 컨테이너) ─── */
const NumberFieldGroup = React.forwardRef<
  React.ElementRef<typeof NumberFieldPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof NumberFieldPrimitive.Group>
>(({ className, ...props }, ref) => (
  <NumberFieldPrimitive.Group
    ref={ref}
    className={cn(
      "inline-flex items-center overflow-hidden rounded-xl border border-input bg-background",
      "focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent",
      className
    )}
    {...props}
  />
))
NumberFieldGroup.displayName = "NumberField.Group"

const stepperBase = cn(
  "flex h-10 w-10 shrink-0 items-center justify-center text-muted-foreground transition-colors",
  "hover:bg-accent hover:text-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
)

/* ─── Decrement ─── */
const NumberFieldDecrement = React.forwardRef<
  React.ElementRef<typeof NumberFieldPrimitive.Decrement>,
  React.ComponentPropsWithoutRef<typeof NumberFieldPrimitive.Decrement>
>(({ className, children, ...props }, ref) => (
  <NumberFieldPrimitive.Decrement
    ref={ref}
    className={cn(stepperBase, "border-r border-input", className)}
    {...props}
  >
    {children ?? <Minus className="h-4 w-4" />}
  </NumberFieldPrimitive.Decrement>
))
NumberFieldDecrement.displayName = "NumberField.Decrement"

/* ─── Increment ─── */
const NumberFieldIncrement = React.forwardRef<
  React.ElementRef<typeof NumberFieldPrimitive.Increment>,
  React.ComponentPropsWithoutRef<typeof NumberFieldPrimitive.Increment>
>(({ className, children, ...props }, ref) => (
  <NumberFieldPrimitive.Increment
    ref={ref}
    className={cn(stepperBase, "border-l border-input", className)}
    {...props}
  >
    {children ?? <Plus className="h-4 w-4" />}
  </NumberFieldPrimitive.Increment>
))
NumberFieldIncrement.displayName = "NumberField.Increment"

/* ─── Input ─── */
const NumberFieldInput = React.forwardRef<
  React.ElementRef<typeof NumberFieldPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof NumberFieldPrimitive.Input>
>(({ className, ...props }, ref) => (
  <NumberFieldPrimitive.Input
    ref={ref}
    className={cn(
      "h-10 w-24 bg-transparent px-3 text-center text-sm tabular-nums text-foreground",
      "focus:outline-none",
      className
    )}
    {...props}
  />
))
NumberFieldInput.displayName = "NumberField.Input"

/* ─── ScrubArea (라벨을 드래그해 값을 조절하는 영역) ─── */
const NumberFieldScrubArea = React.forwardRef<
  React.ElementRef<typeof NumberFieldPrimitive.ScrubArea>,
  React.ComponentPropsWithoutRef<typeof NumberFieldPrimitive.ScrubArea>
>(({ className, ...props }, ref) => (
  <NumberFieldPrimitive.ScrubArea
    ref={ref}
    className={cn("cursor-ew-resize select-none text-sm font-medium text-foreground", className)}
    {...props}
  />
))
NumberFieldScrubArea.displayName = "NumberField.ScrubArea"

const NumberFieldScrubAreaCursor = NumberFieldPrimitive.ScrubAreaCursor

/* ─── Compound ─── */
const NumberField = Object.assign(NumberFieldRoot, {
  Group: NumberFieldGroup,
  Decrement: NumberFieldDecrement,
  Increment: NumberFieldIncrement,
  Input: NumberFieldInput,
  ScrubArea: NumberFieldScrubArea,
  ScrubAreaCursor: NumberFieldScrubAreaCursor,
})

export {
  NumberField,
  NumberFieldGroup,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
}
