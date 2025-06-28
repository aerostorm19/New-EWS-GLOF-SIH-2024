"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface ArcReactorProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl"
  intensity?: "low" | "medium" | "high"
  children?: React.ReactNode
}

export const ArcReactor = forwardRef<HTMLDivElement, ArcReactorProps>(
  ({ className, size = "md", intensity = "medium", children, ...props }, ref) => {
    const sizes = {
      sm: "w-12 h-12",
      md: "w-16 h-16",
      lg: "w-24 h-24",
      xl: "w-32 h-32",
    }

    const intensities = {
      low: "opacity-60",
      medium: "opacity-80",
      high: "opacity-100",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "arc-reactor flex items-center justify-center relative",
          sizes[size],
          intensities[intensity],
          className,
        )}
        {...props}
      >
        {/* Inner Core */}
        <div className="absolute inset-2 bg-arc rounded-full opacity-60 animate-pulse" />

        {/* Energy Rings */}
        <div className="absolute inset-1 border border-stark rounded-full opacity-40" />
        <div className="absolute inset-3 border border-jarvis rounded-full opacity-60" />

        {/* Center Content */}
        <div className="relative z-10 flex items-center justify-center text-stark-white">{children}</div>
      </div>
    )
  },
)

ArcReactor.displayName = "ArcReactor"
