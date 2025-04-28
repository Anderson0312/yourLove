
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/card"
import { Register } from "@/types/register"
import { Users, Clock, CreditCard, CalendarCheck } from 'lucide-react'

interface DashboardStatsProps {
  registrations: Register[]
}

export function DashboardStats({ registrations }: DashboardStatsProps) {
  // Total de usuários
  const totalUsers = registrations.length

  // Usuários em teste gratuito
  const freeTrialUsers = registrations.filter(user => user.payment === "free-trial").length

  // Usuários com plano pago
  const paidUsers = registrations.filter(user => 
    user.payment === "annual" || user.payment === "lifetime"
  ).length

  // Usuários que completaram o cadastro (step 5)
  const completedUsers = registrations.filter(user => user.step === 5).length

  // Taxa de conversão (usuários pagos / total)
  const conversionRate = totalUsers > 0 ? ((paidUsers / totalUsers) * 100).toFixed(1) : "0"

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalUsers}</div>
          <p className="text-xs text-muted-foreground">
            {completedUsers} com cadastro completo
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Testes Gratuitos</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{freeTrialUsers}</div>
          <p className="text-xs text-muted-foreground">
            {registrations.filter(user => 
              user.payment === "free-trial" && 
              user.trialStartDate && 
              new Date().getTime() - new Date(user.trialStartDate).getTime() <= 24 * 60 * 60 * 1000
            ).length} ativos
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Planos Pagos</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{paidUsers}</div>
          <p className="text-xs text-muted-foreground">
            Taxa de conversão: {conversionRate}%
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Cadastros Recentes</CardTitle>
          <CalendarCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {registrations.filter(user => {
              const today = new Date()
              const userDate = new Date(user.created_at)
              return userDate.getDate() === today.getDate() && 
                     userDate.getMonth() === today.getMonth() && 
                     userDate.getFullYear() === today.getFullYear()
            }).length}
          </div>
          <p className="text-xs text-muted-foreground">
            Hoje
          </p>
        </CardContent>
      </Card>
    </div>
  )
}