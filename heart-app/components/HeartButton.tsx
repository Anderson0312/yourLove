'use client';

import { saveRegistrationData } from '@/services/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HeartButton() {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    setUsername(savedUsername); 
  }, []);


  const handleSubmitPayment = async () => {
    const currentStep = 6;
    const formDataPayment = 'PAGO';
    if (!username) return;
    try {
      const existingData = {};
      await saveRegistrationData(username, currentStep, {
        ...existingData,
        payment: formDataPayment, 
      });
      console.log('Pagamento registrado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar os dados de pagamento:', error);
    }
    finally {
      setLoading(false);
    }
  };

    const handleClick = async () => {
    setIsClicked(true);
    await handleSubmitPayment(); 

    setTimeout(() => {
      router.push(`/yourDatting/${username}`);
      localStorage.clear();
    }, 50);
  };

  return (
    <button
      onClick={handleClick}
      className={`relative w-16 h-16 bg-red-500 rounded-full flex items-center justify-center transform transition-all duration-300 ${
        isClicked ? 'animate-click-beat' : 'animate-pulse-beat'
      }`}
      style={{
        boxShadow: '0 0 15px rgba(255, 0, 0, 0.5)',
      }}
      disabled={loading}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-10 h-10 text-white"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </button>
  );
}
