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
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Download,
  RefreshCw,
  Satellite,
  TrendingUp,
  TrendingDown,
  Brain,
  Zap,
  Eye,
  Layers,
  Mountain,
  Waves,
  Thermometer,
  Activity,
  Database,
  Cpu,
  Radio,
  Target,
} from "lucide-react"

const mockRegions = [
  { id: "r1", name: "Lake Alpha Neural Basin", status: "critical", threat: 4, sensors: 12 },
  { id: "r2", name: "Glacier Beta Quantum Valley", status: "monitoring", threat: 2, sensors: 8 },
  { id: "r3", name: "Highland Gamma Observatory", status: "stable", threat: 1, sensors: 6 },
  { id: "r4", name: "Delta Ridge Sensor Array", status: "warning", threat: 3, sensors: 10 },
]

const mockSatelliteImages = [
  {
    id: "img1",
    date: "2025-06-28",
    time: "14:32:15",
    type: "quantum-optical",
    resolution: "0.5m",
    coverage: "98.5%",
    analysis: "critical",
  },
  {
    id: "img2",
    date: "2025-06-28",
    time: "12:15:42",
    type: "thermal-infrared",
    resolution: "1.2m",
    coverage: "95.2%",
    analysis: "elevated",
  },
  {
    id: "img3",
    date: "2025-06-28",
    time: "09:45:18",
    type: "synthetic-radar",
    resolution: "2.0m",
    coverage: "99.1%",
    analysis: "nominal",
  },
  {
    id: "img4",
    date: "2025-06-27",
    time: "16:20:33",
    type: "hyperspectral",
    resolution: "0.8m",
    coverage: "97.8%",
    analysis: "warning",
  },
  {
    id: "img5",
    date: "2025-06-27",
    time: "13:55:07",
    type: "lidar-elevation",
    resolution: "0.3m",
    coverage: "94.7%",
    analysis: "stable",
  },
  {
    id: "img6",
    date: "2025-06-27",
    time: "11:30:21",
    type: "multispectral",
    resolution: "1.5m",
    coverage: "96.3%",
    analysis: "nominal",
  },
]

