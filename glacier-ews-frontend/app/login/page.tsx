"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"
import { QuantumButton } from "@/components/ui/quantum-button"
import { HolographicCard } from "@/components/ui/holographic-card"
import { ParticleField } from "@/components/effects/particle-field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Satellite, Zap, Shield, Cpu } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function QuantumLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { login, user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
    if (user) {
      switch (user.role) {
        case "admin":
          router.push("/admin")
          break
        case "authority":
          router.push("/authority")
          break
        case "geologist":
          router.push("/geologists")
          break
      }
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(username, password)
      toast({
        title: "🚀 Access Granted",
        description: "Welcome to GLOFzilla Neural Network",
      })
    } catch (error) {
      toast({
        title: "🔒 Access Denied",
        description: "Invalid credentials. Please verify your authorization.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen relative overflow-hidden quantum-bg">
      <ParticleField />

      {/* Neural Grid Background */}
      <div className="absolute inset-0 neural-grid opacity-20" />

      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-quantum/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-nebula/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-48 h-48 bg-cosmic/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <HolographicCard variant="elevated" className="w-full max-w-md slide-in-up">
          {/* Header */}
          <div className="text-center space-y-6 mb-8">
            <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-quantum rounded-full animate-spin opacity-30" />
              <div
                className="absolute inset-2 border-2 border-plasma rounded-full animate-spin opacity-50"
                style={{ animationDirection: "reverse", animationDuration: "3s" }}
              />
              <Satellite className="w-10 h-10 text-quantum animate-pulse z-10" />
            </div>

            <div>
              <h1 className="text-4xl font-bold holographic-text font-mono mb-2">GLOFzilla</h1>
              <div className="h-1 bg-gradient-to-r from-transparent via-quantum to-transparent mb-4 animate-pulse" />
              <p className="text-quantum/80 text-sm font-mono tracking-wider">NEURAL EARLY WARNING SYSTEM</p>
              <p className="text-gray-400 text-xs font-mono mt-2">Quantum-Enhanced Threat Detection</p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-semibold text-quantum font-mono">
                AUTHORIZATION ID
              </Label>
              <div className="relative">
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-carbon-steel/50 border-quantum/30 text-white placeholder:text-gray-500 focus:border-quantum focus:ring-quantum/20 font-mono pl-10"
                  placeholder="Enter authorization ID"
                  required
                />
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-quantum/50" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-quantum font-mono">
                SECURITY KEY
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-carbon-steel/50 border-quantum/30 text-white placeholder:text-gray-500 focus:border-quantum focus:ring-quantum/20 font-mono pl-10 pr-12"
                  placeholder="Enter security key"
                  required
                />
                <Cpu className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-quantum/50" />
                <QuantumButton
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-8 w-8"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                </QuantumButton>
              </div>
            </div>

            <QuantumButton
              type="submit"
              variant="primary"
              size="lg"
              className="w-full font-bold tracking-wider"
              isLoading={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="quantum-spinner w-5 h-5" />
                  <span>AUTHENTICATING...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>INITIATE ACCESS</span>
                </div>
              )}
            </QuantumButton>

            <div className="text-center">
              <QuantumButton type="button" variant="secondary" size="sm" className="text-fusion hover:text-fusion/80">
                Emergency Recovery Protocol
              </QuantumButton>
            </div>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 pt-6 border-t border-quantum/20">
            <div className="text-center space-y-3">
              <p className="text-xs text-quantum/70 font-mono">DEMO ACCESS CODES:</p>
              <div className="grid grid-cols-1 gap-2 text-xs font-mono">
                <div className="flex justify-between items-center p-2 bg-carbon-steel/30 rounded">
                  <span className="text-cosmic">ADMIN</span>
                  <span className="text-gray-400">admin / password</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-carbon-steel/30 rounded">
                  <span className="text-warning">AUTHORITY</span>
                  <span className="text-gray-400">authority / password</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-carbon-steel/30 rounded">
                  <span className="text-nebula">GEOLOGIST</span>
                  <span className="text-gray-400">geologist / password</span>
                </div>
              </div>
            </div>
          </div>
        </HolographicCard>
      </div>

      {/* Bottom Data Stream */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-quantum to-transparent opacity-50">
        <div className="data-stream" />
      </div>
    </div>
  )
}
