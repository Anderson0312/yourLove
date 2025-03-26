import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const AuroraBorealis = () => {
  const constraintsRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Cores realistas da aurora (baseadas em fotos reais)
  const colors = [
    "rgba(46, 194, 112, 0.4)",  // Verde vibrante
    "rgba(62, 207, 142, 0.3)",   // Verde-água
    "rgba(100, 200, 255, 0.3)",  // Azul claro
    "rgba(150, 100, 255, 0.3)",  // Roxo suave
    "rgba(0, 255, 196, 0.2)",    // Verde-ciano
  ];

  // Textura de ruído para maior realismo
  const noiseTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`;

  // Animação mais orgânica
  useEffect(() => {
    const animateAurora = async () => {
      while (true) {
        await animate(x, [0, 40, -30, 20, 10, 0], {
          duration: 120,
          ease: "linear",
        });
        await animate(y, [0, 20, -15, 10, 5, 0], {
          duration: 90,
          ease: "linear",
        });
      }
    };
    animateAurora();
  }, [x, y]);

  return (
    <div 
      ref={constraintsRef}
      className="relative w-full h-screen bg-gray-950 overflow-hidden"
    >
      {/* Camadas principais da aurora (5 camadas) */}
      {[0, 1, 2, 3, 4].map((layer) => (
        <motion.div
          key={layer}
          className="absolute top-0 left-0 w-full h-1/2 pointer-events-none"
          style={{
            x: useTransform(x, (val) => val * (layer + 1) * 0.25),
            y: useTransform(y, (val) => val * (layer + 1) * 0.15 + layer * 15),
            background: `linear-gradient(0deg, transparent 10%, ${colors[layer % colors.length]} 60%, transparent 90%)`,
            filter: `blur(${12 + layer * 4}px)`,
            clipPath: generateOrganicPath(layer),
            opacity: 0.4 + layer * 0.08,
            mixBlendMode: 'screen',
            backgroundImage: noiseTexture,
          }}
          animate={{
            clipPath: [
              generateOrganicPath(layer, 0),
              generateOrganicPath(layer, 1),
              generateOrganicPath(layer, 2),
              generateOrganicPath(layer, 0),
            ],
          }}
          transition={{
            duration: 80 + layer * 20,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Camadas de brilho intenso */}
      {[0, 1, 2].map((layer) => (
        <motion.div
          key={`highlight-${layer}`}
          className="absolute top-0 left-0 w-full h-1/3 pointer-events-none"
          style={{
            x: useTransform(x, (val) => val * (layer + 1) * 0.2),
            y: useTransform(y, (val) => val * (layer + 1) * 0.1 + 50 + layer * 10),
            background: `radial-gradient(ellipse at center, rgba(100, 255, 200, ${0.2 + layer * 0.05}) 0%, transparent 70%)`,
            filter: `blur(${15 + layer * 5}px)`,
            opacity: 0.3,
          }}
          animate={{
            opacity: [0.2, 0.4, 0.3, 0.35, 0.2],
            scaleX: [1, 1.05, 0.95, 1.02, 1],
          }}
          transition={{
            duration: 30 + layer * 10,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Estrelas ultra pequenas e realistas */}
      {Array.from({ length: 600 }).map((_, i) => {
        const size = Math.random() * 0.8 + 0.2;
        return (
          <div
            key={i}
            className="absolute bg-white rounded-full pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${size}px`,
              height: `${size}px`,
              opacity: Math.random() * 0.5 + 0.1,
              animation: `twinkle ${Math.random() * 10 + 5}s infinite alternate`,
              transform: `scale(${Math.random() * 0.5 + 0.8})`,
            }}
          />
        );
      })}

      {/* Estrelas cadentes ocasionais */}
      <OccasionalShootingStars />

      {/* Reflexo no solo */}
      <div className="absolute bottom-0 w-full h-40 pointer-events-none">
        <div className="relative w-full h-full overflow-hidden">
          {[0, 1, 2].map((layer) => (
            <motion.div
              key={`reflection-${layer}`}
              className="absolute bottom-0 left-0 w-full h-full"
              style={{
                x: useTransform(x, (val) => val * (layer + 1) * 0.15),
                background: `linear-gradient(0deg, rgba(46, 194, 112, ${0.02 + layer * 0.01}) 0%, transparent 100%)`,
                filter: `blur(${5 + layer * 3}px)`,
                opacity: 0.1,
              }}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: ${Math.random() * 0.3 + 0.1}; }
          50% { opacity: ${Math.random() * 0.7 + 0.3}; }
        }
      `}</style>
    </div>
  );
};

// Componente para estrelas cadentes ocasionais
const OccasionalShootingStars = () => {
  const [stars, setStars] = useState<Array<{id: number, x: number, y: number}>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% de chance de aparecer
        setStars(prev => [...prev, {
          id: Math.random(),
          x: Math.random() * 100,
          y: Math.random() * 50,
        }]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (stars.length > 3) {
      setStars(prev => prev.slice(1));
    }
  }, [stars.length]);

  return (
    <>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white pointer-events-none"
          initial={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: '1px',
            height: '1px',
            opacity: 0,
            transform: 'rotate(-45deg)',
          }}
          animate={{
            x: 200,
            y: 200,
            opacity: [0, 1, 0],
            width: '80px',
            height: '1px',
          }}
          transition={{
            duration: 1.5,
            ease: "linear",
          }}
          style={{
            boxShadow: '0 0 5px 1px rgba(100, 200, 255, 0.7)',
            background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(100,200,255,0) 100%)',
          }}
          onAnimationComplete={() => {
            setStars(prev => prev.filter(s => s.id !== star.id));
          }}
        />
      ))}
    </>
  );
};

// Gerador de formas orgânicas para a aurora
const generateOrganicPath = (layer: number, variation: number = 0) => {
  const points = [];
  const steps = 10;
  const amplitude = 30 + layer * 10;
  const yBase = 20 + layer * 8;
  const height = 15 + layer * 5;

  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * 100;
    const noise = Math.sin((i / steps) * Math.PI * 2 + variation * 2) * amplitude;
    
    if (i === 0) {
      points.push(`0% ${yBase + noise * 0.3}%`);
    } else if (i === steps) {
      points.push(`100% ${yBase + noise * 0.3}%`);
    } else {
      points.push(`${x}% ${yBase + noise}%`);
    }
  }

  for (let i = steps; i >= 0; i--) {
    const x = (i / steps) * 100;
    const noise = Math.sin((i / steps) * Math.PI * 2 + variation * 2) * amplitude * 0.7;
    points.push(`${x}% ${yBase + height + noise}%`);
  }

  return `polygon(${points.join(", ")})`;
};

export default AuroraBorealis;