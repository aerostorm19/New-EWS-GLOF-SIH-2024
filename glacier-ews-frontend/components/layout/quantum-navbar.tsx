"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { QuantumButton } from "@/components/ui/quantum-button"
import { StatusIndicator } from "@/components/ui/status-indicator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { LogOut, Settings, Bell, Zap, Satellite } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export function QuantumNavbar() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 holographic-card border-b border-quantum/30 backdrop-blur-xl">
      <div className="flex items-center justify-between h-full px-8">
        {/* Logo Section */}
        <div className="flex items-center space-x-6 slide-in-left">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Satellite className="w-8 h-8 text-quantum animate-pulse" />
              <div className="absolute inset-0 w-8 h-8 border-2 border-quantum rounded-full animate-spin opacity-30" />
            </div>
            <div>
              <h1 className="text-2xl font-bold holographic-text font-mono">GLOFzilla</h1>
              <div className="text-xs text-quantum/70 font-mono">EARLY WARNING SYSTEM</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Badge className="bg-quantum/20 text-quantum border-quantum/50 font-mono">v3.0.1</Badge>
            <StatusIndicator status="online" size="sm" showLabel animated />
          </div>
        </div>

        {/* Center Section - Time */}
        <div className="hidden lg:flex items-center space-x-4 fade-in">
          <div className="text-center">
            <div className="text-lg font-mono text-quantum">{currentTime.toLocaleTimeString()}</div>
            <div className="text-xs text-gray-400 font-mono">{currentTime.toLocaleDateString()}</div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 slide-in-right">
          {/* Notifications */}
          <div className="relative">
            <QuantumButton variant="secondary" size="sm" className="p-3">
              <Bell className="h-4 w-4" />
            </QuantumButton>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-alert rounded-full animate-pulse" />
          </div>

          {/* Settings */}
          <QuantumButton variant="secondary" size="sm" className="p-3">
            <Settings className="h-4 w-4" />
          </QuantumButton>

          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-4 border-l border-quantum/30">
            <Avatar className="h-10 w-10 border-2 border-quantum quantum-glow">
              <AvatarFallback className="bg-quantum/20 text-quantum font-bold">
                {user?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-white">{user?.name}</p>
              <div className="flex items-center space-x-2">
                <p className="text-xs text-quantum capitalize font-mono">{user?.role}</p>
                <Zap className="w-3 h-3 text-cosmic animate-pulse" />
              </div>
            </div>
          </div>

          {/* Logout */}
          <QuantumButton variant="danger" size="sm" onClick={handleLogout} className="p-3">
            <LogOut className="h-4 w-4" />
          </QuantumButton>
        </div>
      </div>

      {/* Data Stream Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-quantum to-transparent opacity-50" />
    </nav>
  )
}
