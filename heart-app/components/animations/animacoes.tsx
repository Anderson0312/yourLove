import React, { useState } from "react";

const animations = [
  { title: "Nenhuma", video: "", highlight: false },
  { title: "Chuva de corações", video: "/videos/features/hearts-animation.webm", highlight: false },
  { title: "Céu Estrelado com Cometas", video: "/videos/features/stars-animation.webm", highlight: true },
  { title: "Céu Estrelado com Meteoros", video: "/videos/features/meteors-animation.webm", highlight: true },
  { title: "Aurora", video: "/videos/features/aurora-animation.webm", highlight: true },
  { title: "Vórtice de cores", video: "/videos/features/vortex-animation.webm", highlight: true },
];

const AnimationGrid = ({ onSelect }) => {
  const [selectedAnimation, setSelectedAnimation] = useState(null);

  const handleSelect = (anim:any) => {
    setSelectedAnimation(anim.title);
    if (onSelect) onSelect(anim.title); // Enviar para o pai se existir a função
  };

  return (
    <>
    {/* <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-white text-3xl lg:text-4xl font-sans py-2 relative z-20 font-bold tracking-tight">Animação de fundo</h2> */}
    <h2 className="text-lg font-bold m-2">Animação de fundo</h2>
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden">
      {animations.map((anim, index) => (
        <div
          key={index}
          onClick={() => handleSelect(anim)}
          className={`transform relative bg-neutral-800 rounded-xl h-20 overflow-hidden duration-300 hover:opacity-100 cursor-pointer 
            ${selectedAnimation === anim.title ? "border-2 border-red-500 opacity-100" : "opacity-80"}
            ${anim.highlight ? "border border-neutral-500" : ""}
          `}
        >
          {anim.video && (
            <video
              preload="metadata"
              autoPlay
              loop
              playsInline
              src={anim.video}
              className="absolute inset-0 rounded-lg flex-shrink-0 h-full brightness-125 w-full object-cover"
            />
          )}
          <div className="z-50 absolute top-4 left-4 max-w-xs">
            <h2 className="font-semibold text-white">{anim.title}</h2>
          </div>
          {anim.highlight && (
            <div className="bg-black text-yellow-500 text-xs font-semibold flex items-center rounded-full px-2 py-[2px] z-50 absolute bottom-2 right-2">
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
                className="lucide lucide-sparkles"
              >
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                <path d="M20 3v4" />
                <path d="M22 5h-4" />
                <path d="M4 17v2" />
                <path d="M5 18H3" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
    </>
  );
};

export default AnimationGrid;
