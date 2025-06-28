"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { StarkButton } from "@/components/ui/stark-button"
import { MissionStatus } from "@/components/ui/mission-status"
import { HudProgress } from "@/components/ui/hud-progress"
import { ArcReactor } from "@/components/ui/arc-reactor"
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
  Cpu,
  Database,
  Wifi,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuItems = {
  admin: [
    { icon: LayoutDashboard, label: "Mission Control", href: "/admin", color: "arc" },
    { icon: Users, label: "Personnel", href: "/admin/users", color: "stark" },
    { icon: Settings, label: "Configuration", href: "/settings", color: "jarvis" },
    { icon: Activity, label: "System Health", href: "/system-health", color: "iron" },
  ],
  authority: [
    { icon: Map, label: "Tactical Grid", href: "/authority", color: "arc" },
    { icon: Activity, label: "Alert Center", href: "/authority/alerts", color: "danger" },
    { icon: Settings, label: "Configuration", href: "/settings", color: "jarvis" },
  ],
  geologist: [
    { icon: BarChart3, label: "Data Analysis", href: "/geologists", color: "arc" },
    { icon: Map, label: "Region Monitor", href: "/geologists/regions", color: "stark" },
    { icon: Settings, label: "Configuration", href: "/settings", color: "jarvis" },
  ],
}

export function MissionSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [systemStats, setSystemStats] = useState({
    cpu: 45,
    memory: 68,
    network: 92,
    power: 87,
  })
  const { user } = useAuth()
  const pathname = usePathname()

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats((prev) => ({
        cpu: Math.max(20, Math.min(80, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(40, Math.min(90, prev.memory + (Math.random() - 0.5) * 5)),
        network: Math.max(80, Math.min(100, prev.network + (Math.random() - 0.5) * 3)),
        power: Math.max(70, Math.min(100, prev.power + (Math.random() - 0.5) * 2)),
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  if (!user) return null

  const items = menuItems[user.role] || []

  return (
    <aside
      className={cn(
        "fixed left-0 top-20 bottom-0 z-40 jarvis-panel border-r border-arc/30 transition-all duration-500 ease-out jarvis-slide-in",
        collapsed ? "w-20" : "w-80",
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-arc/20">
          {!collapsed && (
            <div className="jarvis-fade-in">
              <h2 className="text-lg font-bold jarvis-text">NAVIGATION</h2>
              <p className="text-xs text-arc tech-readout">Mission Control</p>
            </div>
          )}
          <StarkButton variant="secondary" size="sm" onClick={() => setCollapsed(!collapsed)} className="p-2">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </StarkButton>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-3">
          {items.map((item, index) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <StarkButton
                  variant={isActive ? "primary" : "secondary"}
                  className={cn(
                    "w-full justify-start text-left transition-all duration-300",
                    collapsed ? "px-3 py-3" : "px-4 py-3",
                    isActive && "reactor-glow",
                    "jarvis-slide-in",
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <item.icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
                  {!collapsed && <span className="font-semibold tech-readout">{item.label}</span>}
                  {!collapsed && isActive && (
                    <ArcReactor size="sm" className="ml-auto">
                      <div className="w-2 h-2 bg-stark rounded-full" />
                    </ArcReactor>
                  )}
                </StarkButton>
              </Link>
            )
          })}
        </nav>

        {/* System Diagnostics */}
        {!collapsed && (
          <div className="p-4 border-t border-arc/20 space-y-4 jarvis-fade-in">
            <h3 className="text-sm font-bold text-arc tech-readout">SYSTEM DIAGNOSTICS</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Cpu className="h-4 w-4 text-arc" />
                  <span className="text-xs text-stark-white tech-readout">CPU</span>
                </div>
                <span className="text-xs tech-readout text-arc">{Math.round(systemStats.cpu)}%</span>
              </div>
              <HudProgress value={systemStats.cpu} color="arc" animated />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Database className="h-4 w-4 text-stark" />
                  <span className="text-xs text-stark-white tech-readout">MEM</span>
                </div>
                <span className="text-xs tech-readout text-stark">{Math.round(systemStats.memory)}%</span>
              </div>
              <HudProgress value={systemStats.memory} color="stark" animated />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Wifi className="h-4 w-4 text-jarvis" />
                  <span className="text-xs text-stark-white tech-readout">NET</span>
                </div>
                <span className="text-xs tech-readout text-jarvis">{Math.round(systemStats.network)}%</span>
              </div>
              <HudProgress value={systemStats.network} color="success" animated />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-iron" />
                  <span className="text-xs text-stark-white tech-readout">PWR</span>
                </div>
                <span className="text-xs tech-readout text-iron">{Math.round(systemStats.power)}%</span>
              </div>
              <HudProgress value={systemStats.power} color="warning" animated />
            </div>

            <div className="pt-2 border-t border-arc/10">
              <MissionStatus status="online" showLabel animated />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-arc/20">
          <div className={cn("text-xs text-arc tech-readout", collapsed ? "text-center" : "")}>
            {collapsed ? "v3.1" : "GLOF MISSION CONTROL v3.1.0"}
          </div>
          {!collapsed && <div className="text-xs text-gray-500 tech-readout mt-1">JARVIS PROTOCOL ACTIVE</div>}
        </div>
      </div>
    </aside>
  )
}
