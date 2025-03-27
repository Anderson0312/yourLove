'use client'
import { useEffect, useState } from 'react';
import Carousel from "@/components/Carousel";
import Countdown from "@/components/Countdown";
import TextDatting from "@/components/TextDatting";
import { getRegistrationData } from '@/services/api';
import MusicPlayerPreview from './MusicPlayerPreview';
import FallingHearts from './animations/FallingHearts';
import CometShower from './animations/CometasShow';
import MeteorShower from './animations/MeteorShow';
import AuroraBorealis from './animations/Aurora';
import VorticeCores from './animations/VorticeCores';

// import HeartLoader from './HeartLoader';

interface FormData {
    title: string;
    names: string;
    date: Date;
    text: string;
    music: string;
    musicThumbnail: string;
    musicVideoId: string;
    photoPaths: string[];
    modelo_carrosel: string;
    modelo_date: string;
}

interface PropsPreview {
    modeloCarrosel: string;
    modeloAnimeted: string;
  }
  
  export default function PreviewLayoutPadrao({ modeloCarrosel, modeloAnimeted }: PropsPreview) {
    const [username, setUsername] = useState<string | null>(null);
    const [modCarrosel, setModCarrosel] = useState<string>(modeloCarrosel);
    const [modAnimation, setModAnimation] = useState<string>(modeloAnimeted);
    // const [loading, setLoading] = useState(true);
    const now = new Date(
        new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
      );
    const [data, setData] = useState<FormData>({
        title: '',
        names: '',
        date: now,
        text: '',
        music:'',
        musicThumbnail:'',
        musicVideoId:'',
        photoPaths: [],
        modelo_carrosel: '',
        modelo_date: '',
    });

    
  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    setUsername(savedUsername); 
  }, []);

    useEffect(() => {
        if (username) {
            const fetchData = async () => {
                try {
                    const response = await getRegistrationData(username);
                    setData(response);
                    if (response.modelo_carrosel) {
                        setModCarrosel(response.modelo_carrosel); // Garante que o modelo vem da API
                    }
                    if (response.modelo_date) {
                        setModAnimation(response.modelo_date); 
                    }
                } catch (error) {
                    console.error('Erro ao buscar dados:', error);
                }
            };
            fetchData();
        }
    }, [username]);

    useEffect(() => {
        setModCarrosel(modeloCarrosel);
        setModAnimation(modAnimation)
    }, [modeloCarrosel, modAnimation]);

    const renderBackgroundAnimation = () => {
        switch (modAnimation) {
          case "Chuva de corações":
            return (
              <div className="absolute inset-0 rounded-[38px] overflow-hidden">
                <FallingHearts />
              </div>
            );
          case "Céu Estrelado com Cometas":
            return (
              <div className="absolute inset-0 rounded-[38px] overflow-hidden">
                <CometShower />
              </div>
            );
          case "Céu Estrelado com Meteoros":
            return (
              <div className="absolute inset-0 rounded-[38px] overflow-hidden">
                <MeteorShower />
              </div>
            );
          case "Aurora":
            return (
              <div className="absolute inset-0 rounded-[38px] overflow-hidden">
                <AuroraBorealis />
              </div>
            );
          case "Vórtice de cores":
            return (
              <div className="absolute inset-0 rounded-[38px] overflow-hidden">
                <VorticeCores />
              </div>
            );
          default:
            return null;
        }
      };

    // if (loading) {
    //     return <HeartLoader/>;// Exibe um loading enquanto os dados são buscados
    // }
    return (
        <div className="relative mt-5 max-w-[350px] h-[700px] mx-auto pb-20 rounded-[50px] bg-zinc-950 border-[12px] border-gray-900 shadow-xl flex flex-col items-center overflow-hidden">
          {/* Detalhes do smartphone */}
          <div className="absolute top-2 w-24 h-4 bg-gray-900 rounded-full z-20"></div>
          <div className="absolute left-0 top-1/4 w-[3px] h-10 bg-gray-700 rounded-r-md z-20"></div>
          <div className="absolute left-0 top-[35%] w-[3px] h-10 bg-gray-700 rounded-r-md z-20"></div>
          <div className="absolute right-0 top-1/3 w-[3px] h-14 bg-gray-700 rounded-l-md z-20"></div>
    
          {/* Animação de fundo */}
          <div className="absolute inset-0 overflow-hidden rounded-[38px]">
            {renderBackgroundAnimation()}
          </div>
    
          {/* Conteúdo interno com rolagem */}
          <div className="w-full h-full overflow-y-auto px-4 pt-6 mt-2 relative z-10">
            <h1
              className="text-2xl font-bold mb-6 text-red-600 text-center"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
            >
              {data?.title || "Título"}
            </h1>
    
            <Carousel 
              images={data?.photoPaths} 
              autoPlay={true} 
              interval={5000} 
              preview={true} 
              variant={modCarrosel}
            />
    
            <TextDatting name={data?.names} text={data?.text} />
            <h3
              className="text-lg font-semi-bold mt-2 mb-6 text-white text-center"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Compartilhando momentos há
            </h3>
            <Countdown startDate={data?.date || now} />
            <p className="text-xs text-center font-bold text-gray-700">
              desde {new Date(data?.date || now).toLocaleDateString('pt-BR')}
            </p>
    
            <MusicPlayerPreview 
              selectedMusicUser={{
                title: data.music || "Musica favorita do casal",
                thumbnail: data.musicThumbnail || "",
                videoId: data.musicVideoId || "",
              }}
            />
          </div>
        </div>
      );
}
