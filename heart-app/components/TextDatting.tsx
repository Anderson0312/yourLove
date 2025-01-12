import React from "react";

interface TextDatingProps {
  name: string;
}

export default function TextDating({ name }: TextDatingProps) {
  return (
      <section className="p-6 sm:p-10 max-w-md text-center"
      style={{ fontFamily: "'Dancing Script', serif", fontStyle: "italic" }}>
        <h2
          className="text-2xl sm:text-3xl font-bold text-red-600 mb-4 italic"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {name || "Nome não fornecido"}
        </h2>
        <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
          {name ? (
            `Desde o momento em que te conheci, meu mundo ganhou novas cores e meu coração encontrou um lar. Cada dia ao seu lado é uma nova aventura, repleta de risos, carinho e felicidade. Você é minha inspiração, minha paz e minha razão de sorrir. Te amo mais do que palavras podem expressar, e sou grato por ter você ao meu lado, hoje e sempre.`
          ) : (
            "Por favor, forneça um nome para descobrir algo especial sobre essa pessoa!"
          )}
        </p>
      </section>
  );
}
