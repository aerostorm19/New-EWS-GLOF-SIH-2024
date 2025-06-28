"use client"

import { cn } from "@/lib/utils"

interface HudProgressProps {
  value: number
  max?: number
  className?: string
  color?: "arc" | "stark" | "danger" | "warning" | "success"
  showValue?: boolean
  animated?: boolean
  label?: string
}

export function HudProgress({
  value,
  max = 100,
  className,
  color = "arc",
  showValue = false,
  animated = true,
  label,
}: HudProgressProps) {
  const percentage = Math.min((value / max) * 100, 100)

  const colors = {
    arc: "from-arc to-stark",
    stark: "from-stark to-jarvis",
    danger: "from-red-500 to-red-600",
    warning: "from-yellow-500 to-orange-500",
    success: "from-green-500 to-emerald-500",
  }

  return (
    <div className={cn("relative w-full", className)}>
      <div className="w-full bg-carbon-steel/50 rounded-full h-2 overflow-hidden border border-arc/20">
        <div
          className={cn(
            "h-full bg-gradient-to-r transition-all duration-1000 ease-out relative",
            colors[color],
            animated && "animate-pulse",
          )}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </div>
      </div>

      <div className="flex justify-between items-center mt-1">
        {label && <span className="text-xs tech-readout">{label}</span>}
        {showValue && <span className="text-xs tech-readout">{Math.round(percentage)}%</span>}
      </div>
    </div>
  )
}
