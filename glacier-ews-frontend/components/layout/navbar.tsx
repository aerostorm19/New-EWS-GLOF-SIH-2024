"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { LogOut, Settings, Bell } from "lucide-react"
import { useRouter } from "next/navigation"

export function Navbar() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-carbon-gray/95 backdrop-blur-md border-b border-neon-teal/20">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-space-mono font-bold text-neon-teal">GLOFzilla</h1>
          <Badge variant="outline" className="text-neon-teal border-neon-teal">
            EWS v2.1
          </Badge>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-white hover:text-neon-teal">
            <Bell className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="text-white hover:text-neon-teal">
            <Settings className="h-5 w-5" />
          </Button>

          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8 border-2 border-neon-teal">
              <AvatarFallback className="bg-neon-teal text-space-black font-semibold">
                {user?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
            </div>
          </div>

          <Button variant="ghost" size="icon" onClick={handleLogout} className="text-white hover:text-rocket-red">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  )
}
