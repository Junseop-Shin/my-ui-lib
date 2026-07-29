import * as React from "react"
import { Fieldset as FieldsetPrimitive } from "@base-ui/react/fieldset"
import { cn } from "@/lib/utils"

/* 관련 있는 폼 컨트롤을 <fieldset>/<legend> 시맨틱으로 묶는다. */
const FieldsetRoot = React.forwardRef<
  React.ElementRef<typeof FieldsetPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof FieldsetPrimitive.Root>
>(({ className, ...props }, ref) => (
  <FieldsetPrimitive.Root
    ref={ref}
    className={cn("flex flex-col gap-3", className)}
    {...props}
  />
))
FieldsetRoot.displayName = "Fieldset"

const FieldsetLegend = React.forwardRef<
  React.ElementRef<typeof FieldsetPrimitive.Legend>,
  React.ComponentPropsWithoutRef<typeof FieldsetPrimitive.Legend>
>(({ className, ...props }, ref) => (
  <FieldsetPrimitive.Legend
    ref={ref}
    className={cn("text-sm font-semibold text-foreground", className)}
    {...props}
  />
))
FieldsetLegend.displayName = "Fieldset.Legend"

const Fieldset = Object.assign(FieldsetRoot, {
  Legend: FieldsetLegend,
})

export { Fieldset, FieldsetLegend }
