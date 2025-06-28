"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Navbar } from "@/components/layout/navbar"
import { Sidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { SettingsIcon, Save, RotateCcw, Bell, Mail, Smartphone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const [thresholds, setThresholds] = useState({
    waterLevel: 150,
    flowRate: 250,
    temperature: 5,
    pressure: 1013,
  })

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    desktop: true,
  })

  const { toast } = useToast()

  const handleSave = () => {
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings Saved",
        description: "Your configuration has been updated successfully.",
      })
    }, 500)
  }

  const handleReset = () => {
    setThresholds({
      waterLevel: 150,
      flowRate: 250,
      temperature: 5,
      pressure: 1013,
    })
    setNotifications({
      email: true,
      sms: false,
      push: true,
      desktop: true,
    })
    toast({
      title: "Settings Reset",
      description: "All settings have been restored to defaults.",
    })
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
              <h1 className="text-3xl font-bold text-white font-space-mono">SYSTEM CONFIGURATION</h1>
              <p className="text-gray-400 mt-1">Configure thresholds and notification preferences</p>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={handleReset}
                className="border-solar-orange/30 text-solar-orange hover:bg-solar-orange/10 bg-transparent"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Defaults
              </Button>
              <Button
                onClick={handleSave}
                className="bg-neon-teal hover:bg-neon-teal/80 text-space-black font-semibold"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Threshold Configuration */}
            <Card className="terminal-card border-neon-teal/20">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-neon-teal font-space-mono flex items-center">
                  <SettingsIcon className="h-5 w-5 mr-2" />
                  ALERT THRESHOLDS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-white font-medium">Water Level</Label>
                    <Badge className="bg-neon-teal/20 text-neon-teal border-neon-teal/30">
                      {thresholds.waterLevel} m
                    </Badge>
                  </div>
                  <Slider
                    value={[thresholds.waterLevel]}
                    onValueChange={(value) => setThresholds((prev) => ({ ...prev, waterLevel: value[0] }))}
                    max={300}
                    min={50}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400 font-space-mono">
                    <span>50m</span>
                    <span>300m</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-white font-medium">Flow Rate</Label>
                    <Badge className="bg-neon-teal/20 text-neon-teal border-neon-teal/30">
                      {thresholds.flowRate} m³/s
                    </Badge>
                  </div>
                  <Slider
                    value={[thresholds.flowRate]}
                    onValueChange={(value) => setThresholds((prev) => ({ ...prev, flowRate: value[0] }))}
                    max={500}
                    min={100}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400 font-space-mono">
                    <span>100 m³/s</span>
                    <span>500 m³/s</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-white font-medium">Temperature</Label>
                    <Badge className="bg-neon-teal/20 text-neon-teal border-neon-teal/30">
                      {thresholds.temperature}°C
                    </Badge>
                  </div>
                  <Slider
                    value={[thresholds.temperature]}
                    onValueChange={(value) => setThresholds((prev) => ({ ...prev, temperature: value[0] }))}
                    max={20}
                    min={-10}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400 font-space-mono">
                    <span>-10°C</span>
                    <span>20°C</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-white font-medium">Atmospheric Pressure</Label>
                    <Badge className="bg-neon-teal/20 text-neon-teal border-neon-teal/30">
                      {thresholds.pressure} hPa
                    </Badge>
                  </div>
                  <Slider
                    value={[thresholds.pressure]}
                    onValueChange={(value) => setThresholds((prev) => ({ ...prev, pressure: value[0] }))}
                    max={1100}
                    min={900}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400 font-space-mono">
                    <span>900 hPa</span>
                    <span>1100 hPa</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="terminal-card border-neon-teal/20">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-neon-teal font-space-mono flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  NOTIFICATION PREFERENCES
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-carbon-gray/50 rounded-lg border border-neon-teal/10">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-neon-teal" />
                    <div>
                      <p className="text-white font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-400">Receive alerts via email</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-carbon-gray/50 rounded-lg border border-neon-teal/10">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-5 w-5 text-neon-teal" />
                    <div>
                      <p className="text-white font-medium">SMS Notifications</p>
                      <p className="text-sm text-gray-400">Receive critical alerts via SMS</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, sms: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-carbon-gray/50 rounded-lg border border-neon-teal/10">
                  <div className="flex items-center space-x-3">
                    <Bell className="h-5 w-5 text-neon-teal" />
                    <div>
                      <p className="text-white font-medium">Push Notifications</p>
                      <p className="text-sm text-gray-400">Browser push notifications</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-carbon-gray/50 rounded-lg border border-neon-teal/10">
                  <div className="flex items-center space-x-3">
                    <SettingsIcon className="h-5 w-5 text-neon-teal" />
                    <div>
                      <p className="text-white font-medium">Desktop Notifications</p>
                      <p className="text-sm text-gray-400">System desktop notifications</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.desktop}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, desktop: checked }))}
                  />
                </div>

                <div className="mt-6 p-4 bg-rocket-red/10 border border-rocket-red/30 rounded-lg">
                  <p className="text-rocket-red text-sm font-semibold mb-2">Critical Alert Settings</p>
                  <p className="text-gray-300 text-sm">
                    Critical alerts will always be sent via all enabled channels regardless of individual preferences.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Advanced Settings */}
          <Card className="terminal-card border-neon-teal/20">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-neon-teal font-space-mono">
                ADVANCED CONFIGURATION
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="text-white font-medium">Data Refresh Interval</Label>
                  <Input type="number" defaultValue="30" className="bg-carbon-gray border-neon-teal/30 text-white" />
                  <p className="text-xs text-gray-400">Seconds between data updates</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-white font-medium">Alert Cooldown</Label>
                  <Input type="number" defaultValue="300" className="bg-carbon-gray border-neon-teal/30 text-white" />
                  <p className="text-xs text-gray-400">Seconds between duplicate alerts</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-white font-medium">Map Zoom Level</Label>
                  <Input type="number" defaultValue="12" className="bg-carbon-gray border-neon-teal/30 text-white" />
                  <p className="text-xs text-gray-400">Default map zoom (1-20)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  )
}
