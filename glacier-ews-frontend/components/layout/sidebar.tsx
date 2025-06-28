"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, Map, BarChart3, Settings, Activity, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuItems = {
  admin: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Users, label: "Users", href: "/admin/users" },
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: Activity, label: "System Health", href: "/system-health" },
  ],
  authority: [
    { icon: Map, label: "Dashboard", href: "/authority" },
    { icon: Activity, label: "Alerts", href: "/authority/alerts" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ],
  geologist: [
    { icon: BarChart3, label: "Dashboard", href: "/geologists" },
    { icon: Map, label: "Regions", href: "/geologists/regions" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ],
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const { user } = useAuth()
  const pathname = usePathname()

  if (!user) return null

  const items = menuItems[user.role] || []

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 bottom-0 z-40 bg-carbon-gray/95 backdrop-blur-md border-r border-neon-teal/20 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-neon-teal/20">
          {!collapsed && <h2 className="text-lg font-semibold text-neon-teal font-space-mono">NAVIGATION</h2>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-white hover:text-neon-teal"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {items.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-white hover:text-neon-teal hover:bg-neon-teal/10 transition-all duration-200",
                    isActive && "bg-neon-teal/20 text-neon-teal border border-neon-teal/30",
                    collapsed && "px-2",
                  )}
                >
                  <item.icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
                  {!collapsed && item.label}
                </Button>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-neon-teal/20">
          <div className={cn("text-xs text-gray-400 font-space-mono", collapsed && "text-center")}>
            {collapsed ? "v2.1" : "GLOFzilla EWS v2.1"}
          </div>
        </div>
      </div>
    </aside>
  )
}
