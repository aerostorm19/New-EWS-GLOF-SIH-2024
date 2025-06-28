"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface QuantumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
  children: React.ReactNode
}

export const QuantumButton = forwardRef<HTMLButtonElement, QuantumButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
    const baseClasses =
      "morph-button relative font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"

    const variants = {
      primary:
        "bg-gradient-to-r from-quantum-blue/20 to-plasma-cyan/20 border-quantum text-white hover:from-quantum-blue/30 hover:to-plasma-cyan/30",
      secondary:
        "bg-gradient-to-r from-carbon-steel/50 to-carbon-steel/30 border-quantum/50 text-quantum hover:border-quantum",
      danger:
        "bg-gradient-to-r from-alert-red/20 to-fusion-orange/20 border-alert text-white hover:from-alert-red/30 hover:to-fusion-orange/30",
      success:
        "bg-gradient-to-r from-cosmic-green/20 to-quantum-blue/20 border-cosmic text-white hover:from-cosmic-green/30 hover:to-quantum-blue/30",
    }

    const sizes = {
      sm: "px-4 py-2 text-sm rounded-lg",
      md: "px-6 py-3 text-base rounded-xl",
      lg: "px-8 py-4 text-lg rounded-2xl",
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
            <div className="quantum-spinner w-4 h-4" />
            <span>Processing...</span>
          </div>
        ) : (
          children
        )}
      </button>
    )
  },
)

QuantumButton.displayName = "QuantumButton"
