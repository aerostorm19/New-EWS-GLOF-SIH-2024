"use client"
import { cn } from "@/lib/utils"

interface QuantumProgressProps {
  value: number
  max?: number
  className?: string
  color?: "quantum" | "cosmic" | "alert" | "warning"
  showValue?: boolean
  animated?: boolean
}

export function QuantumProgress({
  value,
  max = 100,
  className,
  color = "quantum",
  showValue = false,
  animated = true,
}: QuantumProgressProps) {
  const percentage = Math.min((value / max) * 100, 100)

  const colors = {
    quantum: "from-quantum-blue to-plasma-cyan",
    cosmic: "from-cosmic-green to-quantum-blue",
    alert: "from-alert-red to-fusion-orange",
    warning: "from-warning-amber to-solar-gold",
  }

  return (
    <div className={cn("relative w-full", className)}>
      <div className="w-full bg-carbon-steel/50 rounded-full h-3 overflow-hidden">
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
      {showValue && (
        <div className="absolute right-0 top-0 -mt-6 text-xs font-mono text-quantum">{Math.round(percentage)}%</div>
      )}
    </div>
  )
}
