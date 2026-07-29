import * as React from "react"
import { Meter as MeterPrimitive } from "@base-ui/react/meter"
import { cn } from "@/lib/utils"

/* ─── Root ─── */
const MeterRoot = React.forwardRef<
  React.ElementRef<typeof MeterPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MeterPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MeterPrimitive.Root
    ref={ref}
    className={cn("flex w-full flex-col gap-2", className)}
    {...props}
  />
))
MeterRoot.displayName = "Meter"

/* ─── Label ─── */
const MeterLabel = React.forwardRef<
  React.ElementRef<typeof MeterPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MeterPrimitive.Label>
>(({ className, ...props }, ref) => (
  <MeterPrimitive.Label
    ref={ref}
    className={cn("text-sm font-medium text-foreground", className)}
    {...props}
  />
))
MeterLabel.displayName = "Meter.Label"

/* ─── Value ─── */
const MeterValue = React.forwardRef<
  React.ElementRef<typeof MeterPrimitive.Value>,
  React.ComponentPropsWithoutRef<typeof MeterPrimitive.Value>
>(({ className, ...props }, ref) => (
  <MeterPrimitive.Value
    ref={ref}
    className={cn("text-sm tabular-nums text-muted-foreground", className)}
    {...props}
  />
))
MeterValue.displayName = "Meter.Value"

/* ─── Track ─── */
const MeterTrack = React.forwardRef<
  React.ElementRef<typeof MeterPrimitive.Track>,
  React.ComponentPropsWithoutRef<typeof MeterPrimitive.Track>
>(({ className, ...props }, ref) => (
  <MeterPrimitive.Track
    ref={ref}
    className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}
    {...props}
  />
))
MeterTrack.displayName = "Meter.Track"

/* ─── Indicator ─── */
const MeterIndicator = React.forwardRef<
  React.ElementRef<typeof MeterPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof MeterPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <MeterPrimitive.Indicator
    ref={ref}
    className={cn("h-full rounded-full bg-primary transition-all duration-300", className)}
    {...props}
  />
))
MeterIndicator.displayName = "Meter.Indicator"

/* ─── Compound ─── */
const Meter = Object.assign(MeterRoot, {
  Label: MeterLabel,
  Value: MeterValue,
  Track: MeterTrack,
  Indicator: MeterIndicator,
})

export { Meter, MeterLabel, MeterValue, MeterTrack, MeterIndicator }
