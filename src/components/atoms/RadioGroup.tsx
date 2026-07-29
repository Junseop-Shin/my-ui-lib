import * as React from "react"
// Base UI는 그룹(RadioGroup)과 개별 항목(Radio)을 별개 네임스페이스로 나눈다.
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive
    ref={ref}
    className={cn("grid gap-2", className)}
    {...props}
  />
))
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioPrimitive.Root
    ref={ref}
    className={cn(
      "aspect-square h-4 w-4 rounded-full border border-border text-primary transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      // Base UI Radio는 <button>을 렌더하되 상태를 data 속성으로 노출한다
      "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
      "data-[checked]:border-primary data-[checked]:bg-primary",
      className
    )}
    {...props}
  >
    <RadioPrimitive.Indicator className="flex items-center justify-center">
      <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
    </RadioPrimitive.Indicator>
  </RadioPrimitive.Root>
))
RadioGroupItem.displayName = "RadioGroup.Item"

export { RadioGroup, RadioGroupItem }
