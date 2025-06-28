"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "authority" | "geologist"
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth data
    const storedToken = localStorage.getItem("glofzilla_token")
    const storedUser = localStorage.getItem("glofzilla_user")

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock response based on username
      let mockUser: User
      if (username === "admin") {
        mockUser = { id: "u1", name: "Admin User", email: "admin@glofzilla.com", role: "admin" }
      } else if (username === "authority") {
        mockUser = { id: "u2", name: "Authority User", email: "authority@glofzilla.com", role: "authority" }
      } else {
        mockUser = { id: "u3", name: "Geologist User", email: "geo@glofzilla.com", role: "geologist" }
      }

      const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

      setUser(mockUser)
      setToken(mockToken)
      localStorage.setItem("glofzilla_token", mockToken)
      localStorage.setItem("glofzilla_user", JSON.stringify(mockUser))
    } catch (error) {
      throw new Error("Invalid credentials")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("glofzilla_token")
    localStorage.removeItem("glofzilla_user")
  }

  return <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
