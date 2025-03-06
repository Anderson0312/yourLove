'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaSearch, FaBell,  FaPlus } from 'react-icons/fa';
import { getRegistrationData } from '@/services/api';
import Carousel from '@/components/Carousel';
import { useParams } from 'next/navigation';
import MusicPlayerNetflix from '@/components/MusicPlayerNetflix';
import HeartLoader from '@/components/HeartLoader';

interface FormData {
    title: string;
    names: string;
    date: Date;
    text: string;
    photoPaths: string[];
    music: string;
    musicThumbnail: string;
    musicVideoId: string;
}

export default function LayoutNetflix() {
  const params = useParams();
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [loading, setLoading] = useState(true);
  const now = new Date(
      new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
    );

  const [data, setData] = useState<FormData>({
      title: '',
      names: '',
      date: now,
      text: '',
      photoPaths: [],
      music:'',
      musicThumbnail:'',
      musicVideoId:'',
  });

  const ano = new Date(data?.date || now).getFullYear();
  const mes = new Date(data?.date || now).getMonth();
  const dia = new Date(data?.date || now).getDay();


  useEffect(() => {
      if (userId) {
          const fetchData = async () => {
              try {
                  const response = await getRegistrationData(userId); // Busca os dados da API
                  setData(response); // Atualiza o estado com os dados recebidos
              } catch (error) {
                  console.error('Erro ao buscar dados:', error);
              } finally {
                  setLoading(false);
              }
          };
          fetchData();
      }
  }, [userId]);

  if (loading) {
    return <HeartLoader/>; // Exibe um loading enquanto os dados são buscados
}


  return (
    <div className="bg-black text-white font-roboto min-h-screen">
          {/* Header */}
    <header className="flex items-center justify-between p-4 bg-black bg-opacity-75 fixed w-full z-10">
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
    <main className="pt-16">
      <section className="relative">
        <Carousel images={data?.photoPaths} autoPlay={true} interval={5000} preview={true} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute bottom-8 left-8">
          <h1 className="text-4xl font-bold">{data?.title || "Título"}</h1>
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-green-500 font-semibold">100% Match</span>
            <span className="text-gray-400">Since</span>
            <span className="text-gray-400">{ano}</span>
            <span className="px-2 py-1 border border-gray-400 rounded">{mes}</span>
            <span className="text-gray-400">{dia}</span>
          </div>
          <div className="flex space-x-4 mt-4">
            <div className="flex items-center bg-white text-black px-4 py-2 rounded">
            <MusicPlayerNetflix selectedMusicUser={{
                  videoId: data.musicVideoId || "",
                }}/> Play  
            </div>
            <button className="flex items-center bg-gray-700 bg-opacity-75 px-4 py-2 rounded">
              <FaPlus className="mr-2" /> Minha lista
            </button>
          </div>
        </div>
      </section>

      <section className="p-8">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-4">Resumo</h2>
            <p className="text-gray-300 mb-4">
                          {data?.text || "Seu texto" }
                          </p>
            <h3 className="text-xl font-bold mb-2">Autores</h3>
            <p className="text-gray-300 mb-4">{data?.names || "Nome & Nome"}</p>
            <h3 className="text-xl font-bold mb-2">Genero</h3>
            <p className="text-gray-300 mb-4">Adventure, Drama, Romance</p>
          </div>
          <div className="md:w-1/3">
            <h2 className="text-2xl font-bold mb-4">Mais Como Este</h2>
            <div className="grid grid-cols-2 gap-3">
            {data?.photoPaths?.map((path, index) => (
              <div key={index}>
                <Image
                  src={path} // Se os caminhos estiverem completos no array, use diretamente
                  alt={`Movie ${index + 1} poster`}
                  width={150}
                  height={225}
                  className="w-25 h-24 object-cover rounded"
                />
                <p className="text-gray-300 mt-2">Nosso Filme {index + 1}</p>
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




