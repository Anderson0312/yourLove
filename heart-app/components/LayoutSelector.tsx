// components/LayoutSelector.tsx
import { useState, useEffect } from "react";

const LayoutSelector = ({ onLayoutChange }: { onLayoutChange: (layout: string) => void }) => {
  const [layout, setLayout] = useState("padrao");

  useEffect(() => {
    const savedLayout = localStorage.getItem("userLayout");
    if (savedLayout && savedLayout !== layout) {
      setLayout(savedLayout);
      onLayoutChange(savedLayout);
    }
  }, []); 

  const handleChange = (selectedLayout: string) => {
    setLayout(selectedLayout);
    localStorage.setItem("userLayout", selectedLayout);
    onLayoutChange(selectedLayout);
  };

  return (
    <div className="flex gap-4">
      <button
        type="button"
        className={` py-2 px-4 rounded ${layout === "padrao" ? "bg-red-500 " : "bg-gray-600"}`}
        onClick={() => handleChange("padrao")}
      >
        Padrão Layout
      </button>
      <button
        type="button"

        className={` py-2 px-4 rounded ${layout === "netflix" ? "bg-red-500 " : "bg-gray-600"}`}
        onClick={() => handleChange("netflix")}
      >
        Loveflix Layout
      </button>
      
    </div>
  );
};

export default LayoutSelector;
