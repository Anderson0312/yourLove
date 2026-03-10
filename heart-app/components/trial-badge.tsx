"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { formatRemainingTime, formatRemainingTimeShort, getRemainingTrialTime } from "@/utils/trial-utils"
import { getRegistrationData } from "@/services/api"
import { Button } from "./ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover"

export function TrialBadge() {
  const router = useRouter()
  const params = useParams()
  const userId = Array.isArray(params.id) ? params.id[0] : params.id
  const [remaining, setRemaining] = useState<{ hours: number; minutes: number } | null>(null)
  const [showBadge, setShowBadge] = useState(false)

  useEffect(() => {
    if (!userId) return

    const checkFreeTrial = async () => {
      try {
        const response = await getRegistrationData(userId)
        const planTypeUser = response?.payment

        if (planTypeUser === "free-trial") {
          setShowBadge(true)
          const remainingTime = getRemainingTrialTime(response?.trialStartDate)
          setRemaining(remainingTime)

          const interval = setInterval(() => {
            const newRemaining = getRemainingTrialTime(response?.trialStartDate)
            setRemaining(newRemaining)
          }, 60000)

          return () => clearInterval(interval)
        }
      } catch (error) {
        console.error("Erro ao checar plano do usuário:", error)
      }
    }

    checkFreeTrial()
  }, [userId])

  if (!showBadge || !remaining) {
    return null
  }

  const formattedTime = formatRemainingTime(remaining)
  const shortTime = formatRemainingTimeShort(remaining)

  return (
    <div className="fixed top-4 right-4 z-50">
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white text-xs font-medium hover:bg-black/60 transition-colors"
            aria-label="Período de teste ativo"
          >
            <Clock className="h-3.5 w-3.5 text-amber-400" />
            <span>Teste</span>
            <span className="text-amber-400">{shortTime}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-64 bg-black/95 border-white/20 text-white">
          <div className="space-y-3">
            <p className="text-sm text-gray-300">
              Período de teste: <span className="font-semibold text-white">{formattedTime}</span> restantes
            </p>
            <Button
              size="sm"
              onClick={() => router.push("/pricing")}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              Fazer upgrade
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
