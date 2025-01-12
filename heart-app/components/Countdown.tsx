'use client'
import React, { useEffect, useState } from "react";

interface CountdownProps {
  startDate: string; // Data inicial no formato ISO ou similar
}

const Countdown: React.FC<CountdownProps> = ({ startDate }) => {
  const [timeDiff, setTimeDiff] = useState({
    years : 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const start = new Date(startDate);
      const now = new Date(
        new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
      );

      const diff = now.getTime() - start.getTime();

      const years  = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44)) - years * 12;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeDiff({ years , months, days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval); // Cleanup
  }, [startDate]);

  return (
    <div className="grid grid-cols-2 gap-5 p-4 justify-center items-center">
      {Object.entries(timeDiff).map(([label, value]) => (
        <div
          key={label}
          className="flex flex-col items-center justify-center w-20 h-20 bg-gray-100 border border-gray-300 rounded shadow"
        >
          <span className="text-2xl font-bold text-gray-700">{value}</span>
          <span className="text-sm text-gray-500 uppercase">{label}</span>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
