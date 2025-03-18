'use client'
import { useEffect, useState } from 'react';
import Carousel from "@/components/Carousel";
import Countdown from "@/components/Countdown";
import TextDatting from "@/components/TextDatting";
import { getRegistrationData } from '@/services/api';
import MusicPlayerPreview from './MusicPlayerPreview';

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
}

interface PropsPreview {
    modeloCarrosel: string;
  }
  
  export default function PreviewLayoutPadrao({ modeloCarrosel }: PropsPreview) {
    const [username, setUsername] = useState<string | null>(null);
    const [modCarrosel, setModCarrosel] = useState<string>(modeloCarrosel);
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
    });

    
  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    setUsername(savedUsername); 
  }, []);

    useEffect(() => {
        if (username) {
            const fetchData = async () => {
                if (!username) return; 
                try {
                    const response = await getRegistrationData(username);
                    setData(response);
                    if (response.modelo_carrosel) {
                        setModCarrosel(response.modelo_carrosel); // Garante que o modelo vem da API
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
    }, [modeloCarrosel]);

    // if (loading) {
    //     return <HeartLoader/>;// Exibe um loading enquanto os dados são buscados
    // }
    return (


<div className="relative mt-5 max-w-[350px] h-[700px] mx-auto pb-20 rounded-[50px] bg-zinc-950 border-[12px] border-gray-900 shadow-xl flex flex-col items-center">
            {/* Notch Superior */}
            <div className="absolute top-2 w-24 h-4 bg-gray-900 rounded-full"></div>
            
            {/* Botões Laterais (volume) */}
            <div className="absolute left-0 top-1/4 w-[3px] h-10 bg-gray-700 rounded-r-md"></div>
            <div className="absolute left-0 top-[35%] w-[3px] h-10 bg-gray-700 rounded-r-md"></div>

            {/* Botão Lateral (power) */}
            <div className="absolute right-0 top-1/3 w-[3px] h-14 bg-gray-700 rounded-l-md"></div>

            {/* Conteúdo interno com rolagem */}
            
            <div className="w-full h-full overflow-y-auto px-4 pt-6 mt-2">
                <h1
                    className="text-2xl font-bold mb-6 text-red-600 text-center"
                    style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
                >
                    {data?.title || "Título"}
                </h1>
                

                <Carousel images={data?.photoPaths} autoPlay={true} interval={5000} preview={true} variant={modCarrosel}/>



                <TextDatting name={data?.names} text={data?.text} />
                <h3
                    className="text-lg font-semi-bold mt-2 mb-6 text-white text-center"
                    style={{ fontFamily: "'Lora ', serif" }}
                >
                    Compartilhando momentos há
                </h3>
                <Countdown startDate={data?.date || now} />
                <p className="text-xs text-center font-bold text-gray-700">
                    desde {new Date(data?.date || now).toLocaleDateString('pt-BR')}
                </p>

                <MusicPlayerPreview selectedMusicUser={{
                  title: data.music || "Musica favorita do casal",
                  thumbnail: data.musicThumbnail || "",
                  videoId: data.musicVideoId || "",
                }}/>
                
            </div>
        </div>

    );
}
