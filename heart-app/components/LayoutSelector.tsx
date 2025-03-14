import { useState, useEffect } from "react";

interface LayoutSelectorProps {
  onLayoutChange: (layout: string) => void;
  onCarrouselChange: (carrousel: string) => void;
}

const LayoutSelector: React.FC<LayoutSelectorProps> = ({ onLayoutChange, onCarrouselChange }) => {
  const [layout, setLayout] = useState("padrao");
  const [modCarrosel, setModCarrosel] = useState("padrao");

  useEffect(() => {
    const savedLayout = localStorage.getItem("userLayout");
    const savedCarrousel = localStorage.getItem("userCarrosel");
    
    if (savedLayout) {
      setLayout(savedLayout);
      onLayoutChange(savedLayout);
    }
    if (savedCarrousel) {
      setModCarrosel(savedCarrousel);
      onCarrouselChange(savedCarrousel);
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

  return (
    <div className="container p-4">
      <div className="flex gap-4 justify-center mb-4">
        <button
          type="button"
          className={`py-2 px-4 rounded ${layout === "padrao" ? "bg-red-500" : "border"}`}
          onClick={() => handleChange("padrao")}
        >
          Padrão Layout
        </button>
        <button
          type="button"
          className={`py-2 px-4 rounded ${layout === "netflix" ? "bg-red-500" : "border"}`}
          onClick={() => handleChange("netflix")}
        >
          Loveflix Layout
        </button>
      </div>

      {layout === "padrao" && (
        <div>
          <h3 className="text-lg font-bold text-center mb-2">Escolha o Carrossel</h3>
          <div className="flex gap-4 justify-center">
            <button
              type="button"
              className={`py-2 px-4 rounded ${modCarrosel === "padrao" ? "bg-red-500" : "border"}`}
              onClick={() => handleChangeCarrosel("padrao")}
            >
              Padrão
            </button>
            <button
              type="button"
              className={`py-2 px-4 rounded ${modCarrosel === "cards" ? "bg-red-500" : "border"}`}
              onClick={() => handleChangeCarrosel("cards")}
            >
              Cards
            </button>
            <button
              type="button"
              className={`py-2 px-4 rounded ${modCarrosel === "cubo" ? "bg-red-500" : "border"}`}
              onClick={() => handleChangeCarrosel("cubo")}
            >
              Cubo
            </button>
          </div>

      {/* <h3 className="text-lg font-bold text-center mb-2 mt-4">Escolha Modelo de Data</h3>
      <div className="flex gap-4 justify-center">
        <button
          type="button"
          className={`py-2 px-4 rounded ${modCarrosel === "padrao" ? "bg-red-500" : "border"}`}
          onClick={() => handleChangeCarrosel("padrao")}
        >
          Padrão
        </button>
        <button
          type="button"
          className={`py-2 px-4 rounded ${modCarrosel === "classico" ? "bg-red-500" : "border"}`}
          onClick={() => handleChangeCarrosel("classico")}
        >
          Clássico
        </button>
      </div> */}
      </div>
      )}
    </div>
  );
};

export default LayoutSelector;
