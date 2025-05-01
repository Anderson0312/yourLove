import { EmailData, sendEmail } from "@/lib/email-service"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { to, subject, text, html } = data as EmailData

    if (!to || !subject || !text) {
      return NextResponse.json(
        { success: false, error: "Campos obrigatórios: destinatário, assunto e mensagem" },
        { status: 400 },
      )
    }

    const result = await sendEmail({ to, subject, text, html })

    if (result.success) {
      return NextResponse.json({ success: true, messageId: result.messageId })
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error("Erro ao processar requisição de email:", error)
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 })
  }
}
