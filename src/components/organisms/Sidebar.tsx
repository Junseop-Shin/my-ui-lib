import * as React from "react"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/* ─── Context ─── */
type SidebarContextValue = { collapsed: boolean; toggle: () => void }
const SidebarContext = React.createContext<SidebarContextValue>({
  collapsed: false,
  toggle: () => {},
})

export function useSidebar() {
  return React.useContext(SidebarContext)
}

/* ─── Root ─── */
interface SidebarRootProps extends React.HTMLAttributes<HTMLElement> {
  defaultCollapsed?: boolean
}

const SidebarRoot = React.forwardRef<HTMLElement, SidebarRootProps>(
  ({ className, defaultCollapsed = false, children, ...props }, ref) => {
    const [collapsed, setCollapsed] = React.useState(defaultCollapsed)

    return (
      <SidebarContext.Provider value={{ collapsed, toggle: () => setCollapsed((v) => !v) }}>
        <aside
          ref={ref}
          className={cn(
            "fixed left-0 top-0 z-40 flex flex-col h-screen border-r border-border bg-background transition-all duration-300",
            collapsed ? "w-16" : "w-64",
            className
          )}
          {...props}
        >
          {children}
        </aside>
      </SidebarContext.Provider>
    )
  }
)
SidebarRoot.displayName = "Sidebar"

/* ─── Header ─── */
const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex h-14 items-center gap-2 border-b border-border px-4 shrink-0", className)}
      {...props}
    />
  )
)
SidebarHeader.displayName = "Sidebar.Header"

/* ─── Nav ─── */
const SidebarNav = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn("flex flex-col gap-1 flex-1 overflow-y-auto p-3", className)}
      {...props}
    />
  )
)
SidebarNav.displayName = "Sidebar.Nav"

/* ─── NavItem ─── */
export interface SidebarNavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: LucideIcon
  active?: boolean
  label: string
}

const SidebarNavItem = React.forwardRef<HTMLAnchorElement, SidebarNavItemProps>(
  ({ className, icon: IconComponent, active, label, ...props }, ref) => {
    const { collapsed } = useSidebar()

    return (
      <a
        ref={ref}
        title={collapsed ? label : undefined}
        className={cn(
          "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
          active
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-accent hover:text-foreground",
          collapsed && "justify-center px-2",
          className
        )}
        {...props}
      >
        {IconComponent && (
          <IconComponent
            className={cn("h-5 w-5 shrink-0", active && "text-primary")}
          />
        )}
        {!collapsed && <span className="truncate">{label}</span>}
      </a>
    )
  }
)
SidebarNavItem.displayName = "Sidebar.NavItem"

/* ─── Footer ─── */
const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("border-t border-border p-3 shrink-0", className)}
      {...props}
    />
  )
)
SidebarFooter.displayName = "Sidebar.Footer"

/* ─── Compound ─── */
const Sidebar = Object.assign(SidebarRoot, {
  Header: SidebarHeader,
  Nav: SidebarNav,
  NavItem: SidebarNavItem,
  Footer: SidebarFooter,
})

export { Sidebar }
