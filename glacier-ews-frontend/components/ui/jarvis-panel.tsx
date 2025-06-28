"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface JarvisPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "hud"
  children: React.ReactNode
}

export const JarvisPanel = forwardRef<HTMLDivElement, JarvisPanelProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "jarvis-panel",
      elevated: "jarvis-panel reactor-glow",
      hud: "jarvis-panel hud-overlay",
    }

    return (
      <div ref={ref} className={cn(variants[variant], "rounded-lg p-6 jarvis-fade-in", className)} {...props}>
        {children}
      </div>
    )
  },
)

JarvisPanel.displayName = "JarvisPanel"
