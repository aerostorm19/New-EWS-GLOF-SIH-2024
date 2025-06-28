"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Spinner } from "@/components/common/spinner"

export default function HomePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login")
      } else {
        // Redirect based on role
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
          default:
            router.push("/login")
        }
      }
    }
  }, [user, isLoading, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-space-black">
      <Spinner size="lg" />
    </div>
  )
}
