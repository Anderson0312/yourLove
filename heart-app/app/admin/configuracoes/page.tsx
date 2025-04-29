"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import type React from "react"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

export default function Configuracoes() {
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.ourlovee.com",
    smtpPort: "587",
    smtpUser: "admin@ourlovee.com",
    smtpPassword: "••••••••••••",
    senderName: "OurLovee",
    senderEmail: "noreply@ourlovee.com",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    newRegistration: true,
    paymentReceived: true,
    trialExpiring: true,
    dailySummary: false,
  })

  const handleEmailSettingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEmailSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationToggle = (setting: string, value: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [setting]: value }))
  }

  const handleSaveSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "Suas configurações foram atualizadas com sucesso.",
    })
  }

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">Gerencie as configurações da plataforma OurLovee.</p>
      </div>

      <Tabs defaultValue="email" className="space-y-4">
        <TabsList>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="account">Conta</TabsTrigger>
        </TabsList>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Email</CardTitle>
              <CardDescription>Configure o servidor SMTP para envio de emails.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpServer">Servidor SMTP</Label>
                  <Input
                    id="smtpServer"
                    name="smtpServer"
                    value={emailSettings.smtpServer}
                    onChange={handleEmailSettingChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">Porta SMTP</Label>
                  <Input
                    id="smtpPort"
                    name="smtpPort"
                    value={emailSettings.smtpPort}
                    onChange={handleEmailSettingChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpUser">Usuário SMTP</Label>
                  <Input
                    id="smtpUser"
                    name="smtpUser"
                    value={emailSettings.smtpUser}
                    onChange={handleEmailSettingChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">Senha SMTP</Label>
                  <Input
                    id="smtpPassword"
                    name="smtpPassword"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={handleEmailSettingChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senderName">Nome do Remetente</Label>
                  <Input
                    id="senderName"
                    name="senderName"
                    value={emailSettings.senderName}
                    onChange={handleEmailSettingChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senderEmail">Email do Remetente</Label>
                  <Input
                    id="senderEmail"
                    name="senderEmail"
                    value={emailSettings.senderEmail}
                    onChange={handleEmailSettingChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Salvar Configurações</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
              <CardDescription>Gerencie quais notificações você deseja receber.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="newRegistration">Novos Cadastros</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações quando um novo casal se cadastrar.
                    </p>
                  </div>
                  <Switch
                    id="newRegistration"
                    checked={notificationSettings.newRegistration}
                    onCheckedChange={(checked) => handleNotificationToggle("newRegistration", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="paymentReceived">Pagamentos Recebidos</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações quando um pagamento for processado.
                    </p>
                  </div>
                  <Switch
                    id="paymentReceived"
                    checked={notificationSettings.paymentReceived}
                    onCheckedChange={(checked) => handleNotificationToggle("paymentReceived", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="trialExpiring">Períodos de Teste Expirando</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações quando um período de teste estiver prestes a expirar.
                    </p>
                  </div>
                  <Switch
                    id="trialExpiring"
                    checked={notificationSettings.trialExpiring}
                    onCheckedChange={(checked) => handleNotificationToggle("trialExpiring", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dailySummary">Resumo Diário</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba um resumo diário com as atividades da plataforma.
                    </p>
                  </div>
                  <Switch
                    id="dailySummary"
                    checked={notificationSettings.dailySummary}
                    onCheckedChange={(checked) => handleNotificationToggle("dailySummary", checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Salvar Configurações</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>Gerencie as configurações de segurança da plataforma.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Autenticação de Dois Fatores</Label>
                    <p className="text-sm text-muted-foreground">
                      Exigir autenticação de dois fatores para administradores.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Tempo Limite da Sessão (minutos)</Label>
                  <Input id="sessionTimeout" defaultValue="30" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passwordPolicy">Política de Senhas</Label>
                  <Select defaultValue="strong">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma política" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Básica (mínimo 8 caracteres)</SelectItem>
                      <SelectItem value="medium">Média (letras e números)</SelectItem>
                      <SelectItem value="strong">Forte (letras, números e caracteres especiais)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Salvar Configurações</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Configurações da Conta</CardTitle>
              <CardDescription>Gerencie as configurações da sua conta de administrador.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="adminName">Nome</Label>
                  <Input id="adminName" defaultValue="Administrador" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Email</Label>
                  <Input id="adminEmail" defaultValue="admin@ourlovee.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentPassword">Senha Atual</Label>
                <Input id="currentPassword" type="password" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nova Senha</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Atualizar Conta</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
