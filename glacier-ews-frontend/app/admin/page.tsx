"use client"

import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { QuantumNavbar } from "@/components/layout/quantum-navbar"
import { QuantumSidebar } from "@/components/layout/quantum-sidebar"
import { HolographicCard } from "@/components/ui/holographic-card"
import { QuantumButton } from "@/components/ui/quantum-button"
import { QuantumProgress } from "@/components/ui/quantum-progress"
import { StatusIndicator } from "@/components/ui/status-indicator"
import { ParticleField } from "@/components/effects/particle-field"
import { DataTable } from "@/components/common/data-table"
import { Badge } from "@/components/ui/badge"
import { Users, UserCheck, UserPlus, Activity, Plus, Zap, Brain, Shield, Satellite } from "lucide-react"

// Enhanced mock data with more realistic values
const mockUsers = [
  {
    id: "u1",
    name: "Dr. Sarah Chen",
    email: "s.chen@glofzilla.com",
    role: "admin",
    status: "active" as const,
    lastLogin: "2025-06-28 14:30",
  },
  {
    id: "u2",
    name: "Commander Alex Rivera",
    email: "a.rivera@glofzilla.com",
    role: "authority",
    status: "active" as const,
    lastLogin: "2025-06-28 12:15",
  },
  {
    id: "u3",
    name: "Prof. Michael Zhang",
    email: "m.zhang@glofzilla.com",
    role: "geologist",
    status: "active" as const,
    lastLogin: "2025-06-28 09:45",
  },
  {
    id: "u4",
    name: "Lt. Emma Thompson",
    email: "e.thompson@glofzilla.com",
    role: "authority",
    status: "active" as const,
    lastLogin: "2025-06-28 16:20",
  },
]

export default function QuantumAdminPage() {
  const [users, setUsers] = useState(mockUsers)
  const [stats, setStats] = useState({
    totalUsers: 24,
    activeUsers: 18,
    pendingInvites: 3,
    activeSessions: 12,
    systemLoad: 45,
    threatLevel: 2,
  })

  const [realTimeData, setRealTimeData] = useState({
    networkActivity: 85,
    dataProcessing: 92,
    alertsProcessed: 1247,
    systemUptime: 99.97,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData((prev) => ({
        networkActivity: Math.max(70, Math.min(100, prev.networkActivity + (Math.random() - 0.5) * 10)),
        dataProcessing: Math.max(80, Math.min(100, prev.dataProcessing + (Math.random() - 0.5) * 5)),
        alertsProcessed: prev.alertsProcessed + Math.floor(Math.random() * 3),
        systemUptime: Math.max(99.5, Math.min(100, prev.systemUptime + (Math.random() - 0.5) * 0.1)),
      }))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen quantum-bg">
        <ParticleField />
        <QuantumNavbar />
        <QuantumSidebar />

        <main className="ml-20 lg:ml-80 pt-20 p-8 space-y-8">
          {/* Header Section */}
          <div className="flex items-center justify-between slide-in-up">
            <div>
              <h1 className="text-4xl font-bold holographic-text font-mono mb-2">NEURAL COMMAND CENTER</h1>
              <p className="text-quantum/80 text-lg font-mono">Advanced Personnel & System Management</p>
              <div className="flex items-center space-x-4 mt-3">
                <StatusIndicator status="online" showLabel animated />
                <Badge className="bg-cosmic/20 text-cosmic border-cosmic/50 font-mono">QUANTUM CORE ACTIVE</Badge>
              </div>
            </div>
            <QuantumButton variant="primary" size="lg" className="quantum-glow">
              <Plus className="h-5 w-5 mr-2" />
              Deploy New Agent
            </QuantumButton>
          </div>

          {/* Real-time Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <HolographicCard variant="elevated" className="slide-in-up" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-quantum/20 rounded-xl">
                    <Users className="h-6 w-6 text-quantum" />
                  </div>
                  <div>
                    <p className="text-sm font-mono text-quantum/70">TOTAL AGENTS</p>
                    <p className="text-3xl font-bold text-white font-mono">{stats.totalUsers}</p>
                  </div>
                </div>
                <Zap className="h-8 w-8 text-quantum/30 animate-pulse" />
              </div>
              <QuantumProgress value={85} color="quantum" animated showValue />
              <p className="text-xs text-cosmic mt-2 font-mono">+2 this cycle</p>
            </HolographicCard>

            <HolographicCard variant="elevated" className="slide-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-cosmic/20 rounded-xl">
                    <UserCheck className="h-6 w-6 text-cosmic" />
                  </div>
                  <div>
                    <p className="text-sm font-mono text-cosmic/70">ACTIVE AGENTS</p>
                    <p className="text-3xl font-bold text-white font-mono">{stats.activeUsers}</p>
                  </div>
                </div>
                <Brain className="h-8 w-8 text-cosmic/30 animate-pulse" />
              </div>
              <QuantumProgress
                value={Math.round((stats.activeUsers / stats.totalUsers) * 100)}
                color="cosmic"
                animated
                showValue
              />
              <p className="text-xs text-quantum mt-2 font-mono">Neural sync: 98.5%</p>
            </HolographicCard>

            <HolographicCard variant="elevated" className="slide-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-warning/20 rounded-xl">
                    <UserPlus className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm font-mono text-warning/70">PENDING DEPLOY</p>
                    <p className="text-3xl font-bold text-white font-mono">{stats.pendingInvites}</p>
                  </div>
                </div>
                <Shield className="h-8 w-8 text-warning/30 animate-pulse" />
              </div>
              <QuantumProgress value={60} color="warning" animated showValue />
              <p className="text-xs text-warning mt-2 font-mono">Clearance pending</p>
            </HolographicCard>

            <HolographicCard variant="elevated" className="slide-in-up" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-alert/20 rounded-xl">
                    <Activity className="h-6 w-6 text-alert" />
                  </div>
                  <div>
                    <p className="text-sm font-mono text-alert/70">LIVE SESSIONS</p>
                    <p className="text-3xl font-bold text-white font-mono">{stats.activeSessions}</p>
                  </div>
                </div>
                <Satellite className="h-8 w-8 text-alert/30 animate-pulse" />
              </div>
              <QuantumProgress value={75} color="alert" animated showValue />
              <p className="text-xs text-alert mt-2 font-mono">Real-time ops</p>
            </HolographicCard>
          </div>

          {/* System Performance Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <HolographicCard variant="plasma" className="lg:col-span-2 slide-in-left">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold holographic-text font-mono">NEURAL NETWORK STATUS</h3>
                <Badge className="bg-cosmic/20 text-cosmic border-cosmic/50 font-mono animate-pulse">
                  QUANTUM ACTIVE
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-mono text-quantum">Network Activity</span>
                      <span className="text-sm font-mono text-white">{Math.round(realTimeData.networkActivity)}%</span>
                    </div>
                    <QuantumProgress value={realTimeData.networkActivity} color="quantum" animated />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-mono text-cosmic">Data Processing</span>
                      <span className="text-sm font-mono text-white">{Math.round(realTimeData.dataProcessing)}%</span>
                    </div>
                    <QuantumProgress value={realTimeData.dataProcessing} color="cosmic" animated />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-center p-4 bg-carbon-steel/30 rounded-xl">
                    <p className="text-2xl font-bold text-quantum font-mono">{realTimeData.alertsProcessed}</p>
                    <p className="text-xs text-quantum/70 font-mono">Alerts Processed</p>
                  </div>

                  <div className="text-center p-4 bg-carbon-steel/30 rounded-xl">
                    <p className="text-2xl font-bold text-cosmic font-mono">{realTimeData.systemUptime.toFixed(2)}%</p>
                    <p className="text-xs text-cosmic/70 font-mono">System Uptime</p>
                  </div>
                </div>
              </div>
            </HolographicCard>

            <HolographicCard variant="elevated" className="slide-in-right">
              <h3 className="text-lg font-bold holographic-text font-mono mb-4">THREAT ASSESSMENT</h3>

              <div className="space-y-4">
                <div className="text-center p-6 bg-gradient-to-br from-cosmic/10 to-quantum/10 rounded-xl border border-cosmic/30">
                  <div className="text-4xl font-bold text-cosmic font-mono mb-2">LEVEL {stats.threatLevel}</div>
                  <p className="text-sm text-cosmic/70 font-mono">Current Threat Level</p>
                  <StatusIndicator status="online" showLabel animated className="mt-3 justify-center" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-gray-300">Seismic Activity</span>
                    <span className="text-xs font-mono text-cosmic">NOMINAL</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-gray-300">Water Levels</span>
                    <span className="text-xs font-mono text-warning">ELEVATED</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-gray-300">Weather Patterns</span>
                    <span className="text-xs font-mono text-cosmic">STABLE</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-gray-300">Sensor Network</span>
                    <span className="text-xs font-mono text-cosmic">OPTIMAL</span>
                  </div>
                </div>
              </div>
            </HolographicCard>
          </div>

          {/* Personnel Management Table */}
          <HolographicCard variant="elevated" className="slide-in-up">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold holographic-text font-mono">PERSONNEL MATRIX</h3>
                <p className="text-quantum/70 font-mono mt-1">Neural-Enhanced Agent Management</p>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className="bg-quantum/20 text-quantum border-quantum/50 font-mono">
                  {users.length} Active Agents
                </Badge>
                <QuantumButton variant="primary" size="sm">
                  <Brain className="h-4 w-4 mr-2" />
                  Neural Sync
                </QuantumButton>
              </div>
            </div>

            <DataTable
              data={users}
              onEdit={(user) => console.log("Edit agent:", user)}
              onDelete={(user) => console.log("Deactivate agent:", user)}
            />
          </HolographicCard>

          {/* Quick Actions Panel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <HolographicCard variant="plasma" className="slide-in-left">
              <div className="text-center space-y-4">
                <div className="p-4 bg-quantum/20 rounded-xl mx-auto w-fit">
                  <Users className="h-8 w-8 text-quantum" />
                </div>
                <h4 className="text-lg font-bold text-quantum font-mono">Deploy Agent</h4>
                <p className="text-sm text-gray-400 font-mono">Initialize new personnel access</p>
                <QuantumButton variant="primary" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Deploy Now
                </QuantumButton>
              </div>
            </HolographicCard>

            <HolographicCard variant="plasma" className="slide-in-up" style={{ animationDelay: "0.1s" }}>
              <div className="text-center space-y-4">
                <div className="p-4 bg-cosmic/20 rounded-xl mx-auto w-fit">
                  <Shield className="h-8 w-8 text-cosmic" />
                </div>
                <h4 className="text-lg font-bold text-cosmic font-mono">Security Audit</h4>
                <p className="text-sm text-gray-400 font-mono">Run comprehensive security scan</p>
                <QuantumButton variant="success" className="w-full">
                  <Brain className="h-4 w-4 mr-2" />
                  Initiate Scan
                </QuantumButton>
              </div>
            </HolographicCard>

            <HolographicCard variant="plasma" className="slide-in-right" style={{ animationDelay: "0.2s" }}>
              <div className="text-center space-y-4">
                <div className="p-4 bg-warning/20 rounded-xl mx-auto w-fit">
                  <Activity className="h-8 w-8 text-warning" />
                </div>
                <h4 className="text-lg font-bold text-warning font-mono">System Report</h4>
                <p className="text-sm text-gray-400 font-mono">Generate neural network analysis</p>
                <QuantumButton variant="secondary" className="w-full">
                  <Satellite className="h-4 w-4 mr-2" />
                  Generate Report
                </QuantumButton>
              </div>
            </HolographicCard>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
