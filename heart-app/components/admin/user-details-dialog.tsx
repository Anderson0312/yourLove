"use client"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ExternalLink, ImageIcon, Music } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Register } from "@/lib/mock-data"

interface UserDetailsDialogProps {
  user: Register
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UserDetailsDialog({ user, open, onOpenChange }: UserDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-800 ">
        <DialogHeader>
          <DialogTitle>Detalhes do Casal</DialogTitle>
          <DialogDescription>Informações completas sobre {user.names || user.username}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="flex-1">
              <h3 className="text-lg font-medium">Informações Básicas</h3>
              <Separator className="my-2" />

              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-sm font-medium text-muted-foreground">ID:</span>
                  <span className="text-sm col-span-2">{user.id}</span>
                </div>

                <div className="grid grid-cols-3 gap-1">
                  <span className="text-sm font-medium text-muted-foreground">Username:</span>
                  <span className="text-sm col-span-2">{user.username}</span>
                </div>

                <div className="grid grid-cols-3 gap-1">
                  <span className="text-sm font-medium text-muted-foreground">Nomes:</span>
                  <span className="text-sm col-span-2">{user.names || "-"}</span>
                </div>

                <div className="grid grid-cols-3 gap-1">
                  <span className="text-sm font-medium text-muted-foreground">Título:</span>
                  <span className="text-sm col-span-2">{user.title || "-"}</span>
                </div>

                <div className="grid grid-cols-3 gap-1">
                  <span className="text-sm font-medium text-muted-foreground">Data de Criação:</span>
                  <span className="text-sm col-span-2">
                    {format(new Date(user.created_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1">
                  <span className="text-sm font-medium text-muted-foreground">Data do Casamento:</span>
                  <span className="text-sm col-span-2">
                    {user.date ? format(new Date(user.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : "-"}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1">
                  <span className="text-sm font-medium text-muted-foreground">Etapa:</span>
                  <span className="text-sm col-span-2">
                    <Badge variant="outline">{user.step}/5</Badge>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-medium">Status e Pagamento</h3>
              <Separator className="my-2" />

              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-sm font-medium text-muted-foreground">Status:</span>
                  <span className="text-sm col-span-2">
                    {user.payment === "paid" ? (
                      <Badge className="bg-green-500">Pago</Badge>
                    ) : user.trialStartDate ? (
                      <Badge variant="outline">Teste</Badge>
                    ) : (
                      <Badge variant="secondary">Pendente</Badge>
                    )}
                  </span>
                </div>

                {user.trialStartDate && (
                  <div className="grid grid-cols-3 gap-1">
                    <span className="text-sm font-medium text-muted-foreground">Início do Teste:</span>
                    <span className="text-sm col-span-2">{format(new Date(user.trialStartDate), "dd/MM/yyyy")}</span>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-1">
                  <span className="text-sm font-medium text-muted-foreground">Layout:</span>
                  <span className="text-sm col-span-2">{user.layout || "-"}</span>
                </div>

                <div className="grid grid-cols-3 gap-1">
                  <span className="text-sm font-medium text-muted-foreground">Modelo Carrossel:</span>
                  <span className="text-sm col-span-2">{user.modelo_carrosel || "-"}</span>
                </div>

                <div className="grid grid-cols-3 gap-1">
                  <span className="text-sm font-medium text-muted-foreground">Modelo Data:</span>
                  <span className="text-sm col-span-2">{user.modelo_date || "-"}</span>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="content" className="mt-4">
            <TabsList>
              <TabsTrigger value="content">Conteúdo</TabsTrigger>
              <TabsTrigger value="photos">Fotos</TabsTrigger>
              <TabsTrigger value="music">Música</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="mt-2">
              <div className="rounded-md border p-4">
                <h4 className="font-medium mb-2">Texto do Convite</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {user.text || "Nenhum texto definido."}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="photos" className="mt-2">
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Fotos ({user.photoPaths.length})</h4>
                </div>

                {user.photoPaths.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Nenhuma foto adicionada.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {user.photoPaths.map((path, index) => (
                      <div key={index} className="aspect-square rounded-md bg-muted flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        <span className="sr-only">Foto {index + 1}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="music" className="mt-2">
              <div className="rounded-md border p-4">
                {user.music ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      {user.musicThumbnail && (
                        <div className="w-16 h-16 rounded-md bg-muted flex items-center justify-center">
                          <Music className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                      <div>
                        <h4 className="font-medium">{user.music}</h4>
                        {user.musicVideoId && <p className="text-sm text-muted-foreground">ID: {user.musicVideoId}</p>}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Music className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Nenhuma música selecionada.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="flex-1" asChild>
            <a href={`https://ourlovee.com/${user.username}`} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Visualizar Site
            </a>
          </Button>
          <Button className="flex-1" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
