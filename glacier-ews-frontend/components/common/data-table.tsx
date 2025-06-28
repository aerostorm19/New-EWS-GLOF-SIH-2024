"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Filter, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface User {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive"
  lastLogin: string
}

interface DataTableProps {
  data: User[]
  onEdit?: (user: User) => void
  onDelete?: (user: User) => void
}

export function DataTable({ data, onEdit, onDelete }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")

  const filteredData = data.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-rocket-red/20 text-rocket-red border-rocket-red/30"
      case "authority":
        return "bg-solar-orange/20 text-solar-orange border-solar-orange/30"
      case "geologist":
        return "bg-neon-teal/20 text-neon-teal border-neon-teal/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-carbon-gray border-neon-teal/30 text-white placeholder:text-gray-400"
          />
        </div>
        <Button variant="outline" className="border-neon-teal/30 text-neon-teal hover:bg-neon-teal/10 bg-transparent">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="terminal-card rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-space-black/50 border-b border-neon-teal/20">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-neon-teal font-space-mono">USER</th>
                <th className="text-left p-4 text-sm font-semibold text-neon-teal font-space-mono">ROLE</th>
                <th className="text-left p-4 text-sm font-semibold text-neon-teal font-space-mono">STATUS</th>
                <th className="text-left p-4 text-sm font-semibold text-neon-teal font-space-mono">LAST LOGIN</th>
                <th className="text-right p-4 text-sm font-semibold text-neon-teal font-space-mono">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((user, index) => (
                <tr
                  key={user.id}
                  className="border-b border-neon-teal/10 hover:bg-neon-teal/5 transition-colors duration-200"
                >
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8 border border-neon-teal/30">
                        <AvatarFallback className="bg-neon-teal/20 text-neon-teal text-xs">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-white">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge className={getRoleBadgeColor(user.role)}>{user.role.toUpperCase()}</Badge>
                  </td>
                  <td className="p-4">
                    <Badge
                      variant={user.status === "active" ? "default" : "secondary"}
                      className={
                        user.status === "active"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                      }
                    >
                      {user.status.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="p-4 text-sm text-gray-300 font-space-mono">{user.lastLogin}</td>
                  <td className="p-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-carbon-gray border-neon-teal/30">
                        <DropdownMenuItem
                          onClick={() => onEdit?.(user)}
                          className="text-white hover:bg-neon-teal/10 hover:text-neon-teal"
                        >
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDelete?.(user)}
                          className="text-rocket-red hover:bg-rocket-red/10"
                        >
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
