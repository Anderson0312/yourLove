"use client"

import type React from "react"

import { useState } from "react"
import { Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { Register } from "@/lib/mock-data"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface PaymentStatusDialogProps {
  user: Register
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (user: Register) => void
}

export function PaymentStatusDialog({ user, open, onOpenChange, onSave }: PaymentStatusDialogProps) {
  const [paymentStatus, setPaymentStatus] = useState<string>(user.payment || "pending")
  const [trialDate, setTrialDate] = useState<Date | undefined>(
    user.trialStartDate ? new Date(user.trialStartDate) : undefined,
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const updatedUser = { ...user }

    updatedUser.payment = paymentStatus

    if (paymentStatus === "trial") {
      updatedUser.payment = "pending"
      updatedUser.trialStartDate = trialDate || new Date()
    } else {
      updatedUser.trialStartDate = paymentStatus === "pending" ? undefined : user.trialStartDate
    }

    onSave(updatedUser)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white dark:bg-slate-800 ">
        <DialogHeader>
          <DialogTitle>Status de Pagamento</DialogTitle>
          <DialogDescription>Altere o status de pagamento para {user.names || user.username}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <RadioGroup
            value={paymentStatus === "pending" && user.trialStartDate ? "trial" : paymentStatus}
            onValueChange={setPaymentStatus}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paid" id="paid" />
              <Label htmlFor="paid" className="font-normal cursor-pointer">
                Pago
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="trial" id="trial" />
              <Label htmlFor="trial" className="font-normal cursor-pointer">
                Período de Teste
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pending" id="pending" />
              <Label htmlFor="pending" className="font-normal cursor-pointer">
                Pendente
              </Label>
            </div>
          </RadioGroup>

          {(paymentStatus === "trial" || (paymentStatus === "pending" && user.trialStartDate)) && (
            <div className="space-y-2">
              <Label>Data de Início do Teste</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    {trialDate ? (
                      format(trialDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                    ) : (
                      <span>Selecione uma data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent mode="single" selected={trialDate} onSelect={setTrialDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
