'use client'
import React, { useEffect } from 'react';

const FallingHearts: React.FC = () => {
  useEffect(() => {
    const container = document.querySelector('.hearts-container');

    const createHeart = () => {
      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.style.left = `${Math.random() * 100}vw`; // Posição horizontal aleatória
      heart.style.top = `${Math.random() * 100}vh`; // Posição vertical aleatória
      heart.style.animationDuration = `${Math.random() * 2 + 3}s`; // Duração aleatória (3 a 5s)
      heart.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="24px" height="24px">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      `;
      container?.appendChild(heart);

      // Remove o coração após a animação
      setTimeout(() => heart.remove(), 5000);
    };

    // Cria novos corações a cada 300ms
    const interval = setInterval(createHeart, 300);

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  return null;
};

export default FallingHearts;

