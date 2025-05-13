"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { AlertCircle, Badge, CheckCircle, Loader2, Mail, Users } from "lucide-react"

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
import { Separator } from "@/components/ui/separator"
import { CampaignConfirmDialog } from "@/components/admin/campaing-confirm-dialog"
import { CampaignPreviewDialog } from "@/components/admin/campaign-preview-dialog"
import { CampaignFilters, CampaignType, estimateRecipients, sendCampaign } from "@/lib/campaing-service"
import { Progress } from "@/components/ui/progress"
import { mockRegistrations } from "@/lib/mock-data"
import { Register } from "@/types/register"
import { api } from "@/lib/api"


const availableCampaigns = [
  {
    id: "welcome",
    name: "Boas-vindas",
    subject: "Bem-vindo ao OurLovee!",
    description: "Email de boas-vindas para novos usuários",
    template: `Olá {names}, Seja bem-vindo ao OurLovee!...`
  },
  {
    id: "payment_reminder",
    name: "Lembrete de Pagamento",
    subject: "Não perca os benefícios premium do OurLovee",
    description: "Lembrete para usuários que ainda não realizaram o pagamento",
    template: `Olá {names}, Notamos que você ainda não ativou...`
  },
  {
    id: "trial_expiring",
    name: "Período de Teste Expirando",
    subject: "Seu período de teste está acabando - OurLovee",
    description: "Aviso para usuários cujo período de teste está prestes a expirar",
    template: `Olá {names}, Seu período de teste no OurLovee...`
  },
  {
    id: "feature_announcement",
    name: "Anúncio de Novos Recursos",
    subject: "Novos recursos disponíveis no OurLovee!",
    description: "Comunicado sobre novos recursos da plataforma",
    template: `Olá {names}, Temos novidades incríveis...`
  },
  {
    id: "special_offer",
    name: "Oferta Especial",
    subject: "Oferta especial por tempo limitado - OurLovee",
    description: "Promoção especial por tempo limitado",
    template: `Olá {names}, Temos uma oferta especial...`
  },
  {
    id: "wedding_tips",
    name: "Dicas para o Casamento",
    subject: "Dicas para tornar seu casamento inesquecível",
    description: "Email com dicas úteis para o planejamento do casamento",
    template: `Olá {names}, Queremos ajudar a tornar seu grande dia...`
  }
]

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
  const [campaignFilters, setCampaignFilters] = useState<CampaignFilters>({
    paymentStatus: "all",
    step: "all",
    trialStatus: "all",
    daysUntilWedding: null,
  })
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignType | null>(null)
  const [recipientCount, setRecipientCount] = useState(0)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [sendingCampaign, setSendingCampaign] = useState(false)
  const [sendProgress, setSendProgress] = useState(0)
  const [campaignResult, setCampaignResult] = useState<{
    success: boolean
    sent: number
    failed: number
    errors: string[]
  } | null>(null)

  // Estado para armazenar os registros da API
  const [registrations, setRegistrations] = useState<Register[]>([])
  const [loadingRegistrations, setLoadingRegistrations] = useState(true)
  const [registrationsError, setRegistrationsError] = useState<string | null>(null)

  // Buscar registros da API
  useEffect(() => {
    async function fetchRegistrations() {
      try {
        setLoadingRegistrations(true)
        setRegistrationsError(null)
        const data = await api.getAllRegistrations()
        setRegistrations(data)
      } catch (error) {
        console.error("Erro ao buscar registros:", error)
        setRegistrationsError("Não foi possível carregar os registros. Tente novamente mais tarde.")
      } finally {
        setLoadingRegistrations(false)
      }
    }

    fetchRegistrations()
  }, [])

  // Efeito para atualizar a contagem de destinatários quando os filtros mudam
  useEffect(() => {
    if (selectedCampaign) {

      const count = estimateRecipients(campaignFilters, registrations)
      setRecipientCount(count)
    } else {
      setRecipientCount(0)
    }
  }, [selectedCampaign, campaignFilters])

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

  // Função para lidar com o envio da campanha
  const handleSendCampaign = async () => {
    if (!selectedCampaign) return

    setSendingCampaign(true)
    setCampaignResult(null)
    setSendProgress(0)

    try {
      // Simular progresso
      const progressInterval = setInterval(() => {
        setSendProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval)
            return 95
          }
          return prev + 5
        })
      }, 200)

      // Enviar campanha
      const result = await sendCampaign(selectedCampaign, campaignFilters, registrations)

      clearInterval(progressInterval)
      setSendProgress(100)
      setCampaignResult(result)

      if (result.success) {
        // toast({
        //   title: "Campanha enviada com sucesso",
        //   description: `${result.sent} emails enviados, ${result.failed} falhas.`,
        // })
      } else {
        // toast({
        //   title: "Erro ao enviar campanha",
        //   description: `Ocorreram erros durante o envio da campanha.`,
        //   variant: "destructive",
        // })
      }
    } catch (error) {
      // toast({
      //   title: "Erro ao enviar campanha",
      //   description: "Ocorreu um erro ao processar a campanha.",
      //   variant: "destructive",
      // })
    } finally {
      setSendingCampaign(false)
    }
  }

  // Função para resetar o estado da campanha
  const resetCampaignState = () => {
    setSelectedCampaign(null)
    setCampaignFilters({
      paymentStatus: "all",
      step: "all",
      trialStatus: "all",
      daysUntilWedding: null,
    })
    setCampaignResult(null)
    setSendProgress(0)
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
          <TabsTrigger value="campanhas">Campanhas</TabsTrigger>
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

        <TabsContent value="campanhas">
          <Card>
            <CardHeader>
              <CardTitle>Campanhas de Email</CardTitle>
              <CardDescription>Envie campanhas de email para os usuários cadastrados.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {campaignResult && (
                <Alert className={campaignResult.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}>
                  {campaignResult.success ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  <AlertTitle className={campaignResult.success ? "text-green-800" : "text-red-800"}>
                    {campaignResult.success ? "Campanha enviada com sucesso" : "Erro ao enviar campanha"}
                  </AlertTitle>
                  <AlertDescription className={campaignResult.success ? "text-green-700" : "text-red-700"}>
                    {campaignResult.sent} emails enviados, {campaignResult.failed} falhas.
                    {campaignResult.errors.length > 0 && (
                      <div className="mt-2">
                        <details>
                          <summary className="cursor-pointer font-medium">Ver detalhes dos erros</summary>
                          <ul className="mt-2 text-sm list-disc pl-5">
                            {campaignResult.errors.slice(0, 5).map((error, index) => (
                              <li key={index}>{error}</li>
                            ))}
                            {campaignResult.errors.length > 5 && (
                              <li>...e mais {campaignResult.errors.length - 5} erros</li>
                            )}
                          </ul>
                        </details>
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              {sendingCampaign && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Enviando campanha...</span>
                    <span>{sendProgress}%</span>
                  </div>
                  <Progress value={sendProgress} className="h-2" />
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="campaign">Selecione uma Campanha</Label>
                  <Select
                    value={selectedCampaign || ""}
                    onValueChange={(value) => setSelectedCampaign(value as CampaignType)}
                    disabled={sendingCampaign}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma campanha" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.isArray(availableCampaigns) ? (
                        availableCampaigns.map((campaign) => (
                          <SelectItem key={campaign.id} value={campaign.id}>
                            {campaign.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none">Nenhuma campanha disponível</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  {selectedCampaign && (
                    <p className="text-sm text-muted-foreground">
                      {Array.isArray(availableCampaigns)
                        ? availableCampaigns.find((c) => c.id === selectedCampaign)?.description ||
                        "Campanha selecionada"
                        : "Campanha selecionada"}
                    </p>
                  )}
                </div>

                {selectedCampaign && (
                  <>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Filtrar Destinatários</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="paymentStatus">Status de Pagamento</Label>
                          <Select
                            value={campaignFilters.paymentStatus || "all"}
                            onValueChange={(value) =>
                              setCampaignFilters((prev) => ({ ...prev, paymentStatus: value as any }))
                            }
                            disabled={sendingCampaign}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Todos</SelectItem>
                              <SelectItem value="paid">Pagos</SelectItem>
                              <SelectItem value="pending">Pendentes</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="step">Etapa</Label>
                          <Select
                            value={String(campaignFilters.step || "all")}
                            onValueChange={(value) =>
                              setCampaignFilters((prev) => ({ ...prev, step: value === "all" ? "all" : Number(value) }))
                            }
                            disabled={sendingCampaign}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma etapa" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Todas</SelectItem>
                              <SelectItem value="1">Etapa 1</SelectItem>
                              <SelectItem value="2">Etapa 2</SelectItem>
                              <SelectItem value="3">Etapa 3</SelectItem>
                              <SelectItem value="4">Etapa 4</SelectItem>
                              <SelectItem value="5">Etapa 5</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="trialStatus">Status de Teste</Label>
                          <Select
                            value={campaignFilters.trialStatus || "all"}
                            onValueChange={(value) =>
                              setCampaignFilters((prev) => ({ ...prev, trialStatus: value as any }))
                            }
                            disabled={sendingCampaign}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Todos</SelectItem>
                              <SelectItem value="in_trial">Em período de teste</SelectItem>
                              <SelectItem value="not_in_trial">Não está em teste</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="daysUntilWedding">Dias até o Casamento</Label>
                          <Select
                            value={String(campaignFilters.daysUntilWedding || "all")}
                            onValueChange={(value) =>
                              setCampaignFilters((prev) => ({
                                ...prev,
                                daysUntilWedding: value === "all" ? null : Number(value),
                              }))
                            }
                            disabled={sendingCampaign}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um período" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Todos</SelectItem>
                              <SelectItem value="7">Até 7 dias</SelectItem>
                              <SelectItem value="30">Até 30 dias</SelectItem>
                              <SelectItem value="90">Até 90 dias</SelectItem>
                              <SelectItem value="180">Até 180 dias</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-muted/50 p-4 rounded-md">
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-muted-foreground" />
                          <span>Destinatários estimados:</span>
                        </div>
                        <Badge variant="secondary" className="text-base px-3 py-1">
                          {recipientCount}
                        </Badge>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              {selectedCampaign && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setIsPreviewOpen(true)}
                    disabled={sendingCampaign || !selectedCampaign}
                  >
                    Visualizar Prévia
                  </Button>
                  <Button
                    onClick={() => setIsConfirmOpen(true)}
                    disabled={sendingCampaign || recipientCount === 0}
                    className="ml-auto"
                  >
                    {sendingCampaign ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Enviar Campanha
                      </>
                    )}
                  </Button>
                </>
              )}
              {campaignResult && (
                <Button variant="outline" onClick={resetCampaignState} className="ml-2">
                  Nova Campanha
                </Button>
              )}
            </CardFooter>
          </Card>

          {/* Diálogos de prévia e confirmação */}
          <CampaignPreviewDialog
            campaignId={selectedCampaign}
            previewUser={registrations[0]}
            open={isPreviewOpen}
            onOpenChange={setIsPreviewOpen}
          />

          <CampaignConfirmDialog
            campaignId={selectedCampaign}
            filters={campaignFilters}
            recipientCount={recipientCount}
            open={isConfirmOpen}
            onOpenChange={setIsConfirmOpen}
            onConfirm={handleSendCampaign}
          />
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
