"use server"

import { Register } from "@/types/register"
import { sendEmail } from "./email-service"

// Tipos de campanhas disponíveis
export type CampaignType =
  | "welcome"
  | "payment_reminder"
  | "trial_expiring"
  | "feature_announcement"
  | "special_offer"
  | "wedding_tips"

// Interface para configuração de campanha
export interface CampaignConfig {
  id: CampaignType
  name: string
  subject: string
  description: string
  template: string
}

// Campanhas disponíveis - ensure this is exported as an array
export async function getAvailableCampaigns(): Promise<CampaignConfig[]> { 
  return [
  {
    id: "welcome",
    name: "Boas-vindas",
    subject: "Bem-vindo ao OurLovee!",
    description: "Email de boas-vindas para novos usuários",
    template: `Olá {names},

Seja bem-vindo ao OurLovee! Estamos muito felizes em ajudar vocês a criar um site especial para o seu Casal.

Para começar, acesse seu painel em https://ourlovee.com/dashboard e complete as etapas de configuração.

Se precisar de ajuda, estamos à disposição.

Atenciosamente,
Equipe OurLovee`,
  },
  {
    id: "payment_reminder",
    name: "Lembrete de Pagamento",
    subject: "Não perca os benefícios premium do OurLovee",
    description: "Lembrete para usuários que ainda não realizaram o pagamento",
    template: `Olá {names},

Notamos que você ainda não ativou os recursos premium do seu site de Casal.

Ao fazer o upgrade para a versão premium, você terá acesso a:
- Domínio personalizado
- Remoção de anúncios
- Mais layouts exclusivos
- Suporte prioritário

Acesse https://ourlovee.com/dashboard/payment para aproveitar esta oportunidade.

Atenciosamente,
Equipe OurLovee`,
  },
  {
    id: "trial_expiring",
    name: "Período de Teste Expirando",
    subject: "Seu período de teste está acabando - OurLovee",
    description: "Aviso para usuários cujo período de teste está prestes a expirar",
    template: `Olá {names},

Seu período de teste no OurLovee está prestes a expirar.

Para continuar aproveitando todos os recursos da plataforma, faça o upgrade para a versão premium agora.

Acesse https://ourlovee.com/dashboard/payment para garantir que seu site de casal continue disponível.

Atenciosamente,
Equipe OurLovee`,
  },
  {
    id: "feature_announcement",
    name: "Anúncio de Novos Recursos",
    subject: "Novos recursos disponíveis no OurLovee!",
    description: "Comunicado sobre novos recursos da plataforma",
    template: `Olá {names},

Temos novidades incríveis para o seu site de casal!

Acabamos de lançar novos recursos que tornarão seu site ainda mais especial:
- Galeria de fotos aprimorada
- Novos modelos de layout
- Musicas da sua escolha
- Animações personalizadas 

Acesse https://ourlovee.com/{names} para explorar essas novidades.

Atenciosamente,
Equipe OurLovee`,
  },
  {
    id: "special_offer",
    name: "Oferta Especial",
    subject: "Oferta especial por tempo limitado - OurLovee",
    description: "Promoção especial por tempo limitado",
    template: `Olá {names},

Temos uma oferta especial exclusiva para você!

Por tempo limitado, estamos oferecendo 50% de desconto na assinatura premium do OurLovee.

Use o código OURLOVEE50 ao finalizar seu pagamento em https://ourlovee.com/dashboard/payment

Oferta válida até o final desta semana.

Atenciosamente,
Equipe OurLovee`,
  },
  {
    id: "wedding_tips",
    name: "Dicas para o Casamento",
    subject: "Dicas para tornar seu casamento inesquecível",
    description: "Email com dicas úteis para o planejamento do casamento",
    template: `Olá {names},

Queremos ajudar a tornar seu grande dia ainda mais especial!

Aqui estão algumas dicas para o planejamento do seu casamento:

1. Comece o planejamento com pelo menos 12 meses de antecedência
2. Defina um orçamento claro antes de fazer qualquer contratação
3. Escolha fornecedores confiáveis e peça referências
4. Tenha um "plano B" para eventos ao ar livre
5. Delegue tarefas para familiares e padrinhos

Esperamos que essas dicas sejam úteis! Acesse nosso blog para mais conteúdo: https://ourlovee.com/blog

Atenciosamente,
Equipe OurLovee`,
  },
]
}

