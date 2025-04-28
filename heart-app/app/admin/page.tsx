"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar, CreditCard, Filter, Heart, Search, Settings, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/buttonv2"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminDashboardHeader } from "@/components/admin/admin-dashboard-header"
import { mockRegistrations } from "@/lib/mock-data"

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterPayment, setFilterPayment] = useState<string | null>(null)

  // Filter registrations based on search query and payment filter
  const filteredRegistrations = mockRegistrations.filter((registration) => {
    const matchesSearch =
      searchQuery === "" ||
      registration.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (registration.names && registration.names.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesPayment = filterPayment === null || registration.payment === filterPayment

    return matchesSearch && matchesPayment
  })

  // Calculate statistics
  const totalRegistrations = mockRegistrations.length
  const paidRegistrations = mockRegistrations.filter((r) => r.payment === "paid").length
  const trialRegistrations = mockRegistrations.filter((r) => r.trialStartDate).length
  const completedSetups = mockRegistrations.filter((r) => r.step >= 5).length

  return (
      <div className="flex-1">
        <AdminDashboardHeader />

        <main className="flex-1 p-4 md:p-6">
          <div className="flex flex-col gap-4 md:gap-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard OurLovee</h1>
                <p className="text-muted-foreground">Gerencie os sites de casais cadastrados na plataforma.</p>
              </div>
              <Button>
                <Heart className="mr-2 h-4 w-4" />
                Novo Casal
              </Button>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="registrations">Cadastros</TabsTrigger>
                <TabsTrigger value="analytics">Análises</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total de Cadastros</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{totalRegistrations}</div>
                      <p className="text-xs text-muted-foreground">
                        +{Math.floor(totalRegistrations * 0.1)} desde o último mês
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Pagamentos Realizados</CardTitle>
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{paidRegistrations}</div>
                      <p className="text-xs text-muted-foreground">
                        {Math.round((paidRegistrations / totalRegistrations) * 100)}% de conversão
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Em Período de Teste</CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{trialRegistrations}</div>
                      <p className="text-xs text-muted-foreground">
                        {Math.round((trialRegistrations / totalRegistrations) * 100)}% dos cadastros
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Configurações Completas</CardTitle>
                      <Settings className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{completedSetups}</div>
                      <p className="text-xs text-muted-foreground">
                        {Math.round((completedSetups / totalRegistrations) * 100)}% de conclusão
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-full lg:col-span-4">
                    <CardHeader>
                      <CardTitle>Cadastros Recentes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        {mockRegistrations.slice(0, 5).map((registration) => (
                          <div className="flex items-center" key={registration.id}>
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">
                                {registration.names || registration.username}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {registration.date
                                  ? format(new Date(registration.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                                  : "Data não definida"}
                              </p>
                            </div>
                            <div className="ml-auto font-medium">
                              {registration.payment === "paid" ? (
                                <Badge className="bg-green-500">Pago</Badge>
                              ) : registration.trialStartDate ? (
                                <Badge variant="outline">Teste</Badge>
                              ) : (
                                <Badge variant="secondary">Pendente</Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="col-span-full lg:col-span-3">
                    <CardHeader>
                      <CardTitle>Progresso dos Cadastros</CardTitle>
                      <CardDescription>Distribuição dos cadastros por etapa de configuração</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((step) => {
                          const count = mockRegistrations.filter((r) => r.step === step).length
                          const percentage = Math.round((count / totalRegistrations) * 100)

                          return (
                            <div className="flex items-center gap-4" key={step}>
                              <div className="w-full">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium">Etapa {step}</span>
                                  <span className="text-sm text-muted-foreground">{percentage}%</span>
                                </div>
                                <div className="w-full bg-secondary rounded-full h-2.5">
                                  <div
                                    className="bg-primary h-2.5 rounded-full"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="registrations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Todos os Cadastros</CardTitle>
                    <CardDescription>Gerencie todos os casais cadastrados na plataforma OurLovee.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                      <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Buscar por nome ou username..."
                          className="pl-8"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        <Select
                          value={filterPayment || "all"}
                          onValueChange={(value) => setFilterPayment(value === "all" ? null : value)}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filtrar por pagamento" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="paid">Pagos</SelectItem>
                            <SelectItem value="pending">Pendentes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="rounded-md border overflow-hidden">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Usuário</TableHead>
                              <TableHead>Nomes</TableHead>
                              <TableHead>Data do Casamento</TableHead>
                              <TableHead>Criado em</TableHead>
                              <TableHead>Etapa</TableHead>
                              <TableHead>Pagamento</TableHead>
                              <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredRegistrations.map((registration) => (
                              <TableRow key={registration.id}>
                                <TableCell className="font-medium">{registration.username}</TableCell>
                                <TableCell>{registration.names || "-"}</TableCell>
                                <TableCell>
                                  {registration.date ? format(new Date(registration.date), "dd/MM/yyyy") : "-"}
                                </TableCell>
                                <TableCell>{format(new Date(registration.created_at), "dd/MM/yyyy")}</TableCell>
                                <TableCell>
                                  <Badge variant="outline">{registration.step}/5</Badge>
                                </TableCell>
                                <TableCell>
                                  {registration.payment === "paid" ? (
                                    <Badge className="bg-green-500">Pago</Badge>
                                  ) : registration.trialStartDate ? (
                                    <Badge variant="outline">Teste</Badge>
                                  ) : (
                                    <Badge variant="secondary">Pendente</Badge>
                                  )}
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm">
                                    Editar
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Análises</CardTitle>
                    <CardDescription>
                      Visualize métricas e estatísticas sobre os cadastros na plataforma.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-12 text-muted-foreground">Dados analíticos serão exibidos aqui.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
  )
}
