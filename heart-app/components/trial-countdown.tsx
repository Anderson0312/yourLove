"use client"

import { useEffect, useState } from "react"

import { Card, CardContent } from "@/components/card"
import { Clock } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { getRemainingTrialTime } from "@/utils/trial-utils"
import { Button } from "./buttonv2"
import { getRegistrationData } from "@/services/api"

export function TrialCountdown() {
  const router = useRouter()
  const params = useParams();
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [remaining, setRemaining] = useState<{ hours: number; minutes: number } | null>(null)
  const [showCountdown, setShowCountdown] = useState(false)

  useEffect(() => {
    if (!userId) return;
  
    const checkPlanType = async () => {
      try {
        const response = await getRegistrationData(userId);
        const planTypeUser = response?.payment;
  
        if (planTypeUser === "free-trial") {
          setShowCountdown(true);
          setRemaining(getRemainingTrialTime());
  
          const interval = setInterval(() => {
            const newRemaining = getRemainingTrialTime();
            setRemaining(newRemaining);
          }, 60000); // a cada minuto
  
          return () => clearInterval(interval);
        }
      } catch (error) {
        console.error("Erro ao verificar tipo de plano:", error);
      }
    };
  
    checkPlanType();
  }, [userId]);
  

  if (!showCountdown || !remaining) {
    return null
  }

  // Format the time remaining
  const formattedTime =
    remaining.hours > 0 ? `${remaining.hours}h ${remaining.minutes}m` : `${remaining.minutes} minutos`

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
