import * as React from "react"
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar"
import { cn } from "@/lib/utils"

/* 데스크톱 앱 스타일 메뉴바. 안에는 Base UI Menu(= DropdownMenu)를 넣어 쓴다. */
const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive
    ref={ref}
    className={cn(
      "flex items-center gap-1 rounded-xl border border-border bg-background p-1",
      className
    )}
    {...props}
  />
))
Menubar.displayName = "Menubar"

export { Menubar }
