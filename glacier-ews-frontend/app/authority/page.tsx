"use client"

import { cn } from "@/lib/utils"

import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { QuantumNavbar } from "@/components/layout/quantum-navbar"
import { QuantumSidebar } from "@/components/layout/quantum-sidebar"
import { HolographicCard } from "@/components/ui/holographic-card"
import { QuantumButton } from "@/components/ui/quantum-button"
import { QuantumProgress } from "@/components/ui/quantum-progress"
import { StatusIndicator } from "@/components/ui/status-indicator"
import { ParticleField } from "@/components/effects/particle-field"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Layers, Calendar, AlertTriangle, Shield, Satellite, Target, Radio, Eye } from "lucide-react"

const mockAlerts = [
  {
    id: "a1",
    time: "14:32",
    location: "Lake Alpha Sector 7",
    severity: "critical",
    message: "Rapid water level increase detected - 15.2m above threshold",
    coordinates: { lat: 28.238, lng: 83.9956 },
  },
  {
    id: "a2",
    time: "13:45",
    location: "Beta Valley Station",
    severity: "warning",
    message: "Sensor array anomaly - potential equipment malfunction",
    coordinates: { lat: 28.1234, lng: 84.1234 },
  },
  {
    id: "a3",
    time: "12:15",
    location: "Gamma Ridge Observatory",
    severity: "info",
    message: "Routine monitoring cycle completed - all systems nominal",
    coordinates: { lat: 28.3456, lng: 83.789 },
  },
]

const mockZoneStats = {
  critical: 2,
  warning: 5,
  caution: 12,
  normal: 28,
  offline: 1,
}

