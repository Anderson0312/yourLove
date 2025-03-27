import React, { useState } from "react";

import FallingHearts from "./FallingHearts";
import CometShower from "./CometasShow";
import MeteorShower from "./MeteorShow";
import AuroraBorealis from "./Aurora";
import VorticeCores from "./VorticeCores";

type AnimationType = {
  title: string;
  component: React.ReactNode | null;
  highlight: boolean;
  bgClass: string;
};

// Tipo para as props do componente
type AnimationGridProps = {
  onSelect?: (title: string) => void;
};

const animations:AnimationType[] = [
  { 
    title: "Nenhuma", 
    component: null,
    highlight: false,
    bgClass: "bg-neutral-800"
  },
  { 
    title: "Chuva de corações", 
    component: <FallingHearts />,
    highlight: false,
    bgClass: "bg-pink-900/50"
  },
  { 
    title: "Céu Estrelado com Cometas", 
    component: <CometShower />,
    highlight: true,
    bgClass: "bg-blue-900/50"
  },
  { 
    title: "Céu Estrelado com Meteoros", 
    component: <MeteorShower />,
    highlight: true,
    bgClass: "bg-purple-900/50"
  },
  { 
    title: "Aurora", 
    component: <AuroraBorealis />,
    highlight: true,
    bgClass: "bg-teal-900/50"
  },
  { 
    title: "Vórtice de cores", 
    component: <VorticeCores />,
    highlight: true,
    bgClass: "bg-indigo-900/50"
  },
];



const AnimationGrid: React.FC<AnimationGridProps> = ({ onSelect }) => {
  const [selectedAnimation, setSelectedAnimation] = useState<string | null>(null);

  const handleSelect = (anim: AnimationType) => {
    setSelectedAnimation(anim.title);
    if (onSelect) onSelect(anim.title);
  };

  return (
    <>
      <h2 className="text-lg font-bold m-2">Animação de fundo</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {animations.map((anim) => (
          <button
            key={anim.title}
            type='button'
            onClick={() => handleSelect(anim)}
            className={`relative rounded-xl h-20 overflow-hidden duration-300 hover:opacity-100 cursor-pointer 
              ${selectedAnimation === anim.title ? "ring-2 ring-red-500 opacity-100" : "opacity-80"}
              ${anim.highlight ? "ring-1 ring-neutral-500" : ""}
              ${anim.bgClass}
              transition-all
            `}
          >
            {/* Container da animação que ocupa todo o botão */}
            <div className=" absolute inset-0 w-full h-full">
            {anim.component && React.cloneElement(anim.component as React.ReactElement<{ 
                style: React.CSSProperties;
                className: string;
              }>, {
                style: { 
                  pointerEvents: 'none',
                  transform: 'scale(1.5)'
                },
                className: 'w-full h-full absolute inset-0'
              })}
            </div>
            
            {/* Título e destaque */}
            <div className="relative z-10 p-2 h-full flex flex-col justify-between">
              <h2 className="font-semibold text-white text-left text-sm drop-shadow-md">
                {anim.title}
              </h2>
              {anim.highlight && (
                <div className="bg-black/80 text-yellow-400 text-xs font-semibold flex items-center rounded-full px-2 py-1 self-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-sparkles mr-1"
                  >
                    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                  </svg>
                  Destaque
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </>
  );
};

export default AnimationGrid;