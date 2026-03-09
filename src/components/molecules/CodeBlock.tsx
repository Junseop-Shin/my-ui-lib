import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"
import { Button } from "@/components/atoms/Button"

export interface CodeBlockProps {
  children: React.ReactNode
  className?: string
  language?: string
}

export function CodeBlock({ className, language, children }: CodeBlockProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard()
  const textToCopy = typeof children === "string" ? children : ""

  return (
    <div className="relative group rounded-2xl overflow-hidden border border-border bg-muted">
      {language && (
        <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-border">
          <span className="text-xs font-mono text-muted-foreground">{language}</span>
        </div>
      )}
      <pre className={cn("font-mono text-sm text-foreground p-4 overflow-x-auto leading-relaxed", className)}>
        <code>{children}</code>
      </pre>
      {textToCopy && (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => copyToClipboard(textToCopy)}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          title="Copy code"
        >
          {isCopied
            ? <Check className="h-3.5 w-3.5 text-success" />
            : <Copy className="h-3.5 w-3.5" />
          }
        </Button>
      )}
    </div>
  )
}
