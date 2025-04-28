"use client"

import { useState } from "react"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/buttonv2"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, ChevronDown, Search, Eye, Edit, Trash2, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Register } from "@/types/register"
import { UserDetailsDialog } from "@/components/admin/user-details-dialog"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

interface UsersTableProps {
  registrations: Register[]
}

export function UsersTable({ registrations }: UsersTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<Register | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Register | null
    direction: "ascending" | "descending"
  }>({
    key: "created_at",
    direction: "descending",
  })

  // Filtrar usuários com base na pesquisa
  const filteredUsers = registrations.filter((user) => {
    return (
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.names?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.payment?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  // Ordenar usuários
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig.key) return 0
    
    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]
    
    if (aValue === bValue) return 0
    
    if (aValue === null) return 1
    if (bValue === null) return -1
    
    const comparison = aValue < bValue ? -1 : 1
    
    return sortConfig.direction === "ascending" ? comparison : -comparison
  })

  // Função para alternar a ordenação
  const requestSort = (key: keyof Register) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // Função para abrir o modal de detalhes
  const openUserDetails = (user: Register) => {
    setSelectedUser(user)
    setIsDetailsOpen(true)
  }

  // Função para renderizar o status do pagamento
  const renderPaymentStatus = (payment: string | null) => {
    if (!payment) return <Badge variant="outline">Não definido</Badge>
    
    switch (payment) {
      case "free-trial":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Teste Gratuito</Badge>
      case "annual":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Plano Anual</Badge>
      case "lifetime":
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800">Vitalício</Badge>
      default:
        return <Badge variant="outline">{payment}</Badge>
    }
  }

  // Função para verificar se o teste gratuito expirou
  const isTrialExpired = (trialStartDate: Date | null) => {
    if (!trialStartDate) return false
    
    const now = new Date()
    const trial = new Date(trialStartDate)
    const diffHours = (now.getTime() - trial.getTime()) / (1000 * 60 * 60)
    
    return diffHours >= 24
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar usuários..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9 w-[250px]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Exportar
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <Button 
                  variant="ghost" 
                  onClick={() => requestSort("username")}
                  className="flex items-center gap-1 p-0 font-medium"
                >
                  Username
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => requestSort("created_at")}
                  className="flex items-center gap-1 p-0 font-medium"
                >
                  Data de Criação
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Plano</TableHead>
              <TableHead>Progresso</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Nenhum usuário encontrado.
                </TableCell>
              </TableRow>
            ) : (
              sortedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.names || "-"}</TableCell>
                  <TableCell>
                    {formatDistanceToNow(new Date(user.created_at), {
                      addSuffix: true,
                      locale: ptBR
                    })}
                  </TableCell>
                  <TableCell>
                    {user.payment === "free-trial" && user.trialStartDate ? (
                      isTrialExpired(user.trialStartDate) ? (
                        <Badge variant="destructive" className="flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          Expirado
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="flex items-center gap-1 bg-yellow-50 text-yellow-800 border-yellow-300">
                          <Clock className="h-3 w-3" />
                          Ativo
                        </Badge>
                      )
                    ) : user.payment ? (
                      <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-800 border-green-300">
                        <CheckCircle className="h-3 w-3" />
                        Ativo
                      </Badge>
                    ) : (
                      <Badge variant="outline">Não definido</Badge>
                    )}
                  </TableCell>
                  <TableCell>{renderPaymentStatus(user.payment)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-red-500" 
                          style={{ width: `${(user.step / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">
                        {user.step}/5
                      </span>
                    </div>
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
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => openUserDetails(user)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
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
      
      {selectedUser && (
        <UserDetailsDialog 
          user={selectedUser} 
          isOpen={isDetailsOpen} 
          onClose={() => setIsDetailsOpen(false)} 
        />
      )}
    </div>
  )
}