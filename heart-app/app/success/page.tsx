'use client';

import HeartButton from "@/components/HeartButton";
import QRCodeGenerator from "@/components/QrCodeGnerator";
import { useEffect, useState } from "react";

const Success = () => {
    const [username, setUsername] = useState<string | null>(null);
  
    useEffect(() => {
      const savedUsername = localStorage.getItem('username');
      setUsername(savedUsername); 
      localStorage.clear()
    }, []);
    
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold text-green-600">Pagamento realizado com sucesso! 🎉</h1>
      <p className="mt-4 text-lg">Obrigado por sua compra. Seu pedido está sendo processado.</p>
      <p>Baixe o Qr code após CLICK no coração para ser redirecionado para sua pagina</p>
      <QRCodeGenerator dynamicPath={username}/>
      <HeartButton/>
    </div>
  );
};

export default Success;
