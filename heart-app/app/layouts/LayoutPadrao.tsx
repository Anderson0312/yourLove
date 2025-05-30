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
import CometShower from '@/components/animations/CometasShow';
import MeteorShower from '@/components/animations/MeteorShow';
import AuroraBorealis from '@/components/animations/Aurora';
import VorticeCores from '@/components/animations/VorticeCores';
import { TrialCountdown } from '@/components/trial-countdown';
import { FeatureRestriction } from '@/components/feature-restriction';

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
    modelo_date: string;
    payment?: string;
}

export default function LayoutPadrao() {
    const params = useParams();
    const userId = Array.isArray(params.id) ? params.id[0] : params.id;
    const [data, setData] = useState<FormData>({
        title: '',
        names: '',
        date: new Date(),
        text: '',
        layout: '',
        photoPaths: [],
        music: '',
        musicThumbnail: '',
        musicVideoId: '',
        modelo_carrosel: '',
        modelo_date: '',
    });
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isPlanFree, setIsPlanFree] = useState(false)

    useEffect(() => {
        if (userId) {
            const fetchData = async () => {
                try {
                    const response = await getRegistrationData(userId);
                    setData(response);
                    const planTypeUser = response.payment;
                    setIsPlanFree(planTypeUser === "free-trial")
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
        setData(updatedData);
        setIsEditing(false);
    };

    const renderBackgroundAnimation = () => {
        switch (data.modelo_date) {
            case "Chuva de corações":
                return <FallingHearts />;
            case "Céu Estrelado com Cometas":
                return <CometShower />;
            case "Céu Estrelado com Meteoros":
                return <MeteorShower />;
            case "Aurora":
                return <AuroraBorealis />;
            case "Vórtice de cores":
                return <VorticeCores />;
            default:
                return null;
        }
    };

    if (loading) {
        return <HeartLoader />;
    }

    return (
        <div className="relative min-h-screen w-full  text-white">
            {isPlanFree && <TrialCountdown />}
            {/* Camada de animação de fundo */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                {renderBackgroundAnimation()}
            </div>

            {/* Conteúdo principal */}
            <div className="relative z-10 min-h-screen p-2 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                {isEditing && (
                    <Modal onClose={() => setIsEditing(false)}>
                        <FeatureRestriction feature="edit">
                            <FormComponent formData={data} onUpdate={handleUpdate} />
                        </FeatureRestriction>
                    </Modal>
                )}

                <div className="max-w-3xl mx-auto bg-transparent backdrop-blur-sm rounded-xl p-6">
                    <h1
                        className="text-2xl font-bold mb-6 text-red-600 text-center"
                        style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
                    >
                        {data.title}
                    </h1>

                    <Carousel
                        images={data?.photoPaths}
                        autoPlay={true}
                        interval={5000}
                        variant={data?.modelo_carrosel}
                    />

                    <TextDatting name={data.names} text={data.text} />

                    <h3
                        className="text-lg font-semi-bold mt-2 mb-6 text-white text-center"
                        style={{ fontFamily: "'Lora ', serif" }}
                    >
                        Compartilhando momentos há
                    </h3>

                    <Countdown startDate={data.date} />

                    <p className="text-xs text-center font-bold text-gray-300">
                        desde {new Date(data.date).toLocaleDateString('pt-BR')}
                    </p>

                    <div className="fixed top-5 right-3 p-4 rounded-lg flex items-center justify-center max-w-md">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                            <PencilIcon className="size-4 text-black" />
                        </button>
                    </div>


                </div>
                <MusicPlayer
                    selectedMusicUser={{
                        title: data.music || "",
                        thumbnail: data.musicThumbnail || "",
                        videoId: data.musicVideoId || "",
                    }}
                />
            </div>
        </div>
    );
}