'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaSearch, FaBell, FaCheckDouble, FaList } from 'react-icons/fa';
import { getRegistrationData } from '@/services/api';
import Carousel from '@/components/Carousel';
import { useParams } from 'next/navigation';
import MusicPlayerNetflix from '@/components/MusicPlayerNetflix';
import HeartLoader from '@/components/HeartLoader';
import Modal from '@/components/Modal';
import FormComponent from '@/components/FormComponent';
import { PencilIcon } from '@heroicons/react/24/solid';
import Top10Badge from '@/components/Top10Badge';
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
  payment?: string | null;
}

export default function LayoutNetflix() {
  const params = useParams();
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isPlanFree, setIsPlanFree] = useState(false)
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
  );

  const [data, setData] = useState<FormData>({
    title: '',
    names: '',
    date: now,
    text: '',
    photoPaths: [],
    layout: '',
    music: '',
    musicThumbnail: '',
    musicVideoId: '',
    modelo_carrosel: '',
    modelo_date: '',
  });

  const ano = new Date(data?.date || now).getFullYear();
  const mes = new Date(data?.date || now).getMonth() + 1;
  const dia = new Date(data?.date || now).getDate() + 1;


  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const response = await getRegistrationData(userId); // Busca os dados da API
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
    setData(updatedData); // Atualiza o estado 'data' com os novos dados
    setIsEditing(false); // Fecha o modal após a atualização
  };

  if (loading) {
    return <HeartLoader />; // Exibe um loading enquanto os dados são buscados
  }


  return (
    <div className="bg-black text-white font-roboto min-h-screen">
      {isPlanFree && <TrialCountdown />}
      {/* Modal com formulário */}
      {isEditing && (
        <Modal onClose={() => setIsEditing(false)}>
          <FeatureRestriction feature="edit">
            <FormComponent formData={data} onUpdate={handleUpdate} />
          </FeatureRestriction>
        </Modal>
      )}

      {/* Botão para abrir o modal */}
      <div className="fixed bottom-2 right-1 transform -translate-x-1/2 p-4 rounded-lg flex items-center justify-center max-w-md">
        <button
          onClick={() => setIsEditing(true)}
          className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 "
        >
          <PencilIcon className="size-4 text-black " />

        </button>
      </div>
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-black bg-opacity-75 w-full">
        <div className="flex items-center space-x-4">
          <Image
            src="/loveflix.png"
            alt="Netflix logo"
            width={100}
            height={50}
            className="h-8"
          />
          <nav className="hidden md:flex space-x-4">
            <a className="hover:underline" href="#">Home</a>
            <a className="hover:underline" href="#">TV Shows</a>
            <a className="hover:underline" href="#">Movies</a>
            <a className="hover:underline" href="#">New & Popular</a>
            <a className="hover:underline" href="#">My List</a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <FaSearch />
          <FaBell />
          <Image
            src="https://storage.googleapis.com/a1aa/image/sILjXQPW8orSiqWhbrqJq5D1itP_P651DbQXgH9SKkE.jpg"
            alt="User profile icon"
            width={30}
            height={30}
            className="h-8 w-8 rounded-full"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-1">
        <section className="relative">
          <Carousel images={data?.photoPaths} autoPlay={true} interval={5000} preview={true} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8">
            <h1 className="text-4xl font-bold" style={{ fontFamily: "Dancing Script,Dancing Script Fallback" }}>{data?.title || "Título"}</h1>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-green-500 font-semibold">100% Match</span>
              <span className="text-gray-400">Since</span>
              <span className="text-gray-400">{ano}</span>
              <span className="px-2 py-1 border border-gray-400 rounded">{mes}</span>
              <span className="text-gray-400">{dia}</span>
              {/* <span className="text-gray-400"><Top10Badge/> Em alta no momento</span> */}
            </div>
            <div className="flex space-x-4 mt-4">
              <div className="flex items-center bg-red-500 text-black px-4 py-2 rounded">
                <MusicPlayerNetflix selectedMusicUser={{
                  videoId: data.musicVideoId || "",
                }} /> Reproduzir
              </div>
              <button className="flex items-center bg-gray-700 bg-opacity-75 px-4 py-2 rounded">
                <FaCheckDouble className="mr-2" /> Favorito
              </button>
            </div>
          </div>
        </section>

        <section className="p-8">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4">Visão geral</h2>
              <p className="text-gray-300 mb-4">
                {data?.text || "Seu texto"}
              </p>
              <h3 className="text-xl font-bold mb-2">Autores</h3>
              <p className="text-gray-300 mb-4">{data?.names || "Nome & Nome"}</p>
              <h3 className="text-xl font-bold mb-2">Genero</h3>
              <p className="text-gray-300 mb-4">Adventure, Drama, Romance</p>
            </div>
            <div className="md:w-1/3">
              <div className='flex '>
                <FaList className='w-10 h-5 mt-1' />
                <h2 className="text-2xl font-bold mb-4">Mais episódios</h2>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {data?.photoPaths?.map((path, index) => (
                  <div key={index}>
                    <Image
                      src={path} // Se os caminhos estiverem completos no array, use diretamente
                      alt={`Movie ${index + 1} poster`}
                      width={180}
                      height={225}
                      className="w-25 h-24 object-cover rounded"
                    />
                    {/* <p className="text-gray-300 mt-2">Nosso Filme❤️{index + 1}</p> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}




