"use client"

import { cn } from "@/lib/utils"

interface MissionStatusProps {
  status: "online" | "offline" | "warning" | "critical" | "standby"
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  animated?: boolean
  className?: string
}

export function MissionStatus({
  status,
  size = "md",
  showLabel = false,
  animated = true,
  className,
}: MissionStatusProps) {
  const statusConfig = {
    online: {
      color: "bg-green-500",
      label: "ONLINE",
      glow: "shadow-green-500/50",
      textColor: "status-online",
    },
    offline: {
      color: "bg-gray-500",
      label: "OFFLINE",
      glow: "shadow-gray-500/50",
      textColor: "text-gray-400",
    },
    warning: {
      color: "bg-yellow-500",
      label: "WARNING",
      glow: "shadow-yellow-500/50",
      textColor: "status-warning",
    },
    critical: {
      color: "bg-red-500",
      label: "CRITICAL",
      glow: "shadow-red-500/50",
      textColor: "status-critical",
    },
    standby: {
      color: "bg-blue-500",
      label: "STANDBY",
      glow: "shadow-blue-500/50",
      textColor: "text-arc",
    },
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
          animated && "animate-pulse",
          `shadow-lg ${config.glow}`,
        )}
      />
      {showLabel && (
        <span className={cn("tech-readout text-xs font-semibold tracking-wider", config.textColor)}>
          {config.label}
        </span>
      )}
    </div>
  )
}
