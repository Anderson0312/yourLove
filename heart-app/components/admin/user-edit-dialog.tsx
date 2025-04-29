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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import type { Register } from "@/lib/mock-data"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface UserEditDialogProps {
  user: Register
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (user: Register) => void
}

export function UserEditDialog({ user, open, onOpenChange, onSave }: UserEditDialogProps) {
  const [formData, setFormData] = useState<Register>({ ...user })
  const [weddingDate, setWeddingDate] = useState<Date | undefined>(formData.date ? new Date(formData.date) : undefined)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date: Date | undefined) => {
    setWeddingDate(date)
    setFormData((prev) => ({ ...prev, date: date }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-800 ">
        <DialogHeader>
          <DialogTitle>Editar Casal</DialogTitle>
          <DialogDescription>Edite as informações de {formData.names || formData.username}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" value={formData.username} onChange={handleInputChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="names">Nomes do Casal</Label>
              <Input id="names" name="names" value={formData.names || ""} onChange={handleInputChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input id="title" name="title" value={formData.title || ""} onChange={handleInputChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Data do Casamento</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    {weddingDate ? (
                      format(weddingDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                    ) : (
                      <span>Selecione uma data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent mode="single" selected={weddingDate} onSelect={handleDateChange} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="step">Etapa</Label>
              <Select
                value={formData.step.toString()}
                onValueChange={(value) => handleSelectChange("step", value)}
              >

                <SelectTrigger>
                  <SelectValue placeholder="Selecione a etapa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Etapa 1</SelectItem>
                  <SelectItem value="2">Etapa 2</SelectItem>
                  <SelectItem value="3">Etapa 3</SelectItem>
                  <SelectItem value="4">Etapa 4</SelectItem>
                  <SelectItem value="5">Etapa 5</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="layout">Layout</Label>
              <Select value={formData.layout || ""} onValueChange={(value) => handleSelectChange("layout", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="layout1">Layout 1</SelectItem>
                  <SelectItem value="layout2">Layout 2</SelectItem>
                  <SelectItem value="layout3">Layout 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="modelo_carrosel">Modelo Carrossel</Label>
              <Select
                value={formData.modelo_carrosel || ""}
                onValueChange={(value) => handleSelectChange("modelo_carrosel", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o modelo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modelo1">Modelo 1</SelectItem>
                  <SelectItem value="modelo2">Modelo 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="modelo_date">Modelo Data</Label>
              <Select
                value={formData.modelo_date || ""}
                onValueChange={(value) => handleSelectChange("modelo_date", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o modelo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modelo1">Modelo 1</SelectItem>
                  <SelectItem value="modelo2">Modelo 2</SelectItem>
                  <SelectItem value="modelo3">Modelo 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="text">Texto do Convite</Label>
            <Textarea id="text" name="text" value={formData.text || ""} onChange={handleInputChange} rows={5} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="music">Música</Label>
            <Input
              id="music"
              name="music"
              value={formData.music || ""}
              onChange={handleInputChange}
              placeholder="Nome da música"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="musicVideoId">ID do Vídeo</Label>
            <Input
              id="musicVideoId"
              name="musicVideoId"
              value={formData.musicVideoId || ""}
              onChange={handleInputChange}
              placeholder="ID do vídeo no YouTube"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
