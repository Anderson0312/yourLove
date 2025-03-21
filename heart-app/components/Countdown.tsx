'use client'
import React, { useEffect, useState } from "react";

interface CountdownProps {
  startDate: Date; // Data inicial no formato ISO ou similar
}



const Countdown: React.FC<CountdownProps> = ({ startDate }) => {
  const [timeDiff, setTimeDiff] = useState({
    anos: 0,
    meses: 0,
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const start = new Date(startDate);
      const now = new Date(
        new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
      );

      let diff = now.getTime() - start.getTime();

      // Cálculo de anos
      const anos = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      diff -= anos * 1000 * 60 * 60 * 24 * 365.25;

      // Cálculo de meses
      const meses = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44));
      diff -= meses * 1000 * 60 * 60 * 24 * 30.44;

      // Cálculo de dias
      const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff -= dias * 1000 * 60 * 60 * 24;

      // Cálculo de horas, minutos e segundos
      const horas = Math.floor(diff / (1000 * 60 * 60));
      diff -= horas * 1000 * 60 * 60;

      const minutos = Math.floor(diff / (1000 * 60));
      diff -= minutos * 1000 * 60;

      const segundos = Math.floor(diff / 1000);

      // Atualizar o estado com os valores calculados
      setTimeDiff({ anos, meses, dias, horas, minutos, segundos });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval); // Cleanup
  }, [startDate]);

  return (
    <div className="grid grid-cols-2 gap-2 p-2 items-center justify-items-center">
      {Object.entries(timeDiff).map(([label, value]) => (
        <div
          key={label}
          className="flex flex-col items-center justify-center w-20 h-20   rounded-lg shadow"
          style={{ width: "8rem", backgroundColor:'#131313'}}
          >
          <span className="text-2xl font-bold text-white-700">{value}</span>
          <span className="text-sm font-medium text-white-500 uppercase" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>{label}</span>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
