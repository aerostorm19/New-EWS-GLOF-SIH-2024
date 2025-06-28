"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { QuantumButton } from "@/components/ui/quantum-button"
import { StatusIndicator } from "@/components/ui/status-indicator"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Map,
  BarChart3,
  Settings,
  Activity,
  ChevronLeft,
  ChevronRight,
  Zap,
  Cpu,
  Database,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuItems = {
  admin: [
    { icon: LayoutDashboard, label: "Command Center", href: "/admin", color: "quantum" },
    { icon: Users, label: "Personnel", href: "/admin/users", color: "cosmic" },
    { icon: Settings, label: "Configuration", href: "/settings", color: "nebula" },
    { icon: Activity, label: "System Health", href: "/system-health", color: "warning" },
  ],
  authority: [
    { icon: Map, label: "Tactical View", href: "/authority", color: "quantum" },
    { icon: Activity, label: "Alert Center", href: "/authority/alerts", color: "alert" },
    { icon: Settings, label: "Configuration", href: "/settings", color: "nebula" },
  ],
  geologist: [
    { icon: BarChart3, label: "Data Analysis", href: "/geologists", color: "quantum" },
    { icon: Map, label: "Region Monitor", href: "/geologists/regions", color: "cosmic" },
    { icon: Settings, label: "Configuration", href: "/settings", color: "nebula" },
  ],
}

export function QuantumSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [systemStats, setSystemStats] = useState({
    cpu: 45,
    memory: 68,
    network: 92,
  })
  const { user } = useAuth()
  const pathname = usePathname()

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats((prev) => ({
        cpu: Math.max(20, Math.min(80, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(40, Math.min(90, prev.memory + (Math.random() - 0.5) * 5)),
        network: Math.max(80, Math.min(100, prev.network + (Math.random() - 0.5) * 3)),
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  if (!user) return null

  const items = menuItems[user.role] || []

  return (
    <aside
      className={cn(
        "fixed left-0 top-20 bottom-0 z-40 holographic-card border-r border-quantum/30 transition-all duration-500 ease-out slide-in-left",
        collapsed ? "w-20" : "w-80",
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-quantum/20">
          {!collapsed && (
            <div className="fade-in">
              <h2 className="text-lg font-bold holographic-text font-mono">NAVIGATION</h2>
              <p className="text-xs text-quantum/70 font-mono">Mission Control</p>
            </div>
          )}
          <QuantumButton variant="secondary" size="sm" onClick={() => setCollapsed(!collapsed)} className="p-2">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </QuantumButton>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-3">
          {items.map((item, index) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <QuantumButton
                  variant={isActive ? "primary" : "secondary"}
                  className={cn(
                    "w-full justify-start text-left transition-all duration-300",
                    collapsed ? "px-3 py-3" : "px-4 py-3",
                    isActive && "quantum-glow",
                    `slide-in-left`,
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <item.icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
                  {!collapsed && <span className="font-semibold">{item.label}</span>}
                  {!collapsed && isActive && <Zap className="ml-auto h-4 w-4 text-cosmic animate-pulse" />}
                </QuantumButton>
              </Link>
            )
          })}
        </nav>

        {/* System Stats */}
        {!collapsed && (
          <div className="p-4 border-t border-quantum/20 space-y-4 fade-in">
            <h3 className="text-sm font-bold text-quantum font-mono">SYSTEM STATUS</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Cpu className="h-4 w-4 text-quantum" />
                  <span className="text-xs text-gray-300 font-mono">CPU</span>
                </div>
                <span className="text-xs font-mono text-quantum">{Math.round(systemStats.cpu)}%</span>
              </div>
              <div className="w-full bg-carbon-steel/50 rounded-full h-1.5">
                <div
                  className="h-full bg-gradient-to-r from-quantum to-plasma rounded-full transition-all duration-1000"
                  style={{ width: `${systemStats.cpu}%` }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Database className="h-4 w-4 text-cosmic" />
                  <span className="text-xs text-gray-300 font-mono">MEM</span>
                </div>
                <span className="text-xs font-mono text-cosmic">{Math.round(systemStats.memory)}%</span>
              </div>
              <div className="w-full bg-carbon-steel/50 rounded-full h-1.5">
                <div
                  className="h-full bg-gradient-to-r from-cosmic to-quantum rounded-full transition-all duration-1000"
                  style={{ width: `${systemStats.memory}%` }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-nebula" />
                  <span className="text-xs text-gray-300 font-mono">NET</span>
                </div>
                <span className="text-xs font-mono text-nebula">{Math.round(systemStats.network)}%</span>
              </div>
              <div className="w-full bg-carbon-steel/50 rounded-full h-1.5">
                <div
                  className="h-full bg-gradient-to-r from-nebula to-plasma rounded-full transition-all duration-1000"
                  style={{ width: `${systemStats.network}%` }}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-quantum/10">
              <StatusIndicator status="online" showLabel animated />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-quantum/20">
          <div className={cn("text-xs text-quantum/70 font-mono", collapsed ? "text-center" : "")}>
            {collapsed ? "v3.0" : "GLOFzilla EWS v3.0.1"}
          </div>
          {!collapsed && <div className="text-xs text-gray-500 font-mono mt-1">Neural Network Active</div>}
        </div>
      </div>
    </aside>
  )
}
