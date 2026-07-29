import * as React from "react"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import { cn } from "@/lib/utils"

/* ─── Root ─── */
const SliderRoot = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("w-full data-[disabled]:opacity-50", className)}
    {...props}
  />
))
SliderRoot.displayName = "Slider"

/* ─── Value ─── */
const SliderValue = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Value>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Value>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Value
    ref={ref}
    className={cn("text-sm tabular-nums text-muted-foreground", className)}
    {...props}
  />
))
SliderValue.displayName = "Slider.Value"

/* ─── Control (Track + Indicator + Thumb를 감싸는 상호작용 영역) ─── */
const SliderControl = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Control>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Control>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Control
    ref={ref}
    className={cn(
      "flex w-full touch-none items-center py-3 select-none",
      "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[orientation=vertical]:px-3",
      className
    )}
    {...props}
  />
))
SliderControl.displayName = "Slider.Control"

/* ─── Track ─── */
const SliderTrack = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Track>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Track>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Track
    ref={ref}
    className={cn(
      "relative h-1.5 w-full overflow-hidden rounded-full bg-muted",
      "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
      className
    )}
    {...props}
  />
))
SliderTrack.displayName = "Slider.Track"

/* ─── Indicator ─── */
const SliderIndicator = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Indicator
    ref={ref}
    className={cn("rounded-full bg-primary", className)}
    {...props}
  />
))
SliderIndicator.displayName = "Slider.Indicator"

/* ─── Thumb ─── */
const SliderThumb = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Thumb>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Thumb
    ref={ref}
    className={cn(
      "h-4 w-4 rounded-full border-2 border-primary bg-background shadow-sm transition-transform",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "data-[dragging]:scale-110",
      className
    )}
    {...props}
  />
))
SliderThumb.displayName = "Slider.Thumb"

/* ─── Compound ─── */
const Slider = Object.assign(SliderRoot, {
  Value: SliderValue,
  Control: SliderControl,
  Track: SliderTrack,
  Indicator: SliderIndicator,
  Thumb: SliderThumb,
})

export {
  Slider,
  SliderValue,
  SliderControl,
  SliderTrack,
  SliderIndicator,
  SliderThumb,
}
