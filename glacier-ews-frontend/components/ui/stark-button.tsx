"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface StarkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
  children: React.ReactNode
}

export const StarkButton = forwardRef<HTMLButtonElement, StarkButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
    const baseClasses =
      "stark-button relative font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"

    const variants = {
      primary:
        "bg-gradient-to-r from-arc/20 to-stark/20 border-arc text-stark-white hover:from-arc/30 hover:to-stark/30",
      secondary: "bg-gradient-to-r from-carbon-steel/50 to-carbon-steel/30 border-arc/50 text-arc hover:border-arc",
      danger:
        "bg-gradient-to-r from-red-500/20 to-red-600/20 border-red-500 text-white hover:from-red-500/30 hover:to-red-600/30",
      success:
        "bg-gradient-to-r from-green-500/20 to-green-600/20 border-green-500 text-white hover:from-green-500/30 hover:to-green-600/30",
    }

    const sizes = {
      sm: "px-4 py-2 text-sm rounded-md",
      md: "px-6 py-3 text-base rounded-lg",
      lg: "px-8 py-4 text-lg rounded-xl",
    }

    return (
      <button
        ref={ref}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-arc border-t-transparent rounded-full animate-spin" />
            <span>PROCESSING...</span>
          </div>
        ) : (
          children
        )}
      </button>
    )
  },
)

StarkButton.displayName = "StarkButton"
