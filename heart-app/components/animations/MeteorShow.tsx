import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type MeteorType = {
  id: number;
  x: number;
  y: number;
  delay: number;
  size: number;
  duration: number;
  opacity: number;
  color: string;
  tailLength: number;
};

const Meteor = ({ 
  x, y, delay, size, duration, opacity, color, tailLength 
}: { 
  x: number; 
  y: number; 
  delay: number; 
  size: number;
  duration: number;
  opacity: number;
  color: string;
  tailLength: number;
}) => {
  return (
    <>
      {/* Corpo principal do meteoro */}
      <motion.div
        className="absolute rounded-full"
        initial={{ 
          x, 
          y, 
          opacity: 0,
          rotate: 40, // Inclinação de 40 graus
          boxShadow: "0 0 10px 2px rgba(255,255,255,0.8)"
        }}
        animate={{ 
          x: x + 1000, // Movimento horizontal
          y: y + 1000 * Math.tan(40 * Math.PI / 180), // Calcula o deslocamento vertical para 40 graus
          opacity: [0, opacity, 0],
        }}
        transition={{ 
          duration, 
          delay,
          ease: "linear"
        }}
        style={{ 
          width: size, 
          height: size/8, // Formato muito alongado
          background: color,
          filter: `blur(${size/10}px)`,
          zIndex: 10
        }}
      />
      
      {/* Rastro do meteoro */}
      <motion.div
        className="absolute"
        initial={{ 
          x, 
          y, 
          opacity: 0,
          rotate: 40,
          width: 0
        }}
        animate={{ 
          x: x + 1000,
          y: y + 1000 * Math.tan(40 * Math.PI / 180),
          opacity: [0, opacity * 0.7, 0],
          width: tailLength
        }}
        transition={{ 
          duration, 
          delay,
          ease: "linear"
        }}
        style={{ 
          height: 1,
          background: `linear-gradient(90deg, transparent, ${color.split(' ')[2]})`,
          filter: `blur(1px)`,
          transformOrigin: "left center"
        }}
      />
    </>
  );
};

const Star = ({ x, y, size, opacity, twinkle }: { 
  x: number; 
  y: number; 
  size: number;
  opacity: number;
  twinkle: boolean;
}) => {
  return (
    <motion.div 
      className="absolute bg-white rounded-full"
      initial={{ opacity }}
      animate={twinkle ? { 
        opacity: [opacity, opacity*0.3, opacity],
        scale: [1, 0.9, 1]
      } : {}}
      transition={twinkle ? { 
        duration: Math.random() * 3 + 2,
        repeat: Infinity,
        repeatType: "reverse" 
      } : {}}
      style={{ 
        left: x, 
        top: y, 
        width: size, 
        height: size,
        boxShadow: "0 0 2px 1px rgba(255,255,255,0.3)" // Brilho mais suave
      }} 
    />
  );
};

const getRandomColor = () => {
  const colors = [
    "rgba(255, 255, 255, 1)", // Branco puro
    "rgba(255, 200, 200, 1)", // Vermelho claro
    "rgba(255, 255, 200, 1)", // Amarelo claro
    "rgba(200, 255, 255, 1)", // Azul claro
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default function MeteorShower() {
  const [meteors, setMeteors] = useState<MeteorType[]>([]);
  const [stars, setStars] = useState<{ 
    x: number; 
    y: number; 
    size: number;
    opacity: number;
    twinkle: boolean;
  }[]>([]);

  useEffect(() => {
    // Criar estrelas fixas no fundo (menores e mais numerosas)
    const generatedStars = Array.from({ length: 300 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1 + 0.1, // Estrelas bem pequenas
      opacity: Math.random() * 0.7 + 0.1,
      twinkle: Math.random() > 0.8 // 20% das estrelas piscam
    }));
    setStars(generatedStars);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newMeteor = {
        id: Math.random(),
        x: -50, // Começa fora da tela à esquerda
        y: Math.random() * window.innerHeight, // Posição vertical aleatória
        delay: Math.random() * 0.3,
        size: Math.random() * 6 + 2,
        duration: Math.random() * 1.5 + 0.8,
        opacity: Math.random() * 0.8 + 0.2,
        color: getRandomColor(),
        tailLength: Math.random() * 200 + 100 // Comprimento do rastro variável
      };
      setMeteors((prev) => [...prev, newMeteor]);

      // Limitar quantidade de meteoros na tela
      if (meteors.length > 15) {
        setMeteors((prev) => prev.slice(1));
      }
    }, 300);

    return () => clearInterval(interval);
  }, [meteors]);

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden">
      {stars.map(({ x, y, size, opacity, twinkle }, index) => (
        <Star key={`star-${index}`} x={x} y={y} size={size} opacity={opacity} twinkle={twinkle} />
      ))}
      {meteors.map(({ id, x, y, delay, size, duration, opacity, color, tailLength }) => (
        <Meteor 
          key={`meteor-${id}`} 
          x={x} 
          y={y} 
          delay={delay} 
          size={size} 
          duration={duration}
          opacity={opacity}
          color={color}
          tailLength={tailLength}
        />
      ))}
    </div>
  );
}