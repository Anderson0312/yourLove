"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Lock } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "./buttonv2"
import { getRegistrationData } from "@/services/api"

interface FeatureRestrictionProps {
  feature: "edit" | "qrcode" | "music" | "support" | "layout"
  children: React.ReactNode
}

export function FeatureRestriction({ feature, children }: FeatureRestrictionProps) {
  const router = useRouter()
  const params = useParams();
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [isRestricted, setIsRestricted] = useState(false)

  useEffect(() => {
    if (!userId) return;
  
    const checkFeatureAccess = async () => {
  
      try {
        const response = await getRegistrationData(userId);
        const planTypeUser = response?.payment;
  
        const restrictedFeatures = ["edit", "qrcode", "support", "layout"];
  
        if (
          (planTypeUser === "free-trial") &&
          restrictedFeatures.includes(feature)
        ) {
          setIsRestricted(true);
        } else {
          setIsRestricted(false);
        }
      } catch (error) {
        console.error("Erro ao verificar tipo de plano:", error);
      }
    };
  
    checkFeatureAccess();
  }, [feature, userId]);
  

  if (isRestricted) {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg z-10">
          <Lock className="h-8 w-8 text-white mb-2" />
          <p className="text-white text-center mb-4 px-4">Este recurso está disponível apenas nos planos pagos</p>
          <Button onClick={() => router.push("/pricing")} variant="outline" className="bg-black hover:bg-gray-400">
            Fazer upgrade
          </Button>
        </div>
        <div className="opacity-30 pointer-events-none">{children}</div>
      </div>
    )
  }

  return <>{children}</>
}
