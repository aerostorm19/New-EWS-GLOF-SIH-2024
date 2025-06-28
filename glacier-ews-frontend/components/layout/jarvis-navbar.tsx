"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { StarkButton } from "@/components/ui/stark-button"
import { MissionStatus } from "@/components/ui/mission-status"
import { ArcReactor } from "@/components/ui/arc-reactor"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { LogOut, Settings, Bell, Zap, Activity } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export function JarvisNavbar() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [missionTime, setMissionTime] = useState("T+ 00:14:32")

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      // Simulate mission elapsed time
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, "0")
      const minutes = String(now.getMinutes()).padStart(2, "0")
      const seconds = String(now.getSeconds()).padStart(2, "0")
      setMissionTime(`T+ ${hours}:${minutes}:${seconds}`)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 jarvis-panel border-b border-arc/30 backdrop-blur-xl">
      <div className="flex items-center justify-between h-full px-8">
        {/* Mission Control Logo */}
        <div className="flex items-center space-x-6 jarvis-slide-in">
          <div className="flex items-center space-x-4">
            <ArcReactor size="md" intensity="high">
              <Activity className="w-6 h-6 text-stark-white" />
            </ArcReactor>
            <div>
              <h1 className="text-2xl font-bold jarvis-text">GLOF MISSION CONTROL</h1>
              <div className="text-xs text-arc tech-readout">EARLY WARNING SYSTEM</div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Badge className="bg-arc/20 text-arc border-arc/50 tech-readout">v3.1.0</Badge>
            <MissionStatus status="online" showLabel animated />
          </div>
        </div>

        {/* Mission Clock */}
        <div className="hidden lg:flex items-center space-x-6 jarvis-fade-in">
          <div className="text-center">
            <div className="text-lg tech-readout text-stark">{currentTime.toLocaleTimeString()}</div>
            <div className="text-xs text-arc tech-readout">{currentTime.toLocaleDateString()}</div>
          </div>
          <div className="text-center border-l border-arc/30 pl-6">
            <div className="text-lg tech-readout text-iron">{missionTime}</div>
            <div className="text-xs text-arc tech-readout">MISSION ELAPSED</div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="flex items-center space-x-4 jarvis-slide-in">
          {/* Alert Center */}
          <div className="relative">
            <StarkButton variant="secondary" size="sm" className="p-3">
              <Bell className="h-4 w-4" />
            </StarkButton>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          </div>

          {/* System Settings */}
          <StarkButton variant="secondary" size="sm" className="p-3">
            <Settings className="h-4 w-4" />
          </StarkButton>

          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-4 border-l border-arc/30">
            <div className="relative">
              <Avatar className="h-10 w-10 border-2 border-arc reactor-glow">
                <AvatarFallback className="bg-arc/20 text-arc font-bold tech-readout">
                  {user?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1">
                <MissionStatus status="online" size="sm" />
              </div>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-stark-white tech-readout">{user?.name}</p>
              <div className="flex items-center space-x-2">
                <p className="text-xs text-arc capitalize tech-readout">{user?.role}</p>
                <Zap className="w-3 h-3 text-iron animate-pulse" />
              </div>
            </div>
          </div>

          {/* Emergency Logout */}
          <StarkButton variant="danger" size="sm" onClick={handleLogout} className="p-3">
            <LogOut className="h-4 w-4" />
          </StarkButton>
        </div>
      </div>

      {/* Data Stream Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-arc to-transparent opacity-50">
        <div className="data-stream" />
      </div>
    </nav>
  )
}
