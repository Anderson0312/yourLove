import React from "react";

interface TextDatingProps {
  name: string;
  text: string;
}

export default function TextDating({ name, text }: TextDatingProps) {
  return (
      <section className="relative w-full max-w-3xl mx-auto w-full p-6 text-center  sm:p-10 max-w-md text-center "
      style={{ fontFamily: "'Dancing Script', serif", fontStyle: "italic" }}>
        <h2
          className="text-2xl sm:text-3xl font-semi-bold text-red-600 mb-4 italic"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {name || "Seus Nomes"}
        </h2>
        <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            {text|| "Seu Texto..."}
        </p>
      </section>
  );
}