// Filtros para segmentação de usuários
export interface CampaignFilters {
  payment?: "paid" | "free-trial" | "all"
  step?: number | "all"
  trialStatus?: "in_trial" | "not_in_trial" | "all"
  daysUntilWedding?: number | null
}

// Função para verificar se um usuário atende aos critérios de filtro
function userMatchesFilters(user: Register, filters: CampaignFilters): boolean {
  // Filtro por status de pagamento
  if (filters.payment && filters.payment !== "all") {
    if (filters.payment === "paid" && user.payment !== "PAGO") return false
    if (filters.payment === "free-trial" && user.payment === "free-trial") return false
  }

  // Filtro por etapa
  if (filters.step && filters.step !== "all") {
    if (typeof filters.step === "number" && user.step !== filters.step) return false
  }

  // Filtro por status de teste
  if (filters.trialStatus && filters.trialStatus !== "all") {
    if (filters.trialStatus === "in_trial" && !user.trialStartDate) return false
    if (filters.trialStatus === "not_in_trial" && user.trialStartDate) return false
  }

  // Filtro por dias até o casamento
  if (filters.daysUntilWedding && user.date) {
    const weddingDate = new Date(user.date)
    const today = new Date()
    const diffTime = weddingDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays > filters.daysUntilWedding) return false
  }

  return true
}

// Função para personalizar o template para um usuário específico
function personalizeTemplate(template: string, user: Register): string {
  return template
    .replace(/{names}/g, user.names || user.username)
    .replace(/{username}/g, user.username)
    .replace(/{wedding_date}/g, user.date ? new Date(user.date).toLocaleDateString() : "data não definida")
}

export async function sendCampaign(
  campaignId: CampaignType,
  filters: CampaignFilters,
  users: Register[],
): Promise<{ success: boolean; sent: number; failed: number; errors: string[] }> {
  const campaigns = await getAvailableCampaigns(); // Agora esperamos a Promise
  const campaign = campaigns.find((c) => c.id === campaignId);
  
  if (!campaign) {
    return { success: false, sent: 0, failed: 0, errors: ["Campanha não encontrada"] }
  }

  // Restante do código permanece igual
  const filteredUsers = users.filter((user) => userMatchesFilters(user, filters));

  let sent = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const user of filteredUsers) {
    try {
      console.log(user)
      const personalizedTemplate = personalizeTemplate(campaign.template, user);
      const emailAddress = user.email;

      const result = await sendEmail({
        to: emailAddress,
        subject: campaign.subject,
        text: personalizedTemplate,
      });

      if (result.success) {
        sent++;
      } else {
        failed++;
        errors.push(`Falha ao enviar para ${user.username}: ${result.error}`);
      }
    } catch (error) {
      failed++;
      errors.push(`Erro ao processar ${user.username}: ${(error as Error).message}`);
    }
  }

  return {
    success: sent > 0,
    sent,
    failed,
    errors,
  };
}

// Correção para getCampaignPreview
export async function getCampaignPreview(
  campaignId: CampaignType, 
  user: Register
): Promise<{ subject: string; text: string } | null> {
  const campaigns = await getAvailableCampaigns();
  const campaign = campaigns.find((c) => c.id === campaignId);
  
  if (!campaign) return null;

  return {
    subject: campaign.subject,
    text: personalizeTemplate(campaign.template, user),
  };
}


// Função para estimar destinatários (agora async)
export async function estimateRecipients(
  filters: CampaignFilters, 
  users: Register[]
): Promise<number> {
  return users.filter((user) => userMatchesFilters(user, filters)).length
}
