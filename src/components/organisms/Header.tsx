import * as React from "react"
import { cn } from "@/lib/utils"

/* ─── Context ─── */
type HeaderContextValue = Record<string, never>
const HeaderContext = React.createContext<HeaderContextValue>({})

/* ─── Root ─── */
const HeaderRoot = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <HeaderContext.Provider value={{}}>
      <header
        ref={ref}
        className={cn(
          "sticky top-0 z-50 flex h-14 items-center gap-4 border-b border-border/50",
          "bg-background/80 backdrop-blur-xl backdrop-saturate-150 px-6",
          className
        )}
        {...props}
      />
    </HeaderContext.Provider>
  )
)
HeaderRoot.displayName = "Header"

/* ─── Brand ─── */
const HeaderBrand = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-2 font-semibold text-foreground shrink-0", className)}
      {...props}
    />
  )
)
HeaderBrand.displayName = "Header.Brand"

/* ─── Nav ─── */
const HeaderNav = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn("flex items-center gap-1 flex-1", className)}
      {...props}
    />
  )
)
HeaderNav.displayName = "Header.Nav"

/* ─── NavItem ─── */
export interface HeaderNavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean
  asChild?: boolean
}

const HeaderNavItem = React.forwardRef<HTMLAnchorElement, HeaderNavItemProps>(
  ({ className, active, children, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
        active
          ? "bg-accent text-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-accent",
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
)
HeaderNavItem.displayName = "Header.NavItem"

/* ─── Actions ─── */
const HeaderActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-2 ml-auto shrink-0", className)}
      {...props}
    />
  )
)
HeaderActions.displayName = "Header.Actions"

/* ─── Compound ─── */
const Header = Object.assign(HeaderRoot, {
  Brand: HeaderBrand,
  Nav: HeaderNav,
  NavItem: HeaderNavItem,
  Actions: HeaderActions,
})

export { Header }
