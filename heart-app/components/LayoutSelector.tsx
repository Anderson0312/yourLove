// components/LayoutSelector.tsx
import { useState, useEffect } from "react";

const LayoutSelector = ({ onLayoutChange }: { onLayoutChange: (layout: string) => void }) => {
  const [layout, setLayout] = useState("padrao");

  useEffect(() => {
    const savedLayout = localStorage.getItem("userLayout");
    if (savedLayout) {
      setLayout(savedLayout);
      onLayoutChange(savedLayout);
    }
  }, [onLayoutChange]);

  const handleChange = (selectedLayout: string) => {
    setLayout(selectedLayout);
    localStorage.setItem("userLayout", selectedLayout);
    onLayoutChange(selectedLayout);
  };

  return (
    <div className="flex gap-4">
      <button
        type="button"

        className={` py-2 px-4 rounded ${layout === "Netflix" ? "bg-red-500 " : "bg-gray-600"}`}
        onClick={() => handleChange("Netflix")}
      >
        Netflix Layout
      </button>
      <button
        type="button"
        className={` py-2 px-4 rounded ${layout === "padrao" ? "bg-red-500 " : "bg-gray-600"}`}
        onClick={() => handleChange("padrao")}
      >
        Padrão Layout
      </button>
    </div>
  );
};

export default LayoutSelector;
