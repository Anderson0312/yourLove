'use client';

import HeartButton from "@/components/HeartButton";

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold text-green-600">Pagamento realizado com sucesso! 🎉</h1>
      <p className="mt-4 text-lg">Obrigado por sua compra. Seu pedido está sendo processado.</p>
      <p>Click no coração para ser redirecionado para a sua pagina.</p>
      <HeartButton/>
    </div>
  );
};

export default Success;
