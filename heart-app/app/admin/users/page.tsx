"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsersTable } from "@/components/admin/users-table"
import { getAllRegistrations } from "@/services/api"
import { Register } from "@/types/register"
import { Loader2 } from 'lucide-react'

export default function UsersPage() {
  const [registrations, setRegistrations] = useState<Register[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllRegistrations()
        setRegistrations(data)
      } catch (error) {
        console.error("Erro ao buscar registros:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loader2 className="h-8 w-8 animate-spin text-red-500" />
      </div>
    )
  }

  // Filtrar usuários por tipo de plano
  const freeTrialUsers = registrations.filter(user => user.payment === "free-trial")
  const annualUsers = registrations.filter(user => user.payment === "annual")
  const lifetimeUsers = registrations.filter(user => user.payment === "lifetime")
  const noPaymentUsers = registrations.filter(user => !user.payment)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Usuários</h1>
        <p className="text-muted-foreground">
          Visualize e gerencie todos os usuários registrados na plataforma.
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todos ({registrations.length})</TabsTrigger>
          <TabsTrigger value="free-trial">Teste Gratuito ({freeTrialUsers.length})</TabsTrigger>
          <TabsTrigger value="annual">Plano Anual ({annualUsers.length})</TabsTrigger>
          <TabsTrigger value="lifetime">Vitalício ({lifetimeUsers.length})</TabsTrigger>
          <TabsTrigger value="no-payment">Sem Plano ({noPaymentUsers.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Todos os Usuários</CardTitle>
              <CardDescription>
                Lista completa de todos os usuários registrados.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UsersTable registrations={registrations} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="free-trial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usuários em Teste Gratuito</CardTitle>
              <CardDescription>
                Usuários que estão utilizando o período de teste gratuito.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UsersTable registrations={freeTrialUsers} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="annual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usuários com Plano Anual</CardTitle>
              <CardDescription>
                Usuários que adquiriram o plano anual.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UsersTable registrations={annualUsers} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="lifetime" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usuários com Plano Vitalício</CardTitle>
              <CardDescription>
                Usuários que adquiriram o plano vitalício.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UsersTable registrations={lifetimeUsers} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="no-payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usuários sem Plano</CardTitle>
              <CardDescription>
                Usuários que ainda não escolheram um plano.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UsersTable registrations={noPaymentUsers} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}