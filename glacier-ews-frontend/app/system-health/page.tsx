"use client"

import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Navbar } from "@/components/layout/navbar"
import { Sidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Server, Database, Wifi, Activity, RefreshCw, AlertTriangle, CheckCircle, Clock } from "lucide-react"

const mockHealthData = {
  server: { uptimePct: 99.9, cpu: 45, memory: 68, status: "healthy" },
  api: { latencyMs: 120, requestsPerMin: 1250, errorRate: 0.1, status: "healthy" },
  database: { connections: 45, queryTime: 15, status: "healthy" },
  websocket: { connections: 120, messageRate: 850, status: "healthy" },
}

const mockSensors = [
  { nodeId: "S001", location: "Lake Alpha North", status: "online", lastHeartbeat: "2025-06-28 14:32:15", battery: 85 },
  { nodeId: "S002", location: "Lake Alpha South", status: "online", lastHeartbeat: "2025-06-28 14:32:10", battery: 92 },
  { nodeId: "S003", location: "Glacier Beta", status: "warning", lastHeartbeat: "2025-06-28 14:30:45", battery: 23 },
  { nodeId: "S004", location: "Highland Gamma", status: "online", lastHeartbeat: "2025-06-28 14:32:18", battery: 78 },
  { nodeId: "S005", location: "Valley Delta", status: "offline", lastHeartbeat: "2025-06-28 13:15:22", battery: 0 },
  { nodeId: "S006", location: "Ridge Echo", status: "online", lastHeartbeat: "2025-06-28 14:32:12", battery: 67 },
]

export default function SystemHealthPage() {
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [lastUpdated, setLastUpdated] = useState("2025-06-28 14:32:20")
  const [healthData, setHealthData] = useState(mockHealthData)

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastUpdated(new Date().toLocaleString())
        // Simulate slight variations in health data
        setHealthData((prev) => ({
          ...prev,
          server: { ...prev.server, cpu: Math.max(30, Math.min(70, prev.server.cpu + (Math.random() - 0.5) * 10)) },
          api: { ...prev.api, latencyMs: Math.max(80, Math.min(200, prev.api.latencyMs + (Math.random() - 0.5) * 20)) },
        }))
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
      case "healthy":
        return "text-green-400 bg-green-500/20 border-green-500/30"
      case "warning":
        return "text-solar-orange bg-solar-orange/20 border-solar-orange/30"
      case "offline":
      case "error":
        return "text-rocket-red bg-rocket-red/20 border-rocket-red/30"
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
      case "healthy":
        return <CheckCircle className="h-4 w-4" />
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "offline":
      case "error":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-space-black">
        <Navbar />
        <Sidebar />

        <main className="ml-16 lg:ml-64 pt-16 p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white font-space-mono">SYSTEM HEALTH MONITOR</h1>
              <p className="text-gray-400 mt-1">Real-time infrastructure and sensor network status</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="auto-refresh" className="text-sm text-gray-300">
                  Auto Refresh
                </Label>
                <Switch id="auto-refresh" checked={autoRefresh} onCheckedChange={setAutoRefresh} />
              </div>
              <Button
                variant="outline"
                className="border-neon-teal/30 text-neon-teal hover:bg-neon-teal/10 bg-transparent"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Now
              </Button>
              <Badge className="bg-neon-teal/20 text-neon-teal border-neon-teal/30 font-space-mono">
                Last Updated: {lastUpdated}
              </Badge>
            </div>
          </div>

          {/* Infrastructure Health Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="terminal-card border-neon-teal/20 hover:glow-neon transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Server Health</CardTitle>
                <Server className="h-4 w-4 text-neon-teal" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold text-white font-space-mono">{healthData.server.uptimePct}%</div>
                  <Badge className={getStatusColor(healthData.server.status)}>
                    {getStatusIcon(healthData.server.status)}
                    {healthData.server.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="space-y-1 text-xs text-gray-400">
                  <div className="flex justify-between">
                    <span>CPU Usage:</span>
                    <span className="text-neon-teal">{Math.round(healthData.server.cpu)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Memory:</span>
                    <span className="text-neon-teal">{healthData.server.memory}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="terminal-card border-neon-teal/20 hover:glow-neon transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">API Performance</CardTitle>
                <Activity className="h-4 w-4 text-neon-teal" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold text-white font-space-mono">
                    {Math.round(healthData.api.latencyMs)}ms
                  </div>
                  <Badge className={getStatusColor(healthData.api.status)}>
                    {getStatusIcon(healthData.api.status)}
                    {healthData.api.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="space-y-1 text-xs text-gray-400">
                  <div className="flex justify-between">
                    <span>Requests/min:</span>
                    <span className="text-neon-teal">{healthData.api.requestsPerMin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Error Rate:</span>
                    <span className="text-neon-teal">{healthData.api.errorRate}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="terminal-card border-neon-teal/20 hover:glow-neon transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Database Status</CardTitle>
                <Database className="h-4 w-4 text-neon-teal" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold text-white font-space-mono">{healthData.database.connections}</div>
                  <Badge className={getStatusColor(healthData.database.status)}>
                    {getStatusIcon(healthData.database.status)}
                    {healthData.database.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="space-y-1 text-xs text-gray-400">
                  <div className="flex justify-between">
                    <span>Connections:</span>
                    <span className="text-neon-teal">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Query Time:</span>
                    <span className="text-neon-teal">{healthData.database.queryTime}ms</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="terminal-card border-neon-teal/20 hover:glow-neon transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">WebSocket</CardTitle>
                <Wifi className="h-4 w-4 text-neon-teal" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold text-white font-space-mono">
                    {healthData.websocket.connections}
                  </div>
                  <Badge className={getStatusColor(healthData.websocket.status)}>
                    {getStatusIcon(healthData.websocket.status)}
                    {healthData.websocket.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="space-y-1 text-xs text-gray-400">
                  <div className="flex justify-between">
                    <span>Connections:</span>
                    <span className="text-neon-teal">Live</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Msg/min:</span>
                    <span className="text-neon-teal">{healthData.websocket.messageRate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sensor Network Status */}
          <Card className="terminal-card border-neon-teal/20">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-neon-teal font-space-mono">
                SENSOR NETWORK STATUS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockSensors.map((sensor) => (
                  <div
                    key={sensor.nodeId}
                    className="p-4 bg-carbon-gray/50 rounded-lg border border-neon-teal/10 hover:border-neon-teal/30 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            sensor.status === "online"
                              ? "bg-green-400 animate-pulse"
                              : sensor.status === "warning"
                                ? "bg-solar-orange animate-pulse"
                                : "bg-rocket-red"
                          }`}
                        />
                        <span className="text-white font-semibold font-space-mono">{sensor.nodeId}</span>
                      </div>
                      <Badge className={getStatusColor(sensor.status)}>{sensor.status.toUpperCase()}</Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="text-gray-300">{sensor.location}</div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Last Heartbeat:</span>
                        <span className="font-space-mono">{sensor.lastHeartbeat}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Battery:</span>
                        <span
                          className={`font-space-mono ${
                            sensor.battery > 50
                              ? "text-green-400"
                              : sensor.battery > 20
                                ? "text-solar-orange"
                                : "text-rocket-red"
                          }`}
                        >
                          {sensor.battery}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  )
}
