'use client'

import Header from "@/components/Header";
import HeadingTop from "@/components/HeadingTop";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function CancelPage() {
    return (
      <div className="">
      <HeadingTop/>
      <Header/>     
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4">
      <Card className="mx-auto max-w-md border-red-500/20">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
            <XCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-2xl">Pagamento Cancelado</CardTitle>
          <CardDescription>Seu pagamento foi cancelado. Nenhuma cobrança foi realizada.</CardDescription>
        </CardHeader>
        <CardContent className="text-center text-sm text-muted-foreground">
          <p>
            Se você encontrou algum problema durante o processo de pagamento ou mudou de ideia, você pode tentar
            novamente ou entrar em contato com nosso suporte.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full" asChild>
            <Link href="../">Tentar Novamente</Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/">Voltar para Página Inicial</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
      </div>

    );
  }


  function CircleCancelIcon(props:any) {
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
        <path d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    )
  }

//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
//   <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
// </svg>

  