'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Heart {
  id: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const FallingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const createHeart = (): Heart => ({
      id: Math.random().toString(36).substring(2, 9),
      x: Math.random() * 100, // Posição horizontal aleatória (0-100%)
      y: Math.random() * -50, // Começa acima da área visível (-50% a 0%)
      size: Math.random() * 20 + 10, // Tamanho entre 10-30px
      duration: Math.random() * 3 + 2, // Duração entre 2-5s
      delay: Math.random() * 2
    });

    // Inicializa com corações
    const initialHearts = Array.from({ length: 10 }, createHeart);
    setHearts(initialHearts);

    const interval = setInterval(() => {
      setHearts(prev => [...prev.slice(-30), createHeart()]); // Mantém máximo de 30corações
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-red-500"
          initial={{ 
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            opacity: 0,
            scale: 0.5
          }}
          animate={{ 
            top: '100%', // Cai até abaixo da tela
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 1]
          }}
          transition={{ 
            duration: heart.duration,
            delay: heart.delay,
            ease: "easeIn"
          }}
          style={{
            width: `${heart.size}px`,
            height: `${heart.size}px`,
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            className="w-full h-full"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default FallingHearts;