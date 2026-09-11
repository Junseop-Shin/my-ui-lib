import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  // transition은 Tailwind 기본 150ms를 쓴다. duration-(--duration-normal)은 200ms라
  // v1 렌더링이 달라진다 — Badge는 정체성 보존을 택해 모션 축에서 빠진다.
  "inline-flex items-center rounded-badge border px-badge-x py-badge-y text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary/10 text-primary",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        outline:
          "border-border text-foreground",
        destructive:
          "border-transparent bg-destructive/10 text-destructive",
        success:
          "border-transparent bg-success/10 text-success",
        warning:
          "border-transparent bg-warning/10 text-warning-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
      data-ui="badge"
      data-variant={variant ?? "default"}
    />
  )
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
