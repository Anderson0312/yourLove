'use client'
import { useEffect, useState } from 'react';
import FormComponent from "@/components/FormComponent";
import Carousel from "@/components/Carousel";
import Countdown from "@/components/Countdown";
import FallingHearts from "@/components/FallingHearts";
import MusicPlayer from "@/components/MusicPlayer";
import TextDatting from "@/components/TextDatting";
import Modal from '@/components/Modal';
import { useParams } from 'next/navigation';
import { getRegistrationData } from '@/services/api';

interface FormData {
    title: string;
    name: string;
    startDate: Date;
    text: string;
    images: string[];
}

export default function Home() {
    const params = useParams(); // Captura os parâmetros da URL
    const userId = Array.isArray(params.id) ? params.id[0] : params.id;


    // const [data, setData] = useState<FormData>({
    //     title: 'Nosso Cantinho',
    //     name: 'Anderson e Luana',
    //     startDate: '2024-12-14T20:00:00Z',
    //     text: `Desde o momento em que te conheci, meu mundo ganhou novas cores e meu coração encontrou um lar. Cada dia ao seu lado é uma nova aventura, repleta de risos, carinho e felicidade. Você é minha inspiração, minha paz e minha razão de sorrir. Te amo mais do que palavras podem expressar, e sou grato por ter você ao meu lado, hoje e sempre.`,
    //     images: ['/img1.jpg', '/img2.jpg', '/img3.jpg', '/img4.jpg', '/img5.jpg'],
    // });

    const now = new Date(
        new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
      );

    const [data, setData] = useState<FormData>({
        title: '',
        name: '',
        startDate: now,
        text: '',
        images: [],
    });

    const [loading, setLoading] = useState(true);

    const [isEditing, setIsEditing] = useState(false); // Controla se o modal está aberto

    useEffect(() => {
        if (userId) {
            const fetchData = async () => {
                try {
                    const response = await getRegistrationData(userId); // Busca os dados da API
                    setData(response); // Atualiza o estado com os dados recebidos
                } catch (error) {
                    console.error('Erro ao buscar dados:', error);
                } finally {
                    setLoading(false); // Finaliza o carregamento
                }
            };

            fetchData();
        }
    }, [userId]);

    if (loading) {
        return <div>Carregando...</div>; // Exibe um loading enquanto os dados são buscados
    }

    // Restante do código...



    // const handleUpdate = (updatedData: FormData) => {
    //     setData(updatedData);
    //     setIsEditing(false); // Fecha o modal após salvar
    // };

    return (
        <div className="hearts-container min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            {/* Modal com formulário */}
            {/* {isEditing && (
                <Modal onClose={() => setIsEditing(false)}>
                    <FormComponent formData={data} onUpdate={handleUpdate} />
                </Modal>
            )} */}
            <h1
                className="text-2xl font-bold mb-6 text-red-600 text-center"
                style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
            >
                {data.title}
            </h1>
            <Carousel images={data.images} autoPlay={true} interval={5000} />
            <TextDatting name={data.name} text={data.text} />
            <h3
                className="text-lg font-semi-bold mt-2 mb-6 text-white text-center"
                style={{ fontFamily: "'Lora ', serif", fontStyle: "" }}
            >
                Compartilhando momentos há
            </h3>
            <Countdown startDate={data.startDate} />
            <p className="text-xs text-center font-bold text-gray-700">
                desde {String(data.startDate)}
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
            <MusicPlayer />
            <FallingHearts />
        </div>
    );
}
