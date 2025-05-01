"use client"

import type React from "react"

import { useState } from "react"

import { Button } from "@/components/ui/button"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getEmailTemplate } from "@/lib/email-service"
import { Loader2 } from "lucide-react"
import { Register } from "@/types/register"
import toast from "react-hot-toast"

interface SendEmailDialogProps {
  user: Register
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SendEmailDialog({ user, open, onOpenChange }: SendEmailDialogProps) {
  const [subject, setSubject] = useState("")
  const [template, setTemplate] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [emailAddress, setEmailAddress] = useState(user.email || '')

  const handleTemplateChange = async (value: string) => {
    setTemplate(value)
    if (value === "custom") {
      setSubject("")
      setMessage("")
      return
    }

    try {
      const templateData = await getEmailTemplate(value, user)
      setSubject(templateData.subject)
      setMessage(templateData.text)
    } catch (error) {     
      toast.error(`Error loading template ${error}`);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const toastId = toast.loading("Enviando...");
    
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: emailAddress,
          subject,
          text: message,
        }),
      })

      const data = await response.json()

      if (data.success) {
        
        toast.success(`E-mail enviado com sucesso para ${emailAddress}`, { id: toastId });
        onOpenChange(false)
      } else {
        toast.error(`Ocorreu um erro ao enviar o e-mail. ${data.error}`, { id: toastId });
      }
    } catch (error) {    
      toast.error(`Ocorreu um erro ao enviar o e-mail. ${error}`, { id: toastId });
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white dark:bg-slate-800">
        <DialogHeader>
          <DialogTitle>Enviar E-mail</DialogTitle>
          <DialogDescription>Envie um e-mail para {user.names || user.username}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Destinatário</Label>
            <Input
              id="recipient"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              placeholder="email@exemplo.com"
              required
            />
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
                <SelectItem value="campaign">Campanha Promocional (50% OFF)</SelectItem>
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
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar E-mail"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
