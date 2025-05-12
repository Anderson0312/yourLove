"use client"

import { AlertTriangle } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CampaignFilters, CampaignType } from "@/lib/campaing-service"

// Define the campaigns directly in the client component to avoid "use server" import issues
const availableCampaigns = [
  {
    id: "welcome",
    name: "Boas-vindas",
    subject: "Bem-vindo ao OurLovee!",
    description: "Email de boas-vindas para novos usuários",
  },
  {
    id: "payment_reminder",
    name: "Lembrete de Pagamento",
    subject: "Não perca os benefícios premium do OurLovee",
    description: "Lembrete para usuários que ainda não realizaram o pagamento",
  },
  {
    id: "trial_expiring",
    name: "Período de Teste Expirando",
    subject: "Seu período de teste está acabando - OurLovee",
    description: "Aviso para usuários cujo período de teste está prestes a expirar",
  },
  {
    id: "feature_announcement",
    name: "Anúncio de Novos Recursos",
    subject: "Novos recursos disponíveis no OurLovee!",
    description: "Comunicado sobre novos recursos da plataforma",
  },
  {
    id: "special_offer",
    name: "Oferta Especial",
    subject: "Oferta especial por tempo limitado - OurLovee",
    description: "Promoção especial por tempo limitado",
  },
  {
    id: "wedding_tips",
    name: "Dicas para o Casamento",
    subject: "Dicas para tornar seu casamento inesquecível",
    description: "Email com dicas úteis para o planejamento do casamento",
  },
]

interface CampaignConfirmDialogProps {
  campaignId: CampaignType | null
  filters: CampaignFilters
  recipientCount: number
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function CampaignConfirmDialog({
  campaignId,
  filters,
  recipientCount,
  open,
  onOpenChange,
  onConfirm,
}: CampaignConfirmDialogProps) {
  // Get campaign name safely
  const campaignName = (() => {
    if (!campaignId) return ""
    const campaign = availableCampaigns.find((c) => c.id === campaignId)
    return campaign ? campaign.name : campaignId
  })()

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-2 text-amber-600">
            <AlertTriangle className="h-5 w-5" />
            <AlertDialogTitle>Confirmar Envio de Campanha</AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            Você está prestes a enviar a campanha <strong>{campaignName}</strong> para <strong>{recipientCount}</strong>{" "}
            destinatários.
            <br />
            <br />
            <span className="text-sm text-muted-foreground">
              Filtros aplicados:
              <br />
              {filters.paymentStatus && filters.paymentStatus !== "all" && (
                <>
                  • Status de pagamento: {filters.paymentStatus === "paid" ? "Pago" : "Pendente"}
                  <br />
                </>
              )}
              {filters.step && filters.step !== "all" && (
                <>
                  • Etapa: {filters.step}
                  <br />
                </>
              )}
              {filters.trialStatus && filters.trialStatus !== "all" && (
                <>
                  • Status de teste: {filters.trialStatus === "in_trial" ? "Em teste" : "Não está em teste"}
                  <br />
                </>
              )}
              {filters.daysUntilWedding && (
                <>
                  • Dias até o casamento: até {filters.daysUntilWedding} dias
                  <br />
                </>
              )}
            </span>
            <br />
            Esta ação não pode ser desfeita. Deseja continuar?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Confirmar Envio</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
