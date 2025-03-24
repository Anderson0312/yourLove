import React, { useState, useEffect } from 'react';
import { useSwipeable } from "react-swipeable";

interface CarouselProps {
  images?: string[] | null; // Permite que seja null
  autoPlay?: boolean;
  interval?: number;
  preview?: boolean;
  variant?: string;
}

const Carousel: React.FC<CarouselProps> = ({ images = [], autoPlay = true, interval = 3000 , preview = false, variant = "padrao",}) => {
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

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex((prev) => (prev + 1) % totalImages),
    onSwipedRight: () => setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages),
    trackMouse: true,
  });

  // Efeito para o autoPlay
  useEffect(() => {
    if (autoPlay && totalImages > 1) {
      const timer = setInterval(nextSlide, interval);
      return () => clearInterval(timer);
    }
  }, [autoPlay, interval, totalImages, currentIndex]);

  // Adiciona o domínio do backend ao caminho da imagem
  const getFullImageUrl = (imagePath: string) => {
    return `${imagePath}`;
  };

  return (
    // <div className="relative w-full max-w-3xl mx-auto overflow-hidden">
    //   {/* Contêiner das imagens */}
    //   <div className="relative h-64" style={{ height: preview ? '21em' : '30rem' }}>
    //     {totalImages > 0 ? (
    //       validImages.map((image, index) => (
    //         <div
    //           key={index}
    //           className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out rounded-lg ${
    //             index === currentIndex ? 'opacity-100' : 'opacity-0'
    //           }`}
    //           style={{ backgroundImage: `url(${getFullImageUrl(image)})` }}
    //           aria-hidden={index !== currentIndex}
    //           role="img"
    //           aria-label={`Slide ${index + 1}`}
    //         />
    //       ))
    //     ) : (
    //       <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-lg">
    //         <p className="text-gray-500">Nenhuma imagem disponível</p>
    //       </div>
    //     )}
    //   </div>

    //   {/* Botão Anterior */}
    //   {totalImages > 1 && (
    //     <button
    //       className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3"
    //       onClick={prevSlide}
    //       aria-label="Slide anterior"
    //     >
    //       ❮
    //     </button>
    //   )}

    //   {/* Botão Próximo */}
    //   {totalImages > 1 && (
    //     <button
    //       className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3"
    //       onClick={nextSlide}
    //       aria-label="Próximo slide"
    //     >
    //       ❯
    //     </button>
    //   )}


    //   {/* Indicadores */}
    //   {totalImages > 1 && (
    //     <div className="flex justify-center space-x-2 mt-2">
    //       {validImages.map((_, index) => (
    //         <button
    //           key={index}
    //           className={`w-2 h-2 rounded-full transition-all duration-300 ${
    //             index === currentIndex ? 'bg-red-600 scale-125' : 'bg-red-400'
    //           }`}
    //           onClick={() => setCurrentIndex(index)}
    //           aria-label={`Ir para o slide ${index + 1}`}
    //         />
    //       ))}
    //     </div>
    //   )}
    // </div>


<div className="relative w-full max-w-3xl mx-auto overflow-hidden">
      {variant === "padrao" && (
        <div  {...handlers} className="relative h-64" style={{ height: preview ? "21em" : "30rem" }}>
          {totalImages > 0 ? (
            validImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out rounded-lg ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
                style={{ backgroundImage: `url(${getFullImageUrl(image)})` }}
                aria-hidden={index !== currentIndex}
                role="img"
                aria-label={`Slide ${index + 1}`}
              />
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded-lg">
              <p className="text-gray-500">Nenhuma imagem disponível</p>
            </div>
          )}
        </div>
      )}

      {variant === "cubo" && (
        <div className="perspective">
        <div 
         {...handlers} 
          className="cube h-64 "
          style={{
            transform: `rotateY(${currentIndex * -90}deg)`,
            transition: 'transform 0.8s ease-in-out',
          }}
        >
           {totalImages > 0 ? (
            validImages.map((image, index) => (
            <div
              key={index}
              className="cube-face"
              style={{
               backgroundImage: `url(${getFullImageUrl(image)})` ,
                transform: `rotateY(${index * 90}deg) translateZ(200px)`,
              }}
            />
          ))
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded-lg">
            <p className="text-gray-500">Nenhuma imagem disponível</p>
          </div>
        )}
        </div>
      </div>
      )}

      {variant === "cards" && (
        <div
        {...handlers} 
          className="flex transition-transform duration-700 ease-in-out relative h-64"
          style={{ height: preview ? "21em" : "30rem", transform: `translateX(-${currentIndex * 105}%)` }}
        >
          {totalImages > 0 ? (
            validImages.map((image, index) => (
              <div
                key={index}
                className={` min-w-[100%] mx-2 bg-cover bg-center  shadow-lg transition-transform duration-700 ${
                  index === currentIndex ? "scale-105 opacity-100" : "scale-90 opacity-75"
                }`}
                style={{ backgroundImage:  `url(${getFullImageUrl(image)})`}}
              />
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded-lg">
              <p className="text-gray-500">Nenhuma imagem disponível</p>
            </div>
          )}
        </div>
      )}

      {totalImages > 1 && (
        <>
          <button className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3" onClick={prevSlide}>
            ❮
          </button>
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3" onClick={nextSlide}>
            ❯
          </button>
          <div className="flex justify-center space-x-2 mt-2">
            {validImages.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-red-600 scale-125" : "bg-red-400"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </>
      )}


        <style jsx>{`
          .perspective {
            perspective: 1000px;
            height: ${preview ? '21em' : '30rem'};
            display: flex;
            justify-content: center;
            align-items: center;
          }
  
          .cube {
            position: relative;
            width: 400px;
            height: 400px;
            transform-style: preserve-3d;
          }
  
          .cube-face {
            position: absolute;
            width: 100%;
            height: 85%;
            background-size: cover;
            background-position: center;
          }
        `}</style>

    </div>
  );
};

export default Carousel;
