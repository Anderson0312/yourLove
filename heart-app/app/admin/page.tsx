"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar, CreditCard, Heart, Settings, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { api } from "@/lib/api"
import toast from "react-hot-toast"
import Link from "next/link"
import { Register } from "@/types/register"

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState<Register[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRegistrations, setLastRegistrations] = useState<Register[]>([]);
  const [metrics, setMetrics] = useState({
    totalRegistrations: 0,
    paidRegistrations: 0,
    trialRegistrations: 0,
    completedSetups: 0
  });


  useEffect(() => {
    const fetchData = async () => {
      const toastId = toast.loading("carregando dados ...");
      try {
        setIsLoading(true);

        const registrations = await api.getAllRegistrations();
        const metrics = await api.getMetrics();
        const lastFiveRegistrations = await api.getLastFiveRegistrations();


        setLastRegistrations(lastFiveRegistrations.data || []);
        console.log("Registrations:", lastFiveRegistrations);
        setRegistrations(registrations || []);
        setMetrics({
          totalRegistrations: metrics?.totalRegistrations || 0,
          paidRegistrations: metrics?.totalPaymentSuccess || 0,
          trialRegistrations: metrics?.totalPeriodTest || 0,
          completedSetups: metrics?.totalCompleteStep || 0
        });

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


  // Calculate statistics
  const { totalRegistrations, paidRegistrations, trialRegistrations, completedSetups } = metrics;


  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col md:flex-row">
        <p>Carregando dados...</p>
      </div>
    );
  }

  return (
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Cadastros</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRegistrations}</div>
            <p className="text-xs text-muted-foreground">+{Math.floor(totalRegistrations * 0.1)} desde o último mês</p>
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
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Cadastros Recentes</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/cadastros">Ver todos</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {lastRegistrations.slice(0, 5).map((registration) => (
                <div className="flex items-center" key={registration.id}>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{registration.names || registration.username}</p>
                    <p className="text-sm text-muted-foreground">
                      {registration.created_at
                        ? format(new Date(registration.created_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
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
          <CardHeader className="flex justify-between items-center">
            <div>
              <CardTitle>Progresso dos Cadastros</CardTitle>
              <CardDescription>Distribuição dos cadastros por etapa</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/analises">Mais detalhes</Link>
            </Button>
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
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
