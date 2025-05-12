"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Register } from "@/types/register"
import { CampaignType, getCampaignPreview } from "@/lib/campaing-service"


// Define the campaigns directly in the client component to avoid "use server" import issues
const availableCampaigns = [
  {
    id: "welcome",
    name: "Boas-vindas",
    subject: "Bem-vindo ao OurLovee!",
    description: "Email de boas-vindas para novos usuários",
    template: `Olá {names}, Seja bem-vindo ao OurLovee!...`,
  },
  {
    id: "payment_reminder",
    name: "Lembrete de Pagamento",
    subject: "Não perca os benefícios premium do OurLovee",
    description: "Lembrete para usuários que ainda não realizaram o pagamento",
    template: `Olá {names}, Notamos que você ainda não ativou...`,
  },
  {
    id: "trial_expiring",
    name: "Período de Teste Expirando",
    subject: "Seu período de teste está acabando - OurLovee",
    description: "Aviso para usuários cujo período de teste está prestes a expirar",
    template: `Olá {names}, Seu período de teste no OurLovee...`,
  },
  {
    id: "feature_announcement",
    name: "Anúncio de Novos Recursos",
    subject: "Novos recursos disponíveis no OurLovee!",
    description: "Comunicado sobre novos recursos da plataforma",
    template: `Olá {names}, Temos novidades incríveis...`,
  },
  {
    id: "special_offer",
    name: "Oferta Especial",
    subject: "Oferta especial por tempo limitado - OurLovee",
    description: "Promoção especial por tempo limitado",
    template: `Olá {names}, Temos uma oferta especial...`,
  },
  {
    id: "wedding_tips",
    name: "Dicas para o Casamento",
    subject: "Dicas para tornar seu casamento inesquecível",
    description: "Email com dicas úteis para o planejamento do casamento",
    template: `Olá {names}, Queremos ajudar a tornar seu grande dia...`,
  },
]

// Helper function to personalize template
function personalizeTemplate(template: string, user: Register): string {
  return template
    .replace(/{names}/g, user.names || user.username)
    .replace(/{username}/g, user.username)
    .replace(/{wedding_date}/g, user.date ? new Date(user.date).toLocaleDateString() : "data não definida")
}

interface CampaignPreviewDialogProps {
  campaignId: CampaignType | null
  previewUser: Register | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CampaignPreviewDialog({ campaignId, previewUser, open, onOpenChange }: CampaignPreviewDialogProps) {
  const [preview, setPreview] = useState<{ subject: string; text: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (open && campaignId && previewUser) {
      try {
        setLoading(true)
        setError(null)

        // Get campaign from local array instead of server function
        const campaign = availableCampaigns.find((c) => c.id === campaignId)

        if (campaign) {
          setPreview({
            subject: campaign.subject,
            text: personalizeTemplate(campaign.template, previewUser),
          })
        } else {
          // Fallback to server function if not found locally
          const previewData = getCampaignPreview(campaignId, previewUser)
          setPreview(previewData)
        }
      } catch (err) {
        setError(`Erro ao gerar prévia: ${(err as Error).message}`)
        console.error("Erro na prévia da campanha:", err)
      } finally {
        setLoading(false)
      }
    } else {
      setPreview(null)
      setError(null)
    }
  }, [open, campaignId, previewUser])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Prévia da Campanha</DialogTitle>
          <DialogDescription>
            Visualize como a campanha aparecerá para {previewUser?.names || previewUser?.username || "o usuário"}
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="p-4 text-red-500 bg-red-50 rounded-md">{error}</div>
        ) : preview ? (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Assunto</Label>
              <div className="rounded-md border p-3 bg-muted/30">{preview.subject}</div>
            </div>

            <div className="space-y-2">
              <Label>Conteúdo</Label>
              <ScrollArea className="h-[300px] rounded-md border p-4 bg-muted/30">
                <div className="whitespace-pre-line">{preview.text}</div>
              </ScrollArea>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center text-muted-foreground">
            Selecione uma campanha e um usuário para visualizar a prévia.
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
