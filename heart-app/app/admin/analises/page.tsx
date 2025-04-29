"use client"

import { useEffect, useState } from "react"
import { Calendar, CreditCard, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import toast from "react-hot-toast"
import { api } from "@/lib/api"
import { Register } from "@/types/register"

export default function Analises() {
  const [timeRange, setTimeRange] = useState("all")
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
  const totalRegistrations = metrics.totalRegistrations
  const paidRegistrations = metrics.paidRegistrations;
  const trialRegistrations = metrics.trialRegistrations;
  const completedSetups = metrics.completedSetups;

  // Calculate step distribution
  const stepDistribution = [1, 2, 3, 4, 5].map((step) => {
    const count = registrations.filter((r) => r.step === step).length
    const percentage = Math.round((count / totalRegistrations) * 100)
    return { step, count, percentage }
  })

  // Calculate payment distribution
  const paymentDistribution = [
    {
      status: "Pago",
      count: paidRegistrations,
      percentage: Math.round((paidRegistrations / totalRegistrations) * 100),
    },
    {
      status: "Teste",
      count: trialRegistrations,
      percentage: Math.round((trialRegistrations / totalRegistrations) * 100),
    },
    {
      status: "Pendente",
      count: totalRegistrations - paidRegistrations - trialRegistrations,
      percentage: Math.round(
        ((totalRegistrations - paidRegistrations - trialRegistrations) / totalRegistrations) * 100,
      ),
    },
  ]
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
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Análises</h1>
          <p className="text-muted-foreground">Visualize métricas e estatísticas sobre os cadastros na plataforma.</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todo o período</SelectItem>
            <SelectItem value="month">Último mês</SelectItem>
            <SelectItem value="quarter">Último trimestre</SelectItem>
            <SelectItem value="year">Último ano</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Etapa</CardTitle>
            <CardDescription>Progresso dos casais nas etapas de configuração</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stepDistribution.map(({ step, count, percentage }) => (
                <div className="flex items-center gap-4" key={step}>
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Etapa {step}</span>
                      <span className="text-sm text-muted-foreground">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Pagamento</CardTitle>
            <CardDescription>Status de pagamento dos casais</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentDistribution.map(({ status, count, percentage }) => (
                <div className="flex items-center gap-4" key={status}>
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{status}</span>
                      <span className="text-sm text-muted-foreground">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${status === "Pago" ? "bg-green-500" : status === "Teste" ? "bg-blue-500" : "bg-gray-500"
                          }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tendências de Cadastro</CardTitle>
          <CardDescription>Evolução dos cadastros ao longo do tempo</CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <p className="text-muted-foreground">Gráfico de tendências será exibido aqui</p>
        </CardContent>
      </Card>
    </div>
  )
}
