"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Register } from "@/types/register"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts"

interface DashboardChartsProps {
  registrations: Register[]
}

export function DashboardCharts({ registrations }: DashboardChartsProps) {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d")
  
  // Dados para o gráfico de registros por dia
  const getRegistrationsByDate = () => {
    const now = new Date()
    const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90
    const data = []
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      date.setHours(0, 0, 0, 0)
      
      const nextDate = new Date(date)
      nextDate.setDate(nextDate.getDate() + 1)
      
      const count = registrations.filter(user => {
        const userDate = new Date(user.created_at)
        return userDate >= date && userDate < nextDate
      }).length
      
      data.push({
        date: date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
        registros: count
      })
    }
    
    return data
  }
  
  // Dados para o gráfico de distribuição de planos
  const getPlanDistribution = () => {
    const freeTrial = registrations.filter(user => user.payment === "free-trial").length
    const annual = registrations.filter(user => user.payment === "annual").length
    const lifetime = registrations.filter(user => user.payment === "lifetime").length
    const none = registrations.filter(user => !user.payment).length
    
    return [
      { name: "Teste Gratuito", value: freeTrial },
      { name: "Plano Anual", value: annual },
      { name: "Vitalício", value: lifetime },
      { name: "Sem Plano", value: none }
    ]
  }
  
  // Cores para o gráfico de pizza
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]
  
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Registros</CardTitle>
              <CardDescription>Número de registros ao longo do tempo</CardDescription>
            </div>
            <Tabs 
              value={timeRange} 
              onValueChange={(value) => setTimeRange(value as "7d" | "30d" | "90d")}
              className="w-[200px]"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="7d">7D</TabsTrigger>
                <TabsTrigger value="30d">30D</TabsTrigger>
                <TabsTrigger value="90d">90D</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
             <BarChart data={getRegistrationsByDate()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="registros" fill="#ef4444" />
            </BarChart> 
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Distribuição de Planos</CardTitle>
          <CardDescription>Distribuição dos usuários por tipo de plano</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
           <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={getPlanDistribution()}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {getPlanDistribution().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip formatter={(value) => [`${value} usuários`, "Quantidade"]} /> 
            </PieChart>
          </ResponsiveContainer> 
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Progresso dos Usuários</CardTitle>
          <CardDescription>Distribuição dos usuários por etapa de cadastro</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
           <ResponsiveContainer width="100%" height="100%">
             <BarChart
              data={[1, 2, 3, 4, 5].map(step => ({
                etapa: `Etapa ${step}`,
                usuarios: registrations.filter(user => user.step === step).length
              }))}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="etapa" type="category" />
              <Tooltip />
              <Bar dataKey="usuarios" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer> 
        </CardContent>
      </Card>
    </div>
  )
}