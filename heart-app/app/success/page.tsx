'use client';

import HeartButton from "@/components/HeartButton";

const Success = () => {
 
  

  return (
    <div className="container mx-auto p-6">
      <h1>Sua pagina foi criada com sucesso!</h1>
      <p>Click no coração para ser redirecionado para a sua pagina.</p>
      <HeartButton/>
    </div>
  );
};

export default Success;
