'use client'
import React, { useEffect, useState } from "react";

interface CountdownProps {
  startDate: Date;
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
    const calculateTimeDiff = (start: Date, end: Date) => {
      let years = end.getFullYear() - start.getFullYear();
      let months = end.getMonth() - start.getMonth();
      let days = end.getDate() - start.getDate();
      let hours = end.getHours() - start.getHours();
      let minutes = end.getMinutes() - start.getMinutes();
      let seconds = end.getSeconds() - start.getSeconds();

      // Ajuste para valores negativos
      if (seconds < 0) {
        seconds += 60;
        minutes--;
      }
      if (minutes < 0) {
        minutes += 60;
        hours--;
      }
      if (hours < 0) {
        hours += 24;
        days--;
      }
      if (days < 0) {
        const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
      }
      if (months < 0) {
        months += 12;
        years--;
      }

      return { years, months, days, hours, minutes, seconds };
    };

    const updateCountdown = () => {
      // Ajuste para o fuso horário de São Paulo
      const start = new Date(new Date(startDate).getTime() - 3 * 60 * 60 * 1000);
      const now = new Date(
        new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
      );

      const diff = calculateTimeDiff(start, now);

      setTimeDiff({
        anos: diff.years,
        meses: diff.months,
        dias: diff.days,
        horas: diff.hours,
        minutos: diff.minutes,
        segundos: diff.seconds,
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className="grid grid-cols-2 gap-2 p-2 items-center justify-items-center">
      {Object.entries(timeDiff).map(([label, value]) => (
        <div
          key={label}
          className="flex flex-col items-center justify-center w-20 h-20 rounded-lg shadow"
          style={{ width: "90%", backgroundColor: '#131313' }}
        >
          <span className="text-2xl font-bold text-white-700">{value}</span>
          <span 
            className="text-sm font-medium text-white-500 uppercase" 
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Countdown;