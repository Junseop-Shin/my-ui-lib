import * as React from "react"
import { X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const tagVariants = cva(
  "inline-flex items-center gap-1 rounded-full font-medium transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "bg-secondary text-secondary-foreground",
        primary:
          "bg-primary/10 text-primary",
        outline:
          "border border-border text-foreground bg-transparent",
        destructive:
          "bg-destructive/10 text-destructive",
        success:
          "bg-success/10 text-success",
      },
      size: {
        sm: "h-6 px-2.5 text-xs",
        md: "h-7 px-3 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  onDismiss?: () => void
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, size, onDismiss, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(tagVariants({ variant, size }), className)}
      {...props}
    >
      {children}
      {onDismiss && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onDismiss()
          }}
          className="ml-0.5 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:outline-none"
          aria-label="Remove tag"
        >
          <X className="h-2.5 w-2.5" />
        </button>
      )}
    </span>
  )
)
Tag.displayName = "Tag"

export { Tag, tagVariants }
