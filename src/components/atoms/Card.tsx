import * as React from "react"
import { cn } from "@/lib/utils"

/* ─── Root ─── */
const CardRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // transition은 Tailwind 기본 150ms를 쓴다. duration-(--duration-normal)은 200ms라
      // v1 렌더링이 달라진다 — Card는 정체성 보존을 택해 모션 축에서 빠진다.
      "rounded-card border border-border bg-card text-card-foreground shadow-card transition-shadow hover:shadow-card-hover",
      className
    )}
    {...props}
    data-ui="card"
  />
))
CardRoot.displayName = "Card"

/* ─── Header ─── */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1.5 p-card", className)}
    {...props}
  />
))
CardHeader.displayName = "Card.Header"

/* ─── Title ─── */
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-tight tracking-tight text-foreground", className)}
    {...props}
  />
))
CardTitle.displayName = "Card.Title"

/* ─── Description ─── */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "Card.Description"

/* ─── Content ─── */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-card pt-0", className)}
    {...props}
  />
))
CardContent.displayName = "Card.Content"

/* ─── Footer ─── */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-card pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "Card.Footer"

/* ─── Compound export ─── */
const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
})

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
}
