"use server"

import { Register } from "@/types/register"
import { createTransport } from "nodemailer"
import { api } from "./api"

// Configuração do transporter usando as variáveis de ambiente
const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

// Interface para os dados do email
export interface EmailData {
  to: string
  subject: string
  text: string
  html?: string
}

// Templates de email (removido o export)
const emailTemplates = {
  welcome: (user: Register) => ({
    subject: "Bem-vindo ao OurLovee!",
    text: `Olá ${user.names || user.username},

Seja bem-vindo ao OurLovee! Estamos muito felizes em ajudar vocês a criar um site especial para o seu casamento.

Para começar, acesse seu painel em https://ourlovee.com/dashboard e complete as etapas de configuração.

Se precisar de ajuda, estamos à disposição.

Atenciosamente,
Equipe OurLovee`,
  }),

  payment: (user: Register) => ({
    subject: "Confirmação de Pagamento - OurLovee",
    text: `Olá ${user.names || user.username},

Recebemos seu pagamento com sucesso! Seu site de casamento agora está ativo permanentemente.

Aproveite todos os recursos premium e personalize seu site como desejar.

Atenciosamente,
Equipe OurLovee`,
  }),

  reminder: (user: Register) => ({
    subject: "Complete seu site de casamento - OurLovee",
    text: `Olá ${user.names || user.username},

Notamos que você ainda não completou a configuração do seu site de casamento.

Faltam apenas algumas etapas para que seu site fique perfeito! Acesse https://ourlovee.com/dashboard para continuar.

Precisa de ajuda? Estamos à disposição.

Atenciosamente,
Equipe OurLovee`,
  }),
  
  campaign: (user: Register) => ({
    subject: "Presente especial para vocês! 🎁 50% OFF no OurLovee",
    text: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #ff6b6b;">Olá ${user.names},</h2>
  
  <p>Temos uma surpresa especial para vocês! Como membros da nossa comunidade, 
  queremos oferecer um desconto exclusivo:</p>
  
  <div style="background: #fff4f4; border-left: 4px solid #ff6b6b; padding: 12px; margin: 20px 0;">
    <p style="font-size: 24px; font-weight: bold; color: #ff6b6b; text-align: center; margin: 0;">
      Use o cupom: <span style="color: #d63031;">OURLOVEE50</span><br>
      para ganhar 50% OFF
    </p>
  </div>
  
  <p>É a oportunidade perfeita para criar ou melhorar seu site de casal 
  com todos os recursos premium pela metade do preço.</p>
  
  <p style="text-align: center; margin: 20px 0;">
  <span style="font-size: 16px; background-color: #ff6b6b; color: #ffffff;
               padding: 12px 24px; border-radius: 4px; display: inline-block;
               font-weight: bold;">
    Acesse nosso site:
  </span><br><br>
  <span style="display: inline-block; font-size: 16px; color: #007bff; 
               text-decoration: underline; word-break: break-word;">
    https://ourlovee.vercel.app/pricing
  </span>
</p>



  <p style="font-size: 0.9em; color: #666;">Esta oferta é válida por tempo limitado, então não deixe para depois!</p>

  <p>Qualquer dúvida, estamos à disposição.</p>
  
  <p>Com carinho,<br>
  <strong>Equipe OurLovee</strong></p>
</div>
`}),
}

// Função para enviar email
export async function sendEmail(emailData: EmailData) {
  try {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: emailData.to,
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html || emailData.text.replace(/\n/g, "<br />"),
    }

    const info = await transporter.sendMail(mailOptions)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Erro ao enviar email:", error)
    return { success: false, error: (error as Error).message }
  }
}

// Função para obter um template de email
export async function getEmailTemplate(templateName: string, user: Register) {
  switch (templateName) {
    case "welcome":
      return emailTemplates.welcome(user)
    case "payment":
      return emailTemplates.payment(user)
    case "reminder":
      return emailTemplates.reminder(user)
    case "campaign": // Novo caso para a campanha
      return emailTemplates.campaign(user)
    default:
      return { subject: "", text: "" }
  }
}

// Função para verificar a configuração de email
export async function verifyEmailConfig() {
  try {
    await transporter.verify()
    return { success: true }
  } catch (error) {
    console.error("Erro na verificação da configuração de email:", error)
    return { success: false, error: (error as Error).message }
  }
}

