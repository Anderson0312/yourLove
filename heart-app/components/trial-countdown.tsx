"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { formatRemainingTime, getRemainingTrialTime } from "@/utils/trial-utils"
import { getRegistrationData } from "@/services/api"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"


export function TrialCountdown() {
  const router = useRouter()
  const params = useParams()
  const userId = Array.isArray(params.id) ? params.id[0] : params.id
  const [remaining, setRemaining] = useState<{ hours: number; minutes: number } | null>(null)
  const [showCountdown, setShowCountdown] = useState(false)
  const [trialStartDate, setTrialStartDate] = useState<Date | null>(null)

  useEffect(() => {
    if (!userId) return

    const checkFreeTrial = async () => {
      try {
        const response = await getRegistrationData(userId)
        const planTypeUser = response?.payment

        if (planTypeUser === "free-trial") {
          setShowCountdown(true)
          setTrialStartDate(response?.trialStartDate || null)

          // Calcula o tempo restante inicial
          const remainingTime = getRemainingTrialTime(response?.trialStartDate)
          setRemaining(remainingTime)

          // Atualiza o contador a cada minuto
          const interval = setInterval(() => {
            const newRemaining = getRemainingTrialTime(response?.trialStartDate)
            setRemaining(newRemaining)
          }, 60000) // a cada minuto

          return () => clearInterval(interval)
        }
      } catch (error) {
        console.error("Erro ao checar plano do usuário:", error)
      }
    }

    checkFreeTrial()
  }, [userId])

  if (!showCountdown || !remaining) {
    return null
  }

  // Formata o tempo restante
  const formattedTime = formatRemainingTime(remaining)

  return (
    <Card className="mb-4 border-red-200 bg-red-600">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 " />
          <span className="font-medium">
            Período de teste: <span className="text-black">{formattedTime}</span> restantes
          </span>
        </div>
        <Button size="sm" onClick={() => router.push("/pricing")} className="bg-black border hover:bg-red-600 text-white">
          Fazer upgrade
        </Button>
      </CardContent>
    </Card>
  )
}
