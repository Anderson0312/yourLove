"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar, CreditCard, Download, Filter, Heart, Search, Settings, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminDashboardSidebar } from "@/components/admin/admin-dashboard-sidebar"
import { AdminDashboardHeader } from "@/components/admin/admin-dashboard-header"
import { mockRegistrations, type Register } from "@/lib/mock-data"
import { UserDetailsDialog } from "@/components/admin/user-details-dialog"
import { UserEditDialog } from "@/components/admin/user-edit-dialog"
import { DeleteConfirmDialog } from "@/components/admin/delete-confirm-dialog"
import { PaymentStatusDialog } from "@/components/admin/payment-status-dialog"
import { SendEmailDialog } from "@/components/admin/send-email-dialog"
import { api } from "@/lib/api"

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPayment, setFilterPayment] = useState<string | null>(null);
  const [filterStep, setFilterStep] = useState<string | null>(null);
  const [registrations, setRegistrations] = useState<Register[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalRegistrations: 0,
    paidRegistrations: 0,
    trialRegistrations: 0,
    completedSetups: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [registrationsResponse, metricsResponse] = await Promise.all([
          api.getAllRegistrations(),
          api.getMetrics()
        ]);
        
        setRegistrations(registrationsResponse.data || []);
        setMetrics({
          totalRegistrations: metricsResponse.data?.totalRegistrations || 0,
          paidRegistrations: metricsResponse.data?.totalPaymentSuccess || 0,
          trialRegistrations: metricsResponse.data?.totalPeriodTest || 0,
          completedSetups: metricsResponse.data?.totalCompleteStep || 0
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        // Mostrar feedback ao usuário
        toast.error("Erro ao carregar dados. Tente novamente.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Dialog states
  const [selectedUser, setSelectedUser] = useState<Register | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const [isEmailOpen, setIsEmailOpen] = useState(false)

  // Filter registrations based on search query and filters
  const filteredRegistrations = registrations.filter((registration) => {
    const matchesSearch =
      searchQuery === "" ||
      registration.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (registration.names && registration.names.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesPayment = filterPayment === null || registration.payment === filterPayment

    const matchesStep = filterStep === null || registration.step.toString() === filterStep

    return matchesSearch && matchesPayment && matchesStep
  })

  // Calculate statistics
  const { totalRegistrations, paidRegistrations, trialRegistrations, completedSetups } = metrics;

  // Handle user update
  const handleUserUpdate = async (updatedUser: Register) => {
    try {
      await api.updateRegistration(updatedUser.id, updatedUser);
      setRegistrations((prev) =>
        prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      setIsEditOpen(false);
      setIsPaymentOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleUserDelete = async (userId: string) => {
    try {
      await api.deleteRegistration(userId);
      setRegistrations((prev) => prev.filter((user) => user.id !== userId));
      setIsDeleteOpen(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Export data as CSV
  const exportToCSV = () => {
    const headers = [
      "ID",
      "Username",
      "Nomes",
      "Data de Criação",
      "Data do Casamento",
      "Etapa",
      "Pagamento",
      "Período de Teste",
    ]

    const csvData = filteredRegistrations.map((user) => [
      user.id,
      user.username,
      user.names || "",
      format(new Date(user.created_at), "dd/MM/yyyy"),
      user.date ? format(new Date(user.date), "dd/MM/yyyy") : "",
      user.step.toString(),
      user.payment || "",
      user.trialStartDate ? format(new Date(user.trialStartDate), "dd/MM/yyyy") : "",
    ])

    const csvContent = [headers.join(","), ...csvData.map((row) => row.join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `ourlovee_registros_${format(new Date(), "dd-MM-yyyy")}.csv`)
    link.click()
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col md:flex-row">
        <AdminDashboardSidebar />
        <div className="flex-1 flex items-center justify-center">
          <p>Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <AdminDashboardSidebar />

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
                        {registrations.slice(0, 5).map((registration) => (
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
                          const count = registrations.filter((r) => r.step === step).length
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
                                    className="bg-primary h-2.5 rounded-full bg-red-500"
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

                      <div className="flex flex-wrap items-center gap-2">
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

                        <div className="flex items-center gap-2">
                          <Select
                            value={filterStep || "all"}
                            onValueChange={(value) => setFilterStep(value === "all" ? null : value)}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Filtrar por etapa" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Todas etapas</SelectItem>
                              <SelectItem value="1">Etapa 1</SelectItem>
                              <SelectItem value="2">Etapa 2</SelectItem>
                              <SelectItem value="3">Etapa 3</SelectItem>
                              <SelectItem value="4">Etapa 4</SelectItem>
                              <SelectItem value="5">Etapa 5</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Button variant="outline" size="icon" onClick={exportToCSV} title="Exportar para CSV">
                          <Download className="h-4 w-4" />
                        </Button>
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
                            {filteredRegistrations.length === 0 ? (
                              <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                  Nenhum registro encontrado.
                                </TableCell>
                              </TableRow>
                            ) : (
                              filteredRegistrations.map((registration) => (
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
                                      <Badge
                                        className="bg-green-500 hover:bg-green-600 cursor-pointer"
                                        onClick={() => {
                                          setSelectedUser(registration)
                                          setIsPaymentOpen(true)
                                        }}
                                      >
                                        Pago
                                      </Badge>
                                    ) : registration.trialStartDate ? (
                                      <Badge
                                        variant="outline"
                                        className="cursor-pointer"
                                        onClick={() => {
                                          setSelectedUser(registration)
                                          setIsPaymentOpen(true)
                                        }}
                                      >
                                        Teste
                                      </Badge>
                                    ) : (
                                      <Badge
                                        variant="secondary"
                                        className="cursor-pointer"
                                        onClick={() => {
                                          setSelectedUser(registration)
                                          setIsPaymentOpen(true)
                                        }}
                                      >
                                        Pendente
                                      </Badge>
                                    )}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                          setSelectedUser(registration)
                                          setIsDetailsOpen(true)
                                        }}
                                      >
                                        Detalhes
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                          setSelectedUser(registration)
                                          setIsEditOpen(true)
                                        }}
                                      >
                                        Editar
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                          setSelectedUser(registration)
                                          setIsEmailOpen(true)
                                        }}
                                      >
                                        Email
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                        onClick={() => {
                                          setSelectedUser(registration)
                                          setIsDeleteOpen(true)
                                        }}
                                      >
                                        Excluir
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))
                            )}
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

      {/* Dialogs */}
      {selectedUser && (
        <>
          <UserDetailsDialog user={selectedUser} open={isDetailsOpen} onOpenChange={setIsDetailsOpen} />

          <UserEditDialog
            user={selectedUser}
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
            onSave={handleUserUpdate}
          />

          <DeleteConfirmDialog
            user={selectedUser}
            open={isDeleteOpen}
            onOpenChange={setIsDeleteOpen}
            onConfirm={handleUserDelete}
          />

          <PaymentStatusDialog
            user={selectedUser}
            open={isPaymentOpen}
            onOpenChange={setIsPaymentOpen}
            onSave={handleUserUpdate}
          />

          <SendEmailDialog user={selectedUser} open={isEmailOpen} onOpenChange={setIsEmailOpen} />
        </>
      )}
    </div>
  )
}
