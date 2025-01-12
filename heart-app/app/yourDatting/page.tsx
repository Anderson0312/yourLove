import Carousel from "@/components/Carousel";
import Countdown from "@/components/Countdown";
import MusicPlayer from "@/components/MusicPlayer";
import TextDatting from "@/components/TextDatting";

export default function Home() {
    const images = [
        '/img1.jpg',
        '/img2.jpg',
        
      ];

    const name = 'Anderson e Luana';
    const startDate = '2024-12-14'

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-2xl font-bold mb-6 text-red-600 text-center"
        style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
        Nosso Cantinho
        </h1>
        <Carousel images={images} autoPlay={true} interval={5000} />
        <TextDatting name={name}/>
        <h3 className="text-sm font-bold mt-2 mb-6 text-white text-center"
        style={{ fontFamily: "'Lora ', serif", fontStyle: "" }}>
        Compartilhando momentos há
        </h3>
        <Countdown startDate={startDate} />
        <p className="text-xs text-center font-bold text-gray-700">des de {startDate}</p>
        <MusicPlayer />
    </div>
  );
}
