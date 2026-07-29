import * as React from "react"
import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui/react/checkbox-group"
import { cn } from "@/lib/utils"

/* 여러 Checkbox의 값을 배열 하나로 묶어 관리한다.
   개별 Checkbox에 value를 주면 그 값이 배열에 담긴다. */
const CheckboxGroup = React.forwardRef<
  React.ElementRef<typeof CheckboxGroupPrimitive>,
  React.ComponentPropsWithoutRef<typeof CheckboxGroupPrimitive>
>(({ className, ...props }, ref) => (
  <CheckboxGroupPrimitive
    ref={ref}
    className={cn("flex flex-col gap-2", className)}
    {...props}
  />
))
CheckboxGroup.displayName = "CheckboxGroup"

export { CheckboxGroup }