export default function QuantumAuthorityDashboard() {
  const [alerts, setAlerts] = useState(mockAlerts)
  const [selectedLayers, setSelectedLayers] = useState(["risk-zones", "sensors", "weather"])
  const [mapMode, setMapMode] = useState("tactical")
  const [realTimeData, setRealTimeData] = useState({
    threatLevel: 3,
    activeSensors: 47,
    dataStreams: 156,
    responseTime: 2.3,
    floodETA: "02:45:32",
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData((prev) => ({
        ...prev,
        activeSensors: Math.max(40, Math.min(50, prev.activeSensors + (Math.random() - 0.5) * 2)),
        dataStreams: Math.max(140, Math.min(180, prev.dataStreams + (Math.random() - 0.5) * 10)),
        responseTime: Math.max(1.5, Math.min(4.0, prev.responseTime + (Math.random() - 0.5) * 0.5)),
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case "critical":
        return {
          color: "text-alert bg-alert/20 border-alert/30",
          icon: AlertTriangle,
          glow: "shadow-alert/50",
        }
      case "warning":
        return {
          color: "text-warning bg-warning/20 border-warning/30",
          icon: AlertTriangle,
          glow: "shadow-warning/50",
        }
      case "info":
        return {
          color: "text-quantum bg-quantum/20 border-quantum/30",
          icon: Shield,
          glow: "shadow-quantum/50",
        }
      default:
        return {
          color: "text-gray-400 bg-gray-500/20 border-gray-500/30",
          icon: Shield,
          glow: "shadow-gray-500/50",
        }
    }
  }

  return (
    <ProtectedRoute allowedRoles={["authority"]}>
      <div className="min-h-screen quantum-bg">
        <ParticleField />
        <QuantumNavbar />
        <QuantumSidebar />

        <main className="ml-20 lg:ml-80 pt-20 p-8 space-y-8">
          {/* Command Header */}
          <div className="flex items-center justify-between slide-in-up">
            <div>
              <h1 className="text-4xl font-bold holographic-text font-mono mb-2">TACTICAL COMMAND CENTER</h1>
              <p className="text-quantum/80 text-lg font-mono">Real-Time Threat Assessment & Response Coordination</p>
              <div className="flex items-center space-x-4 mt-3">
                <StatusIndicator status="online" showLabel animated />
                <Badge className="bg-alert/20 text-alert border-alert/50 font-mono animate-pulse">
                  THREAT LEVEL {realTimeData.threatLevel}
                </Badge>
                <Badge className="bg-cosmic/20 text-cosmic border-cosmic/50 font-mono">
                  {realTimeData.activeSensors} SENSORS ACTIVE
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <QuantumButton variant="secondary" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Last Sync: 14:32
              </QuantumButton>
              <QuantumButton variant="danger" size="lg" className="quantum-glow">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Emergency Protocol
              </QuantumButton>
            </div>
          </div>

          {/* Tactical Map Section */}
          <HolographicCard variant="elevated" className="h-[500px] slide-in-up">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold holographic-text font-mono">NEURAL TACTICAL GRID</h3>
                <p className="text-quantum/70 font-mono">Quantum-Enhanced Threat Visualization</p>
              </div>
              <div className="flex items-center space-x-3">
                <QuantumButton
                  variant={mapMode === "tactical" ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => setMapMode("tactical")}
                >
                  <Target className="h-4 w-4 mr-2" />
                  Tactical
                </QuantumButton>
                <QuantumButton
                  variant={mapMode === "satellite" ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => setMapMode("satellite")}
                >
                  <Satellite className="h-4 w-4 mr-2" />
                  Satellite
                </QuantumButton>
                <QuantumButton variant="secondary" size="sm">
                  <Layers className="h-4 w-4 mr-2" />
                  Layers
                </QuantumButton>
              </div>
            </div>

            <div className="relative h-full bg-gradient-to-br from-deep-void via-carbon-steel to-deep-void rounded-2xl overflow-hidden border border-quantum/30">
              {/* Neural Grid Overlay */}
              <div className="absolute inset-0 neural-grid opacity-20" />

              {/* Map Legend */}
              <div className="absolute top-6 left-6 space-y-3 z-10">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-alert rounded-full animate-pulse shadow-lg shadow-alert/50" />
                  <span className="text-xs text-alert font-mono font-semibold">CRITICAL ZONES</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-warning rounded-full animate-pulse shadow-lg shadow-warning/50" />
                  <span className="text-xs text-warning font-mono font-semibold">WARNING ZONES</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-quantum rounded-full animate-pulse shadow-lg shadow-quantum/50" />
                  <span className="text-xs text-quantum font-mono font-semibold">SENSOR NODES</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-cosmic rounded-full animate-pulse shadow-lg shadow-cosmic/50" />
                  <span className="text-xs text-cosmic font-mono font-semibold">SAFE ZONES</span>
                </div>
              </div>

              {/* Simulated Map Elements with Enhanced Effects */}
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  <div className="w-8 h-8 bg-alert rounded-full animate-pulse shadow-2xl shadow-alert/70" />
                  <div className="absolute inset-0 w-8 h-8 border-2 border-alert rounded-full animate-ping" />
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-alert font-mono font-bold">
                    ALPHA-7
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 left-1/3">
                <div className="relative">
                  <div className="w-6 h-6 bg-warning rounded-full animate-pulse shadow-xl shadow-warning/50" />
                  <div className="absolute inset-0 w-6 h-6 border border-warning rounded-full animate-pulse" />
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-warning font-mono">
                    BETA
                  </div>
                </div>
              </div>

              <div className="absolute bottom-1/3 right-1/3">
                <div className="relative">
                  <div className="w-4 h-4 bg-quantum rounded-full animate-pulse shadow-lg shadow-quantum/50" />
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs text-quantum font-mono">
                    GAMMA
                  </div>
                </div>
              </div>

              {/* Data Streams */}
              <div className="absolute bottom-6 right-6 text-xs text-quantum/70 font-mono space-y-1">
                <div>REAL-TIME NEURAL OVERLAY</div>
                <div>QUANTUM PROCESSING: ACTIVE</div>
                <div>DATA STREAMS: {realTimeData.dataStreams}</div>
              </div>

              {/* Scanning Effect */}
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-quantum to-transparent animate-pulse"
                  style={{ animation: "scan 4s linear infinite" }}
                />
              </div>
            </div>
          </HolographicCard>

          {/* Status Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Zone Status */}
            <HolographicCard variant="plasma" className="slide-in-left">
              <h4 className="text-lg font-bold holographic-text font-mono mb-4">ZONE STATUS</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-alert rounded-full animate-pulse" />
                    <span className="text-sm text-white font-mono">Critical</span>
                  </div>
                  <span className="text-lg font-bold text-alert font-mono">{mockZoneStats.critical}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-warning rounded-full animate-pulse" />
                    <span className="text-sm text-white font-mono">Warning</span>
                  </div>
                  <span className="text-lg font-bold text-warning font-mono">{mockZoneStats.warning}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-solar rounded-full animate-pulse" />
                    <span className="text-sm text-white font-mono">Caution</span>
                  </div>
                  <span className="text-lg font-bold text-solar font-mono">{mockZoneStats.caution}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-cosmic rounded-full animate-pulse" />
                    <span className="text-sm text-white font-mono">Normal</span>
                  </div>
                  <span className="text-lg font-bold text-cosmic font-mono">{mockZoneStats.normal}</span>
                </div>
              </div>
            </HolographicCard>

            {/* System Health */}
            <HolographicCard variant="plasma" className="slide-in-up" style={{ animationDelay: "0.1s" }}>
              <h4 className="text-lg font-bold holographic-text font-mono mb-4">NEURAL HEALTH</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-white font-mono">Sensor Network</span>
                    <span className="text-sm text-cosmic font-mono">98.5%</span>
                  </div>
                  <QuantumProgress value={98.5} color="cosmic" animated />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-white font-mono">Data Processing</span>
                    <span className="text-sm text-quantum font-mono">99.2%</span>
                  </div>
                  <QuantumProgress value={99.2} color="quantum" animated />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-white font-mono">Communication</span>
                    <span className="text-sm text-warning font-mono">94.1%</span>
                  </div>
                  <QuantumProgress value={94.1} color="warning" animated />
                </div>
              </div>
            </HolographicCard>

            {/* Response Metrics */}
            <HolographicCard variant="plasma" className="slide-in-up" style={{ animationDelay: "0.2s" }}>
              <h4 className="text-lg font-bold holographic-text font-mono mb-4">RESPONSE METRICS</h4>
              <div className="space-y-4">
                <div className="text-center p-3 bg-carbon-steel/30 rounded-xl">
                  <p className="text-2xl font-bold text-quantum font-mono">{realTimeData.responseTime.toFixed(1)}s</p>
                  <p className="text-xs text-quantum/70 font-mono">Avg Response Time</p>
                </div>
                <div className="text-center p-3 bg-carbon-steel/30 rounded-xl">
                  <p className="text-2xl font-bold text-cosmic font-mono">{realTimeData.activeSensors}</p>
                  <p className="text-xs text-cosmic/70 font-mono">Active Sensors</p>
                </div>
                <div className="text-center p-3 bg-carbon-steel/30 rounded-xl">
                  <p className="text-2xl font-bold text-warning font-mono">156</p>
                  <p className="text-xs text-warning/70 font-mono">Data Streams</p>
                </div>
              </div>
            </HolographicCard>

            {/* Flood ETA */}
            <HolographicCard variant="elevated" className="slide-in-right">
              <h4 className="text-lg font-bold holographic-text font-mono mb-4">FLOOD PATH ETA</h4>
              <div className="text-center space-y-4">
                <div className="text-4xl font-bold text-alert font-mono animate-pulse">{realTimeData.floodETA}</div>
                <p className="text-sm text-gray-400 font-mono">Estimated time to downstream settlements</p>
                <QuantumProgress value={35} color="alert" animated />
                <div className="flex items-center justify-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-alert animate-pulse" />
                  <span className="text-xs text-alert font-mono font-bold">CRITICAL ALERT ACTIVE</span>
                </div>
              </div>
            </HolographicCard>
          </div>

          {/* Live Alert Stream */}
          <HolographicCard variant="elevated" className="slide-in-up">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold holographic-text font-mono">NEURAL ALERT STREAM</h3>
                <p className="text-quantum/70 font-mono">Real-Time Threat Intelligence</p>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className="bg-alert/20 text-alert border-alert/50 font-mono animate-pulse">
                  {alerts.filter((a) => a.severity === "critical").length} CRITICAL
                </Badge>
                <QuantumButton variant="secondary" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </QuantumButton>
              </div>
            </div>

            <div className="space-y-4">
              {alerts.map((alert, index) => {
                const config = getSeverityConfig(alert.severity)
                return (
                  <div
                    key={alert.id}
                    className={cn(
                      "flex items-center space-x-4 p-4 bg-carbon-steel/30 rounded-xl border transition-all duration-300 hover:scale-[1.02]",
                      config.color.includes("border") ? config.color : `border-${alert.severity}/20`,
                      `slide-in-left`,
                    )}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-3">
                      <config.icon className={`h-5 w-5 ${config.color.split(" ")[0]} animate-pulse`} />
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-300 font-mono">{alert.time}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-quantum" />
                      <span className="text-sm text-white font-semibold">{alert.location}</span>
                    </div>

                    <Badge className={config.color}>{alert.severity.toUpperCase()}</Badge>

                    <span className="text-sm text-gray-300 flex-1 font-mono">{alert.message}</span>

                    <div className="flex space-x-2">
                      <QuantumButton variant="secondary" size="sm">
                        <Radio className="h-4 w-4 mr-1" />
                        Respond
                      </QuantumButton>
                      <QuantumButton variant="primary" size="sm">
                        <Target className="h-4 w-4 mr-1" />
                        Locate
                      </QuantumButton>
                    </div>
                  </div>
                )
              })}
            </div>
          </HolographicCard>
        </main>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(500px); }
        }
      `}</style>
    </ProtectedRoute>
  )
}
