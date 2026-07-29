import * as React from "react"
import { OTPField as OtpFieldPrimitive } from "@base-ui/react/otp-field"
import { cn } from "@/lib/utils"

/* 2FA 인증코드 입력. 자리마다 칸이 나뉘고 붙여넣기를 자동으로 분배한다. */
const OtpFieldRoot = React.forwardRef<
  React.ElementRef<typeof OtpFieldPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof OtpFieldPrimitive.Root>
>(({ className, ...props }, ref) => (
  <OtpFieldPrimitive.Root
    ref={ref}
    className={cn("flex items-center gap-2 data-[disabled]:opacity-50", className)}
    {...props}
  />
))
OtpFieldRoot.displayName = "OtpField"

const OtpFieldInput = React.forwardRef<
  React.ElementRef<typeof OtpFieldPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof OtpFieldPrimitive.Input>
>(({ className, ...props }, ref) => (
  <OtpFieldPrimitive.Input
    ref={ref}
    className={cn(
      "h-12 w-10 rounded-xl border border-input bg-background text-center text-lg tabular-nums text-foreground",
      "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
      "data-[disabled]:cursor-not-allowed",
      className
    )}
    {...props}
  />
))
OtpFieldInput.displayName = "OtpField.Input"

const OtpFieldSeparator = React.forwardRef<
  React.ElementRef<typeof OtpFieldPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof OtpFieldPrimitive.Separator>
>(({ className, children, ...props }, ref) => (
  <OtpFieldPrimitive.Separator
    ref={ref}
    className={cn("text-muted-foreground", className)}
    {...props}
  >
    {children ?? "–"}
  </OtpFieldPrimitive.Separator>
))
OtpFieldSeparator.displayName = "OtpField.Separator"

const OtpField = Object.assign(OtpFieldRoot, {
  Input: OtpFieldInput,
  Separator: OtpFieldSeparator,
})

export { OtpField, OtpFieldInput, OtpFieldSeparator }
