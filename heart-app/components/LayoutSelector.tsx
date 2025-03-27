import { useState, useEffect } from "react";
import AnimationGrid from "./animations/animacoes";

interface LayoutSelectorProps {
  onLayoutChange: (layout: string) => void;
  onCarrouselChange: (carrousel: string) => void;
  onAnimatedChange: (animation: string) => void; 
}

const LayoutSelector: React.FC<LayoutSelectorProps> = ({ 
  onLayoutChange, 
  onCarrouselChange,
  onAnimatedChange 
}) => {
  const [layout, setLayout] = useState("padrao");
  const [modCarrosel, setModCarrosel] = useState("padrao");
  const [selectedAnimation, setSelectedAnimation] = useState("");

  useEffect(() => {
    const savedLayout = localStorage.getItem("userLayout");
    const savedCarrousel = localStorage.getItem("userCarrosel");
    const savedAnimation = localStorage.getItem("userAnimation"); // Adicione esta linha
    
    if (savedLayout) {
      setLayout(savedLayout);
      onLayoutChange(savedLayout);
    }
    if (savedCarrousel) {
      setModCarrosel(savedCarrousel);
      onCarrouselChange(savedCarrousel);
    }
    if (savedAnimation) { // Adicione este bloco
      setSelectedAnimation(savedAnimation);
      onAnimatedChange(savedAnimation);
    }
  }, []);

  const handleChange = (selectedLayout: string) => {
    setLayout(selectedLayout);
    localStorage.setItem("userLayout", selectedLayout);
    onLayoutChange(selectedLayout);
  };

  const handleChangeCarrosel = (selectedCarrosel: string) => {
    setModCarrosel(selectedCarrosel);
    localStorage.setItem("userCarrosel", selectedCarrosel);
    onCarrouselChange(selectedCarrosel);
  };

  const handleAnimationSelect = (title: string) => {
    setSelectedAnimation(title);
    localStorage.setItem("userAnimation", title); 
    onAnimatedChange(title); 
  };

  return (
    <div className="container p-4">
      <h2 className="text-lg font-bold m-2">Escolha o Layout do Site</h2>
     <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden">
        <button
          type="button"
          className={`transform relative bg-neutral-800 rounded-xl h-20 overflow-hidden duration-300 hover:opacity-100 cursor-pointer
          ${layout === "padrao" ? "border-2 border-red-500 opacity-100" : "opacity-80"}`}
          onClick={() => handleChange("padrao")}
        >
          Padrão Layout
        </button>
        <button
          type="button"
          className={`transform relative bg-neutral-800 rounded-xl h-20 overflow-hidden duration-300 hover:opacity-100 cursor-pointer ${layout === "netflix"  ? "border-2 border-red-500 opacity-100" : "opacity-80"}`}
          onClick={() => handleChange("netflix")}
        >
          <div className="bg-black text-yellow-500 text-xs font-semibold flex items-center rounded-full px-2 py-1 self-end z-50 absolute bottom-2 right-2">
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
                <path d="M20 3v4" />
                <path d="M22 5h-4" />
                <path d="M4 17v2" />
                <path d="M5 18H3" />
              </svg>
              Destaque
            </div>
          Loveflix Layout
        </button>
      </div>

      {layout === "padrao" && (
        <div>
          <h2 className="text-lg font-bold  m-2">Escolha o Carrossel</h2>
          <div className="grid grid-cols-3 lg:grid-cols-3 gap-4 overflow-hidden">
            <button
              type="button"
               className={`transform relative bg-neutral-800 rounded-xl h-20 overflow-hidden duration-300 hover:opacity-100 cursor-pointer ${modCarrosel === "padrao" ? "border-2 border-red-500 opacity-100" : "opacity-80"}`}
              onClick={() => handleChangeCarrosel("padrao")}
            >
              Padrão
            </button>
            <button
              type="button"
              className={`transform relative bg-neutral-800 rounded-xl h-20 overflow-hidden duration-300 hover:opacity-100 cursor-pointer ${modCarrosel === "cards" ? "border-2 border-red-500 opacity-100" : "opacity-80"}`}
              onClick={() => handleChangeCarrosel("cards")}
            >
              <div className="bg-black text-yellow-500 text-xs font-semibold flex items-center rounded-full px-2 py-1 self-end z-50 absolute bottom-2 right-2">
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
                <path d="M20 3v4" />
                <path d="M22 5h-4" />
                <path d="M4 17v2" />
                <path d="M5 18H3" />
              </svg>
              Destaque
            </div>
              Cards
            </button>
            <button
              type="button"
              className={`transform relative bg-neutral-800 rounded-xl h-20 overflow-hidden duration-300 hover:opacity-100 cursor-pointer ${modCarrosel === "cubo" ? "border-2 border-red-500 opacity-100" : "opacity-80"}`}
              onClick={() => handleChangeCarrosel("cubo")}
            >
              <div className="bg-black text-yellow-500 text-xs font-semibold flex items-center rounded-full px-2 py-1 self-end z-50 absolute bottom-2 right-2">
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
                <path d="M20 3v4" />
                <path d="M22 5h-4" />
                <path d="M4 17v2" />
                <path d="M5 18H3" />
              </svg>
              Destaque
            </div>
              Cubo
            </button>
          </div>

          <AnimationGrid onSelect={handleAnimationSelect} />

      </div>
      )}
    </div>
  );
};

export default LayoutSelector;
