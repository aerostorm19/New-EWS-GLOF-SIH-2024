"use client"
import { cn } from "@/lib/utils"

interface StatusIndicatorProps {
  status: "online" | "offline" | "warning" | "error" | "maintenance"
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  animated?: boolean
  className?: string
}

export function StatusIndicator({
  status,
  size = "md",
  showLabel = false,
  animated = true,
  className,
}: StatusIndicatorProps) {
  const statusConfig = {
    online: { color: "bg-cosmic-green", label: "ONLINE", glow: "shadow-cosmic-green/50" },
    offline: { color: "bg-gray-500", label: "OFFLINE", glow: "shadow-gray-500/50" },
    warning: { color: "bg-warning-amber", label: "WARNING", glow: "shadow-warning-amber/50" },
    error: { color: "bg-alert-red", label: "ERROR", glow: "shadow-alert-red/50" },
    maintenance: { color: "bg-nebula-purple", label: "MAINTENANCE", glow: "shadow-nebula-purple/50" },
  }

  const sizes = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  }

  const config = statusConfig[status]

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div
        className={cn(
          "rounded-full",
          sizes[size],
          config.color,
          animated && "status-pulse",
          `shadow-lg ${config.glow}`,
        )}
      />
      {showLabel && (
        <span
          className={cn(
            "font-mono text-xs font-semibold tracking-wider",
            status === "online" && "text-cosmic-green",
            status === "offline" && "text-gray-400",
            status === "warning" && "text-warning-amber",
            status === "error" && "text-alert-red",
            status === "maintenance" && "text-nebula-purple",
          )}
        >
          {config.label}
        </span>
      )}
    </div>
  )
}
