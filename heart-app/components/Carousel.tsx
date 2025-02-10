import React, { useState, useEffect } from 'react';

interface CarouselProps {
  images?: string[] | null; // Permite que seja null
  autoPlay?: boolean;
  interval?: number;
}

const Carousel: React.FC<CarouselProps> = ({ images = [], autoPlay = true, interval = 3000 }) => {
  const validImages = images ?? []; // Garante que seja um array, mesmo se for null
  const totalImages = validImages.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Avançar para o próximo slide
  const nextSlide = () => {
    if (totalImages > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }
  };

  // Voltar para o slide anterior
  const prevSlide = () => {
    if (totalImages > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
    }
  };

  // Efeito para o autoPlay
  useEffect(() => {
    if (autoPlay && totalImages > 1) {
      const timer = setInterval(nextSlide, interval);
      return () => clearInterval(timer);
    }
  }, [autoPlay, interval, totalImages, currentIndex]);

  // Adiciona o domínio do backend ao caminho da imagem
  const getFullImageUrl = (imagePath: string) => {
    return `https://heart-app-backend.vercel.app${imagePath}`;
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto overflow-hidden">
      {/* Contêiner das imagens */}
      <div className="relative h-64" style={{ height: '30rem' }}>
        {totalImages > 0 ? (
          validImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out rounded-lg ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${getFullImageUrl(image)})` }}
              aria-hidden={index !== currentIndex}
              role="img"
              aria-label={`Slide ${index + 1}`}
            />
          ))
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-lg">
            <p className="text-gray-500">Nenhuma imagem disponível</p>
          </div>
        )}
      </div>

      {/* Botão Anterior */}
      {totalImages > 1 && (
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75"
          onClick={prevSlide}
          aria-label="Slide anterior"
        >
          &#8592;
        </button>
      )}

      {/* Botão Próximo */}
      {totalImages > 1 && (
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75"
          onClick={nextSlide}
          aria-label="Próximo slide"
        >
          &#8594;
        </button>
      )}

      {/* Indicadores */}
      {totalImages > 1 && (
        <div className="flex justify-center space-x-2 mt-2">
          {validImages.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-red-600 scale-125' : 'bg-red-400'
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Ir para o slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
