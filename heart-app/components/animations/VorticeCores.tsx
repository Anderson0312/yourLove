
import { useEffect, useState } from 'react';
import { motion, Transition } from 'framer-motion';

interface Firefly {
  id: string;
  x: number;
  y: number;
  size: number;
  coreColor: string;
  glowColor: string;
  opacity: number;
  duration: number;
  delay: number;
}

const Fireflies = () => {
  const [fireflies, setFireflies] = useState<Firefly[]>([]);

  // Cores vibrantes para os centros dos vagalumes
  const coreColors = [
    'rgba(255, 230, 50, 1)',   // Amarelo vivo
    'rgba(50, 255, 180, 1)',   // Verde-água vibrante
    'rgba(180, 50, 255, 1)',   // Roxo intenso
    'rgba(50, 180, 255, 1)',   // Azul vivo
    'rgba(255, 80, 80, 1)'     // Vermelho brilhante
  ];

  // Cores de brilho mais suaves
  const glowColors = [
    'rgba(255, 240, 150, 0.7)',
    'rgba(150, 255, 220, 0.7)',
    'rgba(220, 150, 255, 0.7)',
    'rgba(150, 220, 255, 0.7)',
    'rgba(255, 150, 150, 0.7)'
  ];

  // Cria novos vagalumes
  useEffect(() => {
    const createFirefly = (): Firefly => {
      const colorIndex = Math.floor(Math.random() * coreColors.length);
      return {
        id: Math.random().toString(36).substring(2, 11),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1 + 2, // Tamanho entre 4-10px
        coreColor: coreColors[colorIndex],
        glowColor: glowColors[colorIndex],
        opacity: Math.random() * 0.5 + 0.5, // Opacidade entre 0.5-1
        duration: Math.random() * 8 + 15, // Duração mais longa
        delay: Math.random() * 3
      };
    };

    // Inicia com 30-35 vagalumes (aumentado)
    const initialCount = Math.floor(Math.random() * 20) + 50;
    const initialFireflies = Array.from({ length: initialCount }, createFirefly);
    setFireflies(initialFireflies);

    // Adiciona novos vagalumes ocasionalmente
    const interval = setInterval(() => {
      if (fireflies.length < 100 && Math.random() > 1) {
        setFireflies(prev => [...prev, createFirefly()]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Remove vagalumes aleatoriamente
  const removeFirefly = (id: string) => {
    setFireflies(prev => prev.filter(f => f.id !== id));
  };

  // Gera caminho aleatório suave
  const generatePath = (firefly: Firefly) => {
    const start = { x: firefly.x, y: firefly.y };
    const end = {
      x: start.x + (Math.random() - 2) * 20,
      y: start.y + (Math.random() - 1) * 20
    };

  const transition: Transition = {
      duration: firefly.duration,
      delay: firefly.delay,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse" as const // Tipo correto para repeatType
    };
    
    return {
      initial: { x: start.x, y: start.y, opacity: 0 },
      animate: { 
        x: end.x, 
        y: end.y, 
        opacity: [0, firefly.opacity, 0],
      },
      transition
    };
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      {fireflies.map((firefly) => {
        const path = generatePath(firefly);
        
        return (
          <motion.div
            key={firefly.id}
            className="absolute rounded-full pointer-events-none"
            initial={path.initial}
            animate={path.animate}
            transition={path.transition}
            onAnimationComplete={() => {
              if (Math.random() > 0.85) removeFirefly(firefly.id);
            }}
            style={{
              left: `${firefly.x}%`,
              top: `${firefly.y}%`,
              width: `${firefly.size}px`,
              height: `${firefly.size}px`,
            }}
          >
            {/* Núcleo vibrante */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                backgroundColor: firefly.coreColor,
                boxShadow: `0 0 ${firefly.size}px ${firefly.size/3}px ${firefly.coreColor}`,
                zIndex: 2
              }}
            />
            
            {/* Aurora suave */}
            <motion.div
              className="absolute rounded-full"
              style={{
                backgroundColor: firefly.glowColor,
                filter: 'blur(3px)',
                width: `${firefly.size * 3}px`,
                height: `${firefly.size * 3}px`,
                left: '50%',
                top: '50%',
                translateX: '-50%',
                translateY: '-50%',
                zIndex: 1
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 0.9, 0.6]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default Fireflies;