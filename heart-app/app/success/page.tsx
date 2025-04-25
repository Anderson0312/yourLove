'use client';

import Header from "@/components/Header";
import HeartButton from "@/components/HeartButton";
import QRCodeGenerator from "@/components/QrCodeGnerator";
import SendQRCodeEmail from "@/components/SendQrCodeEmail";
import { useEffect, useState } from "react";

const Success = () => {
    const [username, setUsername] = useState<string | null>(null);
  
    useEffect(() => {
      const savedUsername = localStorage.getItem('username');
      setUsername(savedUsername); 
    }, []);
    
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
    <Header/>     
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full m-2 space-y-6 p-6 bg-white rounded-lg shadow-lg items-center dark:bg-gray-800 ">
        <div className="flex flex-col items-center">
        <CircleCheckIcon className="text-green-500 h-16 w-16 " />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-4">Pagamento Feito</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Obrigado por sua compra. Seu pedido está sendo processado.</p>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
        <span className="text-gray-500 dark:text-gray-400">Baixe o Qr code após CLICK no coração para ser redirecionado para sua pagina</span>
        <QRCodeGenerator dynamicPath={username}/>
        <SendQRCodeEmail/>
        </div>
        </div>
      <HeartButton/>
    </div>
    </div>
  );
};

export default Success;

function CircleCheckIcon(props:any) {
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
