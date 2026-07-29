import * as React from "react"
import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import { cn } from "@/lib/utils"

/* ─── Root ─── */
const ProgressRoot = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("flex w-full flex-col gap-2", className)}
    {...props}
  />
))
ProgressRoot.displayName = "Progress"

/* ─── Label ─── */
const ProgressLabel = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Label>
>(({ className, ...props }, ref) => (
  <ProgressPrimitive.Label
    ref={ref}
    className={cn("text-sm font-medium text-foreground", className)}
    {...props}
  />
))
ProgressLabel.displayName = "Progress.Label"

/* ─── Value ─── */
const ProgressValue = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Value>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Value>
>(({ className, ...props }, ref) => (
  <ProgressPrimitive.Value
    ref={ref}
    className={cn("text-sm tabular-nums text-muted-foreground", className)}
    {...props}
  />
))
ProgressValue.displayName = "Progress.Value"

/* ─── Track ─── */
const ProgressTrack = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Track>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Track>
>(({ className, ...props }, ref) => (
  <ProgressPrimitive.Track
    ref={ref}
    className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}
    {...props}
  />
))
ProgressTrack.displayName = "Progress.Track"

/* ─── Indicator ─── */
const ProgressIndicator = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <ProgressPrimitive.Indicator
    ref={ref}
    className={cn(
      "h-full rounded-full bg-primary transition-all duration-300",
      // 값을 모를 때(indeterminate) Base UI가 data-indeterminate를 붙인다
      "data-[indeterminate]:w-full data-[indeterminate]:animate-pulse",
      className
    )}
    {...props}
  />
))
ProgressIndicator.displayName = "Progress.Indicator"

/* ─── Compound ─── */
const Progress = Object.assign(ProgressRoot, {
  Label: ProgressLabel,
  Value: ProgressValue,
  Track: ProgressTrack,
  Indicator: ProgressIndicator,
})

export {
  Progress,
  ProgressLabel,
  ProgressValue,
  ProgressTrack,
  ProgressIndicator,
}
