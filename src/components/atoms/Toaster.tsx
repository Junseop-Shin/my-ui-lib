import * as React from "react"
import { Toast } from "@base-ui/react/toast"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

/* React 트리 밖에서도 호출할 수 있도록 전역 매니저를 만든다. */
const toastManager = Toast.createToastManager()

type ToastOptions = {
  description?: React.ReactNode
  action?: { label: React.ReactNode; onClick?: () => void }
  timeout?: number
  id?: string
}

function show(type: string | undefined, title: React.ReactNode, options: ToastOptions = {}) {
  const { action, ...rest } = options
  return toastManager.add({
    title,
    type,
    ...rest,
    ...(action
      ? { actionProps: { children: action.label, onClick: action.onClick } }
      : {}),
  })
}

/* sonner와 같은 호출 형태를 유지한다: toast(...), toast.success(...) */
const toast = Object.assign(
  (title: React.ReactNode, options?: ToastOptions) => show(undefined, title, options),
  {
    success: (title: React.ReactNode, options?: ToastOptions) => show("success", title, options),
    error: (title: React.ReactNode, options?: ToastOptions) => show("error", title, options),
    warning: (title: React.ReactNode, options?: ToastOptions) => show("warning", title, options),
    info: (title: React.ReactNode, options?: ToastOptions) => show("info", title, options),
    close: (toastId?: string) => toastManager.close(toastId),
  }
)

function ToastList() {
  const { toasts } = Toast.useToastManager()

  return toasts.map((item) => (
    <Toast.Root
      key={item.id}
      toast={item}
      className={cn(
        "flex items-start gap-3 rounded-2xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground shadow-lg",
        "data-[type=success]:border-success/20 data-[type=success]:bg-success/10 data-[type=success]:text-success",
        "data-[type=error]:border-destructive/20 data-[type=error]:bg-destructive/10 data-[type=error]:text-destructive",
        "data-[type=warning]:border-warning/20 data-[type=warning]:bg-warning/10 data-[type=warning]:text-warning-foreground",
        "data-[type=info]:border-primary/20 data-[type=info]:bg-primary/10 data-[type=info]:text-primary",
        "data-[starting-style]:translate-x-4 data-[starting-style]:opacity-0",
        "data-[ending-style]:translate-x-4 data-[ending-style]:opacity-0",
        "transition-all duration-200"
      )}
    >
      <Toast.Content className="flex-1">
        <Toast.Title />
        <Toast.Description className="mt-0.5 text-xs font-normal text-muted-foreground" />
        <Toast.Action className="mt-2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground" />
      </Toast.Content>
      <Toast.Close className="shrink-0 text-muted-foreground transition-colors hover:text-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Toast.Close>
    </Toast.Root>
  ))
}

export type ToasterProps = React.ComponentPropsWithoutRef<typeof Toast.Provider>

function Toaster(props: ToasterProps) {
  return (
    <Toast.Provider toastManager={toastManager} {...props}>
      <Toast.Portal>
        <Toast.Viewport className="fixed bottom-4 right-4 z-50 flex w-80 flex-col gap-2 outline-none">
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  )
}

export { Toaster, toast }
