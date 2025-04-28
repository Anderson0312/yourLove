
"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/buttonv2"
import { Badge } from "@/components/ui/badge"
import { Calendar, Music, ImageIcon, Layout, Clock, CreditCard, CheckCircle, XCircle } from 'lucide-react'
import { Register } from "@/types/register"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"


interface UserDetailsDialogProps {
  user: Register
  isOpen: boolean
  onClose: () => void
}

export function UserDetailsDialog({ user, isOpen, onClose }: UserDetailsDialogProps) {
  const [loading, setLoading] = useState(false)

  const handleExtendTrial = async () => {
    setLoading(true)
    try {
      // Simulação de API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        title: "Teste estendido com sucesso",
        description: `O período de teste de ${user.username} foi estendido por mais 24 horas.`,
      })
    } catch (error) {
      toast({
        title: "Erro ao estender teste",
        description: "Ocorreu um erro ao tentar estender o período de teste.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChangePlan = async (plan: string) => {
    setLoading(true)
    try {
      // Simulação de API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        title: "Plano alterado com sucesso",
        description: `O plano de ${user.username} foi alterado para ${plan}.`,
      })
    } catch (error) {
      toast({
        title: "Erro ao alterar plano",
        description: "Ocorreu um erro ao tentar alterar o plano.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            Detalhes do Usuário
            <Badge className="ml-2">{user.username}</Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="info" className="mt-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="info">Informações</TabsTrigger>
            <TabsTrigger value="content">Conteúdo</TabsTrigger>
            <TabsTrigger value="payment">Pagamento</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-500">Username</Label>
                <p className="font-medium">{user.username}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Nome</Label>
                <p className="font-medium">{user.names || "-"}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Data de Criação</Label>
                <p className="font-medium">
                  {format(new Date(user.created_at), "PPpp", { locale: ptBR })}
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Progresso</Label>
                <p className="font-medium">Etapa {user.step} de 5</p>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Título</Label>
                <p className="font-medium">{user.title || "-"}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Data Especial</Label>
                <p className="font-medium">
                  {user.date ? format(new Date(user.date), "PPP", { locale: ptBR }) : "-"}
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <Label className="text-sm text-gray-500">Texto</Label>
              <p className="mt-1 text-sm whitespace-pre-wrap border rounded-md p-3 bg-gray-50">
                {user.text || "Nenhum texto adicionado."}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Layout className="h-4 w-4" />
                    Layout
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{user.layout || "Não definido"}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Music className="h-4 w-4" />
                    Música
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {user.music ? (
                    <div className="space-y-2">
                      <p className="font-medium">{user.music}</p>
                      {user.musicThumbnail && (
                        <div className="flex items-center gap-2">
                          <img 
                            src={user.musicThumbnail || "/placeholder.svg"} 
                            alt={user.music} 
                            className="w-12 h-12 rounded object-cover"
                          />
                          <span className="text-xs text-gray-500">ID: {user.musicVideoId || "-"}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p>Nenhuma música selecionada</p>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Fotos ({user.photoPaths.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {user.photoPaths.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2">
                    {user.photoPaths.map((photo, index) => (
                      <div key={index} className="aspect-square rounded-md overflow-hidden bg-gray-100">
                        <img 
                          src={photo || "/placeholder.svg"} 
                          alt={`Foto ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Nenhuma foto adicionada</p>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Modelo de Data
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{user.modelo_date || "Não definido"}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    Modelo de Carrossel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{user.modelo_carrosel || "Não definido"}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Informações de Pagamento
                </CardTitle>
                <CardDescription>
                  Detalhes do plano e status de pagamento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-500">Plano Atual</Label>
                    <p className="font-medium">
                      {user.payment === "free-trial" && "Teste Gratuito"}
                      {user.payment === "annual" && "Plano Anual"}
                      {user.payment === "lifetime" && "Plano Vitalício"}
                      {!user.payment && "Não definido"}
                    </p>
                  </div>
                  
                  {user.payment === "free-trial" && user.trialStartDate && (
                    <div>
                      <Label className="text-sm text-gray-500">Início do Teste</Label>
                      <p className="font-medium">
                        {format(new Date(user.trialStartDate), "PPpp", { locale: ptBR })}
                      </p>
                    </div>
                  )}
                  
                  {user.payment === "free-trial" && user.trialStartDate && (
                    <div className="col-span-2">
                      <Label className="text-sm text-gray-500">Status do Teste</Label>
                      <div className="flex items-center gap-2 mt-1">
                        {new Date().getTime() - new Date(user.trialStartDate).getTime() > 24 * 60 * 60 * 1000 ? (
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <XCircle className="h-3 w-3" />
                            Expirado
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-800 border-green-300">
                            <Clock className="h-3 w-3" />
                            Ativo
                          </Badge>
                        )}
                        <span className="text-sm text-gray-500">
                          {new Date().getTime() - new Date(user.trialStartDate).getTime() > 24 * 60 * 60 * 1000 
                            ? "O período de teste expirou" 
                            : "Tempo restante: " + Math.floor(
                                (24 - (new Date().getTime() - new Date(user.trialStartDate).getTime()) / (60 * 60 * 1000))
                              ) + " horas"
                          }
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Ações de Pagamento</Label>
                  <div className="flex flex-wrap gap-2">
                    {user.payment === "free-trial" && (
                      <Button 
                        variant="outline" 
                        onClick={handleExtendTrial}
                        disabled={loading}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        Estender Teste (24h)
                      </Button>
                    )}
                    
                    <Button 
                      variant="outline" 
                      onClick={() => handleChangePlan("annual")}
                      disabled={loading || user.payment === "annual"}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Definir como Plano Anual
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={() => handleChangePlan("lifetime")}
                      disabled={loading || user.payment === "lifetime"}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Definir como Vitalício
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          <Button>Salvar Alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}