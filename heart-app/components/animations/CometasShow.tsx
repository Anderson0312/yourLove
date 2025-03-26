import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type CometType = {
  id: number;
  x: number;
  y: number;
  delay: number;
  size: number;
  duration: number;
  opacity: number;
  angle: number;
  tailLength: number;
  color: string;
};

const Comet = ({ 
  x, y, delay, size, duration, opacity, angle, tailLength, color 
}: { 
  x: number; 
  y: number; 
  delay: number; 
  size: number;
  duration: number;
  opacity: number;
  angle: number;
  tailLength: number;
  color: string;
}) => {
  // Converter ângulo para radianos
  const angleRad = angle * Math.PI / 180;
  
  return (
    <>
      {/* Rastro do cometa (mais longo e difuso) */}
      <motion.div
        className="absolute"
        initial={{ 
          x, 
          y, 
          opacity: 0,
          rotate: angle,
          width: 0
        }}
        animate={{ 
          x: x + Math.cos(angleRad) * 1500,
          y: y + Math.sin(angleRad) * 1500,
          opacity: [0, opacity * 0.6, 0],
          width: tailLength
        }}
        transition={{ 
          duration, 
          delay,
          ease: "linear"
        }}
        style={{ 
          height: 1,
          background: `linear-gradient(90deg, transparent, ${color})`,
          filter: `blur(2px)`,
          transformOrigin: "left center",
          zIndex: 10
        }}
      />
      
      {/* Núcleo do cometa */}
      <motion.div
        className="absolute rounded-full"
        initial={{ 
          x, 
          y, 
          opacity: 0,
          rotate: angle,
        }}
        animate={{ 
          x: x + Math.cos(angleRad) * 1500,
          y: y + Math.sin(angleRad) * 1500,
          opacity: [0, opacity, 0],
        }}
        transition={{ 
          duration, 
          delay,
          ease: "linear"
        }}
        style={{ 
          width: size * 1.5, 
          height: size,
          background: color,
          filter: `blur(${size/5}px) drop-shadow(0 0 5px ${color})`,
          zIndex: 20
        }}
      />
      
      {/* Glow ao redor do cometa */}
      <motion.div
        className="absolute rounded-full"
        initial={{ 
          x, 
          y, 
          opacity: 0,
          rotate: angle,
          scale: 0.5
        }}
        animate={{ 
          x: x + Math.cos(angleRad) * 1500,
          y: y + Math.sin(angleRad) * 1500,
          opacity: [0, opacity * 0.3, 0],
          scale: 1.5
        }}
        transition={{ 
          duration, 
          delay,
          ease: "linear"
        }}
        style={{ 
          width: size * 3, 
          height: size * 3,
          background: color,
          filter: `blur(10px)`,
          zIndex: 5
        }}
      />
    </>
  );
};

const Star = ({ x, y, size, opacity }: { 
  x: number; 
  y: number; 
  size: number;
  opacity: number;
}) => {
  return (
    <div 
      className="absolute bg-white rounded-full"
      style={{ 
        left: x, 
        top: y, 
        width: size, 
        height: size,
        opacity,
        boxShadow: `0 0 ${size}px ${size/2}px rgba(100, 150, 255, 0.1)`
      }} 
    />
  );
};

const getRandomBlueColor = () => {
  const colors = [
    "rgba(100, 150, 255, 1)",    // Azul médio
    "rgba(50, 100, 255, 1)",     // Azul mais intenso
    "rgba(150, 200, 255, 1)",    // Azul claro
    "rgba(70, 130, 255, 1)",     // Azul intermediário
    "rgba(100, 180, 255, 1)",    // Azul céu
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getRandomAngle = () => {
  // Ângulos entre 15 e 75 graus (para cima ou para baixo)
  const baseAngle = Math.random() > 0.5 ? 
    Math.random() * 30 + 15 : 
    Math.random() * 30 - 75;
  return baseAngle;
};

export default function CometShower() {
  const [comets, setComets] = useState<CometType[]>([]);
  const [stars, setStars] = useState<{ 
    x: number; 
    y: number; 
    size: number;
    opacity: number;
  }[]>([]);

  useEffect(() => {
    // Criar estrelas fixas no fundo
    const generatedStars = Array.from({ length: 200 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1
    }));
    setStars(generatedStars);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const angle = getRandomAngle();
      const angleRad = angle * Math.PI / 180;
      
      // Posição inicial aleatória (fora da tela)
      let x, y;
      if (Math.abs(angle) < 45) {
        // Para ângulos mais horizontais, começar nas laterais
        x = Math.random() > 0.5 ? -100 : window.innerWidth + 100;
        y = Math.random() * window.innerHeight;
      } else {
        // Para ângulos mais verticais, começar em cima ou embaixo
        x = Math.random() * window.innerWidth;
        y = angle > 0 ? -100 : window.innerHeight + 100;
      }
      
      const newComet = {
        id: Math.random(),
        x,
        y,
        delay: Math.random() * 0.2,
        size: Math.random() * 4 + 3,
        duration: Math.random() * 3 + 2, // Mais lentos que meteoros
        opacity: Math.random() * 0.7 + 0.3,
        angle,
        tailLength: Math.random() * 300 + 200, // Rastros mais longos
        color: getRandomBlueColor()
      };
      
      setComets((prev) => [...prev, newComet]);

      // Limitar quantidade de cometas na tela
      if (comets.length > 10) {
        setComets((prev) => prev.slice(1));
      }
    }, 500); // Intervalo maior para menos cometas

    return () => clearInterval(interval);
  }, [comets]);

  return (
    <div className="relative w-full h-screen bg-gray-950 overflow-hidden">
      {stars.map(({ x, y, size, opacity }, index) => (
        <Star key={`star-${index}`} x={x} y={y} size={size} opacity={opacity} />
      ))}
      {comets.map((comet) => (
        <Comet key={`comet-${comet.id}`} {...comet} />
      ))}
    </div>
  );
}