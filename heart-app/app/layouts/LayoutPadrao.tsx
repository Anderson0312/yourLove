'use client'
import { useEffect, useState } from 'react';
import Carousel from "@/components/Carousel";
import Countdown from "@/components/Countdown";
import FallingHearts from "@/components/animations/FallingHearts";
import MusicPlayer from "@/components/MusicPlayer";
import TextDatting from "@/components/TextDatting";
import { useParams } from 'next/navigation';
import { getRegistrationData } from '@/services/api';
import Modal from '@/components/Modal';
import FormComponent from '@/components/FormComponent';
import HeartLoader from '@/components/HeartLoader';
import { PencilIcon } from '@heroicons/react/24/solid';
interface FormData {
    title: string;
    names: string;
    date: Date;
    text: string;
    layout: string;
    photoPaths: string[];
    music: string;
    musicThumbnail: string;
    musicVideoId: string;
    modelo_carrosel: string;
}

export default function LayoutPadrao() {
    const params = useParams(); // Captura os parâmetros da URL
    const userId = Array.isArray(params.id) ? params.id[0] : params.id;

    const [data, setData] = useState<FormData>({
        title: '',
        names: '',
        date: new Date(),
        text: '',
        layout: '',
        photoPaths: [],
        music:'',
        musicThumbnail:'',
        musicVideoId:'',
        modelo_carrosel:'',
    });

    const [loading, setLoading] = useState(true);

    const [isEditing, setIsEditing] = useState(false); // Controla se o modal está aberto

    useEffect(() => {
        if (userId) {
            const fetchData = async () => {
                try {
                    const response = await getRegistrationData(userId);
                    setData(response);
                } catch (error) {
                    console.error('Erro ao buscar dados:', error);
                } finally {
                    setLoading(false);
                }
            };
    
            fetchData();
        }
    }, [userId]);

    const handleUpdate = (updatedData: FormData) => {
        setData(updatedData); // Atualiza o estado 'data' com os novos dados
        setIsEditing(false); // Fecha o modal após a atualização
    };

    if (loading) {
        return <HeartLoader/>; // Exibe um loading enquanto os dados são buscados
    }


    return (
        <>
      <div className="hearts-container fixed inset-0 z-0 overflow-hidden">
        <FallingHearts />
      </div>
        <div className="z-10 min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            {/* Modal com formulário */}
            {isEditing && (
                <Modal onClose={() => setIsEditing(false)}>
                    <FormComponent formData={data} onUpdate={handleUpdate} />
                </Modal>
            )}
            <h1
                className="text-2xl font-bold mb-6 text-red-600 text-center"
                style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
            >
                {data.title}
            </h1>
            <Carousel images={data?.photoPaths} autoPlay={true} interval={5000} variant={data?.modelo_carrosel}/>
            <TextDatting name={data.names} text={data.text} />
            <h3
                className="text-lg font-semi-bold mt-2 mb-6 text-white text-center"
                style={{ fontFamily: "'Lora ', serif", fontStyle: "" }}
            >
                Compartilhando momentos há
            </h3>
            <Countdown startDate={data.date} />
            <p className="text-xs text-center font-bold text-gray-700">
                desde {String(data.date)}
            </p>
            {/* Botão para abrir o modal */}
            <div className="fixed top-5 right-3 p-4 rounded-lg flex items-center justify-center max-w-md">
                <button
                    onClick={() => setIsEditing(true)}
                    className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 "
                >
                    <PencilIcon className="size-4 text-black "/>

                </button>
            </div>

            <MusicPlayer selectedMusicUser={{
                  title: data.music || "",
                  thumbnail: data.musicThumbnail || "",
                  videoId: data.musicVideoId || "",
                }}/>
            <FallingHearts />
        </div>
        </>
    );
}
