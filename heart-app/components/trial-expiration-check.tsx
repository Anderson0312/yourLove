"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/alert"
import { Button } from "@/components/buttonv2"
import { Clock, AlertTriangle } from "lucide-react"
import { getRemainingTrialTime, isTrialExpired } from "@/utils/trial-utils"
import { getRegistrationData } from "@/services/api"

interface TrialExpirationCheckProps {
  redirectTo?: string
}

export function TrialExpirationCheck({ redirectTo = "/pricing" }: TrialExpirationCheckProps) {
  const router = useRouter()
  const params = useParams();
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [expired, setExpired] = useState(false)
  const [remaining, setRemaining] = useState<{ hours: number; minutes: number } | null>(null)
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    if (!userId) return;
  
    const checkFreeTrial = async () => {  
      try {
        const response = await getRegistrationData(userId);
        const planTypeUser = response?.payment;
  
        if (planTypeUser === "free-trial") {
          const expired = isTrialExpired();
          setExpired(expired);
  
          if (expired) {
            setShowAlert(true);
  
            const timer = setTimeout(() => {
              router.push(redirectTo);
            }, 5000);
  
            return () => clearTimeout(timer);
          } else {
            setRemaining(getRemainingTrialTime());
  
            const interval = setInterval(() => {
              const newRemaining = getRemainingTrialTime();
              setRemaining(newRemaining);
  
              if (isTrialExpired()) {
                setExpired(true);
                setShowAlert(true);
                clearInterval(interval);
  
                setTimeout(() => {
                  router.push(redirectTo);
                }, 5000);
              }
            }, 60000); // a cada minuto
  
            return () => clearInterval(interval);
          }
        }
      } catch (error) {
        console.error("Erro ao checar plano do usuário:", error);
      }
    };
  
    checkFreeTrial();
  }, [userId, router, redirectTo]);
  

  if (!showAlert && !remaining) {
    return null // Not on trial or no need to show anything
  }

  if (expired && showAlert) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Seu período de teste gratuito expirou</AlertTitle>
        <AlertDescription className="flex flex-col gap-2">
          <p>Seu período de teste gratuito de 1 dia expirou. Você será redirecionado para a página de preços.</p>
          <Button variant="outline" onClick={() => router.push(redirectTo)} className="w-fit">
            Escolher um plano
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (remaining && remaining.hours < 3) {
    // Show warning when less than 3 hours remaining
    return (
      <Alert variant="default" className="mb-4 border-amber-500 bg-amber-50 text-amber-800">
        <Clock className="h-4 w-4" />
        <AlertTitle>Seu período de teste gratuito está acabando</AlertTitle>
        <AlertDescription className="flex flex-col gap-2">
          <p>
            {remaining.hours > 0
              ? `Restam ${remaining.hours} horas e ${remaining.minutes} minutos no seu período de teste.`
              : `Restam apenas ${remaining.minutes} minutos no seu período de teste.`}
          </p>
          <Button
            variant="outline"
            onClick={() => router.push("/pricing")}
            className="w-fit border-amber-500 hover:bg-amber-100"
          >
            Fazer upgrade agora
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  return null
}
