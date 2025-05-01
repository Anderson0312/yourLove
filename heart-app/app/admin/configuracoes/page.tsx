"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { verifyEmailConfig } from "@/lib/email-service"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import toast from "react-hot-toast"

export default function Configuracoes() {
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.gmail.com",
    smtpPort: "587",
    smtpUser: process.env.GMAIL_USER || "",
    smtpPassword: "••••••••••••",
    senderName: "OurLovee",
    senderEmail: process.env.GMAIL_USER || "",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    newRegistration: true,
    paymentReceived: true,
    trialExpiring: true,
    dailySummary: false,
  })

  const [emailConfigStatus, setEmailConfigStatus] = useState<"loading" | "success" | "error" | null>(null)
  const [testEmailLoading, setTestEmailLoading] = useState(false)

  useEffect(() => {
    const checkEmailConfig = async () => {
      setEmailConfigStatus("loading")
      try {
        const result = await verifyEmailConfig()
        setEmailConfigStatus(result.success ? "success" : "error")
      } catch (error) {
        setEmailConfigStatus("error")
      }
    }

    checkEmailConfig()
  }, [])

  const handleEmailSettingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEmailSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationToggle = (setting: string, value: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [setting]: value }))
  }

  const handleSaveSettings = () => {
    toast.success(`Suas configurações foram atualizadas com sucesso.`);
  }

  const handleTestEmail = async () => {
    setTestEmailLoading(true)

    const toastId = toast.loading("Enviando...");
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: emailSettings.smtpUser,
          subject: "Teste de Configuração de Email - OurLovee",
          text: "Este é um email de teste para verificar a configuração do serviço de email da plataforma OurLovee.",
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success(`Email de teste enviado para ${emailSettings.smtpUser}`, { id: toastId });
      } else {
        toast.error(`Ocorreu um erro ao enviar o e-mail. ${data.error}`, { id: toastId });
      }
    } catch (error) {
      
      toast.error(`Ocorreu um erro ao enviar o e-mail. ${error}`, { id: toastId });
    } finally {
      setTestEmailLoading(false)
    }
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
              {emailConfigStatus === "success" && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">Configuração de email verificada</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Sua configuração de email está funcionando corretamente.
                  </AlertDescription>
                </Alert>
              )}

              {emailConfigStatus === "error" && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Erro na configuração de email</AlertTitle>
                  <AlertDescription>
                    Há um problema com sua configuração de email. Verifique as credenciais e configurações.
                  </AlertDescription>
                </Alert>
              )}

              {emailConfigStatus === "loading" && (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  <span className="ml-2">Verificando configuração de email...</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpServer">Servidor SMTP</Label>
                  <Input
                    id="smtpServer"
                    name="smtpServer"
                    value={emailSettings.smtpServer}
                    onChange={handleEmailSettingChange}
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">Usando Gmail como serviço de email</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">Porta SMTP</Label>
                  <Input
                    id="smtpPort"
                    name="smtpPort"
                    value={emailSettings.smtpPort}
                    onChange={handleEmailSettingChange}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpUser">Usuário SMTP (Email do Gmail)</Label>
                  <Input
                    id="smtpUser"
                    name="smtpUser"
                    value={emailSettings.smtpUser}
                    onChange={handleEmailSettingChange}
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">Configurado via variável de ambiente GMAIL_USER</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">Senha de App do Gmail</Label>
                  <Input
                    id="smtpPassword"
                    name="smtpPassword"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={handleEmailSettingChange}
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">
                    Configurado via variável de ambiente GMAIL_APP_PASSWORD
                  </p>
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
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">Mesmo que o usuário SMTP</p>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  onClick={handleTestEmail}
                  disabled={testEmailLoading || emailConfigStatus !== "success"}
                  variant="outline"
                >
                  {testEmailLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando email de teste...
                    </>
                  ) : (
                    "Enviar email de teste"
                  )}
                </Button>
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
                  <Input id="adminEmail" defaultValue={emailSettings.smtpUser || "admin@ourlovee.com"} />
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
