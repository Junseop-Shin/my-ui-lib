import { Toaster as SonnerToaster, toast } from "sonner"

export type ToasterProps = React.ComponentProps<typeof SonnerToaster>

function Toaster({ ...props }: ToasterProps) {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "group flex items-center gap-2 rounded-2xl border border-border bg-background text-foreground shadow-lg px-4 py-3 text-sm font-medium",
          description: "text-muted-foreground text-xs font-normal",
          actionButton: "bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-medium",
          cancelButton: "bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs font-medium",
          closeButton: "text-muted-foreground hover:text-foreground",
          error: "!bg-destructive/10 !border-destructive/20 !text-destructive",
          success: "!bg-success/10 !border-success/20 !text-success",
          warning: "!bg-warning/10 !border-warning/20 !text-warning-foreground",
          info: "!bg-primary/10 !border-primary/20 !text-primary",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
