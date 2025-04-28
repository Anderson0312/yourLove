"use client"

import type React from "react"

import { useState } from "react"

import { Button } from "@/components/buttonv2"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Register } from "@/lib/mock-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

interface SendEmailDialogProps {
  user: Register
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SendEmailDialog({ user, open, onOpenChange }: SendEmailDialogProps) {
  const [subject, setSubject] = useState("")
  const [template, setTemplate] = useState("")
  const [message, setMessage] = useState("")

  const handleTemplateChange = (value: string) => {
    setTemplate(value)

    switch (value) {
      case "welcome":
        setSubject("Bem-vindo ao OurLovee!")
        setMessage(
          `Olá ${user.names || user.username},\n\nSeja bem-vindo ao OurLovee! Estamos muito felizes em ajudar vocês a criar um site especial para o seu casamento.\n\nPara começar, acesse seu painel em https://ourlovee.com/dashboard e complete as etapas de configuração.\n\nSe precisar de ajuda, estamos à disposição.\n\nAtenciosamente,\nEquipe OurLovee`,
        )
        break
      case "payment":
        setSubject("Confirmação de Pagamento - OurLovee")
        setMessage(
          `Olá ${user.names || user.username},\n\nRecebemos seu pagamento com sucesso! Seu site de casamento agora está ativo permanentemente.\n\nAproveite todos os recursos premium e personalize seu site como desejar.\n\nAtenciosamente,\nEquipe OurLovee`,
        )
        break
      case "reminder":
        setSubject("Complete seu site de casamento - OurLovee")
        setMessage(
          `Olá ${user.names || user.username},\n\nNotamos que você ainda não completou a configuração do seu site de casamento.\n\nFaltam apenas algumas etapas para que seu site fique perfeito! Acesse https://ourlovee.com/dashboard para continuar.\n\nPrecisa de ajuda? Estamos à disposição.\n\nAtenciosamente,\nEquipe OurLovee`,
        )
        break
      default:
        setSubject("")
        setMessage("")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulação de envio de e-mail
    toast({
      title: "E-mail enviado com sucesso",
      description: `E-mail enviado para ${user.username}@example.com`,
    })

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Enviar E-mail</DialogTitle>
          <DialogDescription>Envie um e-mail para {user.names || user.username}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Destinatário</Label>
            <Input id="recipient" value={`${user.username}@example.com`} disabled />
          </div>

          <div className="space-y-2">
            <Label htmlFor="template">Modelo</Label>
            <Select value={template} onValueChange={handleTemplateChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um modelo ou crie uma mensagem personalizada" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="welcome">Boas-vindas</SelectItem>
                <SelectItem value="payment">Confirmação de Pagamento</SelectItem>
                <SelectItem value="reminder">Lembrete de Configuração</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Assunto</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Digite o assunto do e-mail"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Mensagem</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem"
              rows={8}
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Enviar E-mail</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