export default function QuantumGeologistsDashboard() {
  const [selectedRegion, setSelectedRegion] = useState("r1")
  const [lastSync, setLastSync] = useState("2025-06-28 14:32:15")
  const [analysisMode, setAnalysisMode] = useState("neural")
  const [realTimeData, setRealTimeData] = useState({
    waterLevel: 156.8,
    lakeArea: 2.47,
    temperature: 4.2,
    seismicActivity: 0.3,
    glacialMovement: 12.5,
    precipitationRate: 2.1,
    dataQuality: 97.8,
    processingLoad: 68,
  })

  const [chartData, setChartData] = useState({
    waterLevelTrend: 15.2,
    areaChangeTrend: -3.1,
    temperatureTrend: 2.8,
    seismicTrend: -0.5,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData((prev) => ({
        waterLevel: Math.max(140, Math.min(180, prev.waterLevel + (Math.random() - 0.5) * 2)),
        lakeArea: Math.max(2.0, Math.min(3.0, prev.lakeArea + (Math.random() - 0.5) * 0.1)),
        temperature: Math.max(2, Math.min(8, prev.temperature + (Math.random() - 0.5) * 0.5)),
        seismicActivity: Math.max(0, Math.min(2, prev.seismicActivity + (Math.random() - 0.5) * 0.2)),
        glacialMovement: Math.max(8, Math.min(20, prev.glacialMovement + (Math.random() - 0.5) * 1)),
        precipitationRate: Math.max(0, Math.min(5, prev.precipitationRate + (Math.random() - 0.5) * 0.3)),
        dataQuality: Math.max(95, Math.min(100, prev.dataQuality + (Math.random() - 0.5) * 1)),
        processingLoad: Math.max(50, Math.min(90, prev.processingLoad + (Math.random() - 0.5) * 5)),
      }))

      setLastSync(new Date().toLocaleString())
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const getImageTypeConfig = (type: string) => {
    switch (type) {
      case "quantum-optical":
        return { color: "bg-quantum/20 text-quantum border-quantum/30", icon: Eye }
      case "thermal-infrared":
        return { color: "bg-alert/20 text-alert border-alert/30", icon: Thermometer }
      case "synthetic-radar":
        return { color: "bg-warning/20 text-warning border-warning/30", icon: Radio }
      case "hyperspectral":
        return { color: "bg-nebula/20 text-nebula border-nebula/30", icon: Layers }
      case "lidar-elevation":
        return { color: "bg-cosmic/20 text-cosmic border-cosmic/30", icon: Mountain }
      case "multispectral":
        return { color: "bg-plasma/20 text-plasma border-plasma/30", icon: Satellite }
      default:
        return { color: "bg-gray-500/20 text-gray-400 border-gray-500/30", icon: Satellite }
    }
  }

  const getAnalysisColor = (analysis: string) => {
    switch (analysis) {
      case "critical":
        return "text-alert"
      case "warning":
      case "elevated":
        return "text-warning"
      case "stable":
      case "nominal":
        return "text-cosmic"
      default:
        return "text-gray-400"
    }
  }

  const selectedRegionData = mockRegions.find((r) => r.id === selectedRegion)

  return (
    <ProtectedRoute allowedRoles={["geologist"]}>
      <div className="min-h-screen quantum-bg">
        <ParticleField />
        <QuantumNavbar />
        <QuantumSidebar />

        <main className="ml-20 lg:ml-80 pt-20 p-8 space-y-8">
          {/* Header Section */}
          <div className="flex items-center justify-between slide-in-up">
            <div>
              <h1 className="text-4xl font-bold holographic-text font-mono mb-2">NEURAL GEOLOGICAL CENTER</h1>
              <p className="text-quantum/80 text-lg font-mono">Quantum-Enhanced Geological Analysis & Monitoring</p>
              <div className="flex items-center space-x-4 mt-3">
                <StatusIndicator status="online" showLabel animated />
                <Badge className="bg-quantum/20 text-quantum border-quantum/50 font-mono">
                  NEURAL PROCESSING ACTIVE
                </Badge>
                <Badge className="bg-cosmic/20 text-cosmic border-cosmic/50 font-mono">
                  {selectedRegionData?.sensors} SENSORS ONLINE
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-64 bg-carbon-steel/50 border-quantum/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-carbon-steel border-quantum/30">
                  {mockRegions.map((region) => (
                    <SelectItem key={region.id} value={region.id} className="text-white hover:bg-quantum/10">
                      <div className="flex items-center space-x-2">
                        <StatusIndicator
                          status={
                            region.status === "critical" ? "error" : region.status === "warning" ? "warning" : "online"
                          }
                          size="sm"
                        />
                        <span>{region.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <QuantumButton variant="secondary" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Neural Sync
              </QuantumButton>
              <QuantumButton variant="primary" size="lg" className="quantum-glow">
                <Brain className="h-5 w-5 mr-2" />
                AI Analysis
              </QuantumButton>
            </div>
          </div>

          {/* Region Status Card */}
          <HolographicCard variant="elevated" className="slide-in-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <div className="p-4 bg-quantum/20 rounded-2xl">
                    <Mountain className="h-8 w-8 text-quantum" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold holographic-text font-mono">{selectedRegionData?.name}</h2>
                    <p className="text-quantum/70 font-mono">Quantum Geological Observatory</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <StatusIndicator
                    status={
                      selectedRegionData?.status === "critical"
                        ? "error"
                        : selectedRegionData?.status === "warning"
                          ? "warning"
                          : "online"
                    }
                    showLabel
                    animated
                  />
                  <Badge className="bg-alert/20 text-alert border-alert/30 font-mono">
                    THREAT LEVEL {selectedRegionData?.threat}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-quantum/70 font-mono">Last Neural Sync</div>
                <div className="text-lg font-bold text-white font-mono">{lastSync}</div>
                <div className="text-xs text-cosmic font-mono">
                  Data Quality: {realTimeData.dataQuality.toFixed(1)}%
                </div>
              </div>
            </div>
          </HolographicCard>

          {/* Real-time Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <HolographicCard variant="plasma" className="slide-in-left">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-quantum/20 rounded-xl">
                    <Waves className="h-6 w-6 text-quantum" />
                  </div>
                  <div>
                    <p className="text-sm font-mono text-quantum/70">WATER LEVEL</p>
                    <p className="text-2xl font-bold text-white font-mono">{realTimeData.waterLevel.toFixed(1)}m</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4 text-alert" />
                  <span className="text-xs text-alert font-mono">+{chartData.waterLevelTrend}%</span>
                </div>
              </div>
              <QuantumProgress value={(realTimeData.waterLevel / 200) * 100} color="quantum" animated />
            </HolographicCard>

            <HolographicCard variant="plasma" className="slide-in-up" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-cosmic/20 rounded-xl">
                    <Target className="h-6 w-6 text-cosmic" />
                  </div>
                  <div>
                    <p className="text-sm font-mono text-cosmic/70">LAKE AREA</p>
                    <p className="text-2xl font-bold text-white font-mono">{realTimeData.lakeArea.toFixed(2)} km²</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingDown className="h-4 w-4 text-cosmic" />
                  <span className="text-xs text-cosmic font-mono">{chartData.areaChangeTrend}%</span>
                </div>
              </div>
              <QuantumProgress value={(realTimeData.lakeArea / 4) * 100} color="cosmic" animated />
            </HolographicCard>

            <HolographicCard variant="plasma" className="slide-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-warning/20 rounded-xl">
                    <Thermometer className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm font-mono text-warning/70">TEMPERATURE</p>
                    <p className="text-2xl font-bold text-white font-mono">{realTimeData.temperature.toFixed(1)}°C</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4 text-warning" />
                  <span className="text-xs text-warning font-mono">+{chartData.temperatureTrend}%</span>
                </div>
              </div>
              <QuantumProgress value={(realTimeData.temperature / 10) * 100} color="warning" animated />
            </HolographicCard>

            <HolographicCard variant="plasma" className="slide-in-right">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-alert/20 rounded-xl">
                    <Activity className="h-6 w-6 text-alert" />
                  </div>
                  <div>
                    <p className="text-sm font-mono text-alert/70">SEISMIC</p>
                    <p className="text-2xl font-bold text-white font-mono">{realTimeData.seismicActivity.toFixed(1)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingDown className="h-4 w-4 text-cosmic" />
                  <span className="text-xs text-cosmic font-mono">{chartData.seismicTrend}%</span>
                </div>
              </div>
              <QuantumProgress value={(realTimeData.seismicActivity / 5) * 100} color="alert" animated />
            </HolographicCard>
          </div>

          {/* Analysis Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Neural Analysis Charts */}
            <div className="space-y-6">
              <HolographicCard variant="elevated" className="slide-in-left">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold holographic-text font-mono">NEURAL WATER ANALYSIS</h3>
                    <p className="text-quantum/70 font-mono">Quantum-Enhanced Hydrological Modeling</p>
                  </div>
                  <div className="flex space-x-2">
                    <QuantumButton
                      variant={analysisMode === "neural" ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setAnalysisMode("neural")}
                    >
                      <Brain className="h-4 w-4 mr-1" />
                      Neural
                    </QuantumButton>
                    <QuantumButton
                      variant={analysisMode === "quantum" ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setAnalysisMode("quantum")}
                    >
                      <Zap className="h-4 w-4 mr-1" />
                      Quantum
                    </QuantumButton>
                  </div>
                </div>

                <div className="h-64 bg-gradient-to-br from-deep-void via-carbon-steel to-deep-void rounded-2xl relative overflow-hidden border border-quantum/30">
                  <div className="absolute inset-0 neural-grid opacity-20" />

                  {/* Enhanced Chart Visualization */}
                  <svg className="w-full h-full" viewBox="0 0 400 250">
                    <defs>
                      <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#00FFFF" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Data Path */}
                    <path
                      d="M 20 200 Q 80 150 140 160 T 220 120 T 300 100 T 380 80"
                      stroke="#00D4FF"
                      strokeWidth="3"
                      fill="none"
                      filter="url(#glow)"
                      className="animate-pulse"
                    />

                    {/* Fill Area */}
                    <path
                      d="M 20 200 Q 80 150 140 160 T 220 120 T 300 100 T 380 80 L 380 230 L 20 230 Z"
                      fill="url(#waterGradient)"
                      opacity="0.6"
                    />

                    {/* Data Points */}
                    <circle cx="80" cy="150" r="4" fill="#00D4FF" className="animate-pulse" />
                    <circle cx="140" cy="160" r="4" fill="#00FFFF" className="animate-pulse" />
                    <circle cx="220" cy="120" r="4" fill="#8B5CF6" className="animate-pulse" />
                    <circle cx="300" cy="100" r="4" fill="#00D4FF" className="animate-pulse" />
                    <circle cx="380" cy="80" r="4" fill="#FF2D55" className="animate-pulse" />
                  </svg>

                  {/* Analysis Overlay */}
                  <div className="absolute top-4 left-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-quantum rounded-full animate-pulse" />
                      <span className="text-xs text-quantum font-mono">NEURAL PREDICTION</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-alert rounded-full animate-pulse" />
                      <span className="text-xs text-alert font-mono">CRITICAL THRESHOLD</span>
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4 text-xs text-quantum/70 font-mono">
                    <div>TREND: +{chartData.waterLevelTrend}% ↗</div>
                    <div>CONFIDENCE: 97.8%</div>
                  </div>
                </div>
              </HolographicCard>

              <HolographicCard variant="elevated" className="slide-in-left" style={{ animationDelay: "0.2s" }}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold holographic-text font-mono">GLACIAL DYNAMICS</h3>
                    <p className="text-cosmic/70 font-mono">Real-Time Movement Analysis</p>
                  </div>
                  <QuantumButton variant="secondary" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </QuantumButton>
                </div>

                <div className="h-48 bg-gradient-to-br from-deep-void via-carbon-steel to-deep-void rounded-2xl relative overflow-hidden border border-cosmic/30">
                  <div className="absolute inset-0 neural-grid opacity-20" />

                  {/* Bar Chart Visualization */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between space-x-3">
                    {[65, 78, 92, 85, 73, 88, 95].map((height, index) => (
                      <div key={index} className="flex flex-col items-center space-y-2">
                        <div
                          className="bg-gradient-to-t from-cosmic to-quantum rounded-t-lg transition-all duration-1000 w-8"
                          style={{
                            height: `${height}px`,
                            animationDelay: `${index * 0.1}s`,
                          }}
                        />
                        <div className="text-xs text-cosmic font-mono">{index + 1}</div>
                      </div>
                    ))}
                  </div>

                  <div className="absolute top-4 left-4 space-y-1">
                    <div className="text-2xl font-bold text-cosmic font-mono">
                      {realTimeData.glacialMovement.toFixed(1)} cm/day
                    </div>
                    <div className="text-xs text-cosmic/70 font-mono">Average Movement Rate</div>
                  </div>

                  <div className="absolute top-4 right-4 flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-warning" />
                    <span className="text-xs text-warning font-mono">ACCELERATING</span>
                  </div>
                </div>
              </HolographicCard>
            </div>

            {/* Quantum Satellite Interface */}
            <HolographicCard variant="plasma" className="slide-in-right">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold holographic-text font-mono">QUANTUM SATELLITE ARRAY</h3>
                  <p className="text-plasma/70 font-mono">Multi-Spectral Neural Imaging</p>
                </div>
                <div className="flex space-x-2">
                  <QuantumButton variant="secondary" size="sm">
                    <Satellite className="h-4 w-4 mr-2" />
                    Live Feed
                  </QuantumButton>
                  <QuantumButton variant="primary" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    AI Analysis
                  </QuantumButton>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {mockSatelliteImages.map((image, index) => {
                  const config = getImageTypeConfig(image.type)
                  return (
                    <div
                      key={image.id}
                      className="relative group cursor-pointer slide-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="aspect-video bg-gradient-to-br from-deep-void via-carbon-steel to-deep-void rounded-xl overflow-hidden border border-quantum/20 hover:border-quantum/50 transition-all duration-300 hover:scale-105">
                        {/* Neural Grid Pattern */}
                        <div className="w-full h-full neural-grid opacity-30 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <config.icon className="h-8 w-8 text-quantum/50" />
                          </div>

                          {/* Scanning Effect */}
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-quantum/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                      </div>

                      {/* Image Type Badge */}
                      <div className="absolute top-2 left-2">
                        <Badge className={config.color}>{image.type.toUpperCase()}</Badge>
                      </div>

                      {/* Analysis Status */}
                      <div className="absolute top-2 right-2">
                        <div
                          className={`w-3 h-3 rounded-full animate-pulse ${getAnalysisColor(image.analysis).replace("text-", "bg-")}`}
                        />
                      </div>

                      {/* Image Info */}
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="bg-carbon-steel/90 backdrop-blur-sm rounded-lg p-2 space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-white font-mono font-semibold">{image.date}</span>
                            <span className="text-xs text-quantum font-mono">{image.time}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-400 font-mono">Res: {image.resolution}</span>
                            <span className="text-xs text-cosmic font-mono">{image.coverage}</span>
                          </div>
                          <div className="text-center">
                            <span className={`text-xs font-mono font-semibold ${getAnalysisColor(image.analysis)}`}>
                              {image.analysis.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-quantum/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                        <div className="text-center space-y-2">
                          <Eye className="h-6 w-6 text-quantum mx-auto" />
                          <span className="text-quantum font-semibold text-sm">Neural Analysis</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </HolographicCard>
          </div>

          {/* Advanced Analytics Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Processing Status */}
            <HolographicCard variant="elevated" className="slide-in-left">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold holographic-text font-mono">NEURAL PROCESSING</h4>
                <Cpu className="h-5 w-5 text-quantum animate-pulse" />
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-mono text-quantum">AI Analysis</span>
                    <span className="text-sm font-mono text-white">{realTimeData.processingLoad}%</span>
                  </div>
                  <QuantumProgress value={realTimeData.processingLoad} color="quantum" animated />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-mono text-cosmic">Data Quality</span>
                    <span className="text-sm font-mono text-white">{realTimeData.dataQuality.toFixed(1)}%</span>
                  </div>
                  <QuantumProgress value={realTimeData.dataQuality} color="cosmic" animated />
                </div>

                <div className="pt-4 border-t border-quantum/20">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-carbon-steel/30 rounded-xl">
                      <div className="text-lg font-bold text-quantum font-mono">47</div>
                      <div className="text-xs text-quantum/70 font-mono">Active Sensors</div>
                    </div>
                    <div className="p-3 bg-carbon-steel/30 rounded-xl">
                      <div className="text-lg font-bold text-cosmic font-mono">156</div>
                      <div className="text-xs text-cosmic/70 font-mono">Data Streams</div>
                    </div>
                  </div>
                </div>
              </div>
            </HolographicCard>

            {/* Environmental Factors */}
            <HolographicCard variant="elevated" className="slide-in-up" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold holographic-text font-mono">ENVIRONMENTAL</h4>
                <Activity className="h-5 w-5 text-cosmic animate-pulse" />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-mono text-gray-300">Precipitation</span>
                  <span className="text-sm font-mono text-quantum">
                    {realTimeData.precipitationRate.toFixed(1)} mm/h
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-mono text-gray-300">Wind Speed</span>
                  <span className="text-sm font-mono text-cosmic">12.3 km/h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-mono text-gray-300">Humidity</span>
                  <span className="text-sm font-mono text-warning">78.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-mono text-gray-300">Pressure</span>
                  <span className="text-sm font-mono text-nebula">1013.2 hPa</span>
                </div>

                <div className="pt-4 border-t border-quantum/20">
                  <div className="text-center p-3 bg-gradient-to-r from-cosmic/10 to-quantum/10 rounded-xl">
                    <div className="text-lg font-bold text-cosmic font-mono">STABLE</div>
                    <div className="text-xs text-cosmic/70 font-mono">Weather Conditions</div>
                  </div>
                </div>
              </div>
            </HolographicCard>

            {/* Export & Analysis */}
            <HolographicCard variant="elevated" className="slide-in-right">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold holographic-text font-mono">DATA EXPORT</h4>
                <Database className="h-5 w-5 text-warning animate-pulse" />
              </div>

              <div className="space-y-4">
                <div className="text-sm text-gray-300 font-mono">
                  Export comprehensive geological data for advanced neural network analysis and external processing.
                </div>

                <div className="space-y-3">
                  <QuantumButton variant="primary" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Neural Dataset (CSV)
                  </QuantumButton>
                  <QuantumButton variant="secondary" className="w-full">
                    <Satellite className="h-4 w-4 mr-2" />
                    Satellite Archive (ZIP)
                  </QuantumButton>
                  <QuantumButton variant="success" className="w-full">
                    <Brain className="h-4 w-4 mr-2" />
                    AI Analysis Report
                  </QuantumButton>
                </div>

                <div className="pt-4 border-t border-quantum/20">
                  <div className="text-center">
                    <div className="text-xs text-quantum/70 font-mono mb-2">Last Export</div>
                    <div className="text-sm text-white font-mono">2025-06-28 12:45:33</div>
                  </div>
                </div>
              </div>
            </HolographicCard>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
