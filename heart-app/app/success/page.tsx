'use client';

import Header from "@/components/Header";
import HeartButton from "@/components/HeartButton";
import QRCodeGenerator from "@/components/QrCodeGnerator";
import SendQRCodeEmail from "@/components/SendQrCodeEmail";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

const Success = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    setUsername(savedUsername);
  }, []);

  return (
    <div className="">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <div className="max-w-md w-full m-2 space-y-6 p-6 bg-white rounded-lg shadow-lg items-center bg-gray-800 ">
          <div className="flex flex-col items-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
            <CardTitle className="text-2xl text-gray-800">Pagamento Confirmado</CardTitle>
            <CardDescription>Seu pagamento foi processado com sucesso!</CardDescription>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Obrigado pela sua compra. Você receberá um email com os detalhes da sua transação. Seu acesso foi ativado
              imediatamente.</p>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
            <span className="text-gray-500 dark:text-gray-400">Baixe o Qr code após CLICK no coração para ser redirecionado para sua pagina</span>
            <QRCodeGenerator dynamicPath={username} />
            <SendQRCodeEmail textTitle='Receber QrCode por email' />
          </div>
        </div>
        <HeartButton />
      </div>
    </div>
  );
};

export default Success;

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
