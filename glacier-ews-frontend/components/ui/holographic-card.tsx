"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface HolographicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "plasma"
  children: React.ReactNode
}

export const HolographicCard = forwardRef<HTMLDivElement, HolographicCardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "holographic-card",
      elevated: "holographic-card quantum-glow",
      plasma: "holographic-card plasma-border",
    }

    return (
      <div ref={ref} className={cn(variants[variant], "rounded-2xl p-6 fade-in-scale", className)} {...props}>
        {children}
      </div>
    )
  },
)

HolographicCard.displayName = "HolographicCard"
