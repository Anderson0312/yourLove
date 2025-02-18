'use client'
import { useEffect, useState } from 'react';
import Carousel from "@/components/Carousel";
import Countdown from "@/components/Countdown";
import FallingHearts from "@/components/FallingHearts";
import MusicPlayer from "@/components/MusicPlayer";
import TextDatting from "@/components/TextDatting";
import { useParams } from 'next/navigation';
import { getRegistrationData } from '@/services/api';
import Modal from '@/components/Modal';
import FormComponent from '@/components/FormComponent';
import HeartLoader from '@/components/HeartLoader';

interface FormData {
    title: string;
    names: string;
    date: Date;
    text: string;
    photoPaths: string[];
    music: string;
}

export default function Home() {
    const params = useParams(); // Captura os parâmetros da URL
    const userId = Array.isArray(params.id) ? params.id[0] : params.id;


    const [data, setData] = useState<FormData>({
        title: '',
        names: '',
        date: new Date(),
        text: '',
        photoPaths: [],
        music:'',
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
        <div className="hearts-container min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
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
            <Carousel images={data?.photoPaths} autoPlay={true} interval={5000} />
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
            <div className="fixed bottom-0 left-1/3 transform -translate-x-1/2 p-4 rounded-lg flex items-center justify-center max-w-md">
            <button
                onClick={() => setIsEditing(true)}
                className="px-2 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 "
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>

            </button>
            </div>
            <MusicPlayer music={data.music} />
            <FallingHearts />
        </div>
    );
}
