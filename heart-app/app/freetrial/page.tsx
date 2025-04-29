'use client';

import Header from "@/components/Header";
import HeadingTop from "@/components/HeadingTop";
import HeartButton from "@/components/HeartButton";
import SendQRCodeEmail from "@/components/SendQrCodeEmail";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getRegistrationData, saveRegistrationData } from "@/services/api";
import { CheckCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const FreeTrial = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    setUsername(savedUsername);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    const toastId = toast.loading("Enviando email ...");
    e.preventDefault()
    setError("")

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Por favor, insira um email válido.")
      return
    }

    setIsSubmitting(true)
    
    if (!username) return;
    // Simulando uma chamada de API
    try {
      // Aqui você adicionaria a lógica para enviar o email para seu backend
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const existingData = await getRegistrationData(username);
      await saveRegistrationData(username, 5, {
        ...existingData, // Mantém os dados anteriores
        email: email, 
        payment: 'free-trial', 
        trialStartDate: new Date().toISOString(),
      });
      toast.success(`Email enviado com sucesso!`, { id: toastId });
      } catch (err) {
        toast.error(`Ocorreu um erro ao processar sua solicitação.: ${error}`, { id: toastId });
        setError("Ocorreu um erro ao processar sua solicitação. Tente novamente.")
      } finally {
        setIsSubmitting(false)
      }
    }

  return (
      <div className="">
        <HeadingTop />
        <Header />
        <Toaster position="bottom-right" />
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4">
          <Card className="mx-auto max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/20">
                <Sparkles className="h-10 w-10 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-2xl">Experimente Grátis</CardTitle>
              <CardDescription>Acesse todos os recursos por 1 dias sem compromisso.</CardDescription>
            </CardHeader>
            <CardContent>
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    {error && <p className="text-sm text-red-500">{error}</p>}
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Processando..." : "Começar Trial Gratuito"}
                  </Button>
                </form>
              ) : (
                <div className="text-center space-y-4">
                  <div className="rounded-full bg-green-100 p-2 w-12 h-12 mx-auto flex items-center justify-center dark:bg-green-900/20">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="font-medium">Tudo pronto!</p>
                  <p className="text-sm text-muted-foreground">
                    Enviamos um email para <span className="font-medium">{email}</span> com instruções para acessar sua
                    conta.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">
              <p>
                Ao se inscrever, você concorda com nossos{" "}
                <Link href="/termos" className="underline underline-offset-4 hover:text-primary">
                  Termos de Serviço
                </Link>{" "}
                e{" "}
                <Link href="/privacidade" className="underline underline-offset-4 hover:text-primary">
                  Política de Privacidade
                </Link>
                .
              </p>
              {isSuccess && (
                <Button variant="outline" className="mt-4" asChild>
                  <Link href="/">Voltar para Página Inicial</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  };

  export default FreeTrial;

  function CircleCheckIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  }
