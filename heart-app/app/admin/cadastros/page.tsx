"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { BookUser, Download, Filter, Mail, MoreHorizontal, Pencil, Search, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserDetailsDialog } from "@/components/admin/user-details-dialog"
import { DeleteConfirmDialog } from "@/components/admin/delete-confirm-dialog"
import { PaymentStatusDialog } from "@/components/admin/payment-status-dialog"
import { SendEmailDialog } from "@/components/admin/send-email-dialog"
import { UserEditDialog } from "@/components/admin/user-edit-dialog"
import { api } from "@/lib/api"
import toast from "react-hot-toast"
import { Register } from "@/types/register"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"


export default function Cadastros() {
  const [registrations, setRegistrations] = useState<Register[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("")
  const [filterPayment, setFilterPayment] = useState<string | null>(null)
  const [filterStep, setFilterStep] = useState<string | null>(null)


  // Dialog states
  const [selectedUser, setSelectedUser] = useState<Register | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const [isEmailOpen, setIsEmailOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const toastId = toast.loading("carregando dados ...");
      try {
        setIsLoading(true);

        const registrations = await api.getAllRegistrations();

        setRegistrations(registrations || []);


        toast.success(`Dados carregados com sucesso!`, { id: toastId });
      } catch (error: any) {
        console.error("Error fetching data:", error);
        toast.error(`Erro ao carregar dados: ${error}`, { id: toastId });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
        <p>Carregando dados...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Cadastros</h1>
        <p className="text-muted-foreground">Gerencie todos os casais cadastrados na plataforma.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todos os Cadastros</CardTitle>
          <CardDescription>Lista completa de casais cadastrados na plataforma OurLovee.</CardDescription>
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
                    <SelectItem value="PAGO">Pagos</SelectItem>
                    <SelectItem value="free-trial">Teste</SelectItem>
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
                    <TableHead>Data do Casal</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead>Step</TableHead>
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
                        <TableCell>{format(new Date(registration.created_at), "dd/MM/yyyy k:m")}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{registration.step}/5</Badge>
                        </TableCell>
                        <TableCell>
                          {registration.payment === "PAGO" ? (
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
                              className="bg-yellow-500 cursor-pointer"
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
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Abrir menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => {
                                setSelectedUser(registration)
                                setIsDetailsOpen(true)
                              }}
                              >
                                <BookUser className="mr-2 h-4 w-4" />
                                Detalhes
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                setSelectedUser(registration)
                                setIsEditOpen(true)
                              }}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                setSelectedUser(registration)
                                setIsEmailOpen(true)
                              }}
                              >
                                <Mail className="mr-2 h-4 w-4" />
                                Email
                              </DropdownMenuItem>

                              <DropdownMenuItem onClick={() => {
                                setSelectedUser(registration)
                                setIsDeleteOpen(true)
                              }}
                              >
                                <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                                Excluir
                              </DropdownMenuItem>

                            </DropdownMenuContent>
                          </DropdownMenu>
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
