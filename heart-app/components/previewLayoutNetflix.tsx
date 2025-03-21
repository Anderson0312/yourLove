'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaSearch, FaBell,  FaPlus } from 'react-icons/fa';
import { getRegistrationData } from '@/services/api';
import HeartLoader from './HeartLoader';
import Carousel from './Carousel';
import MusicPlayerNetflix from './MusicPlayerNetflix';

interface FormData {
    title: string;
    names: string;
    date: Date;
    text: string;
    musicVideoId: string;
    photoPaths: string[];
}

export default function PreviewLayoutNetfilx() {
    const [username, setUsername] = useState<string | null>(null);
    
    useEffect(() => {
      const savedUsername = localStorage.getItem('username');
      setUsername(savedUsername); 
    }, []);

    const now = new Date(
        new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
      );

    const [data, setData] = useState<FormData>({
        title: '',
        names: '',
        date: now,
        text: '',
        musicVideoId: '',
        photoPaths: [],
    });

    const [loading, setLoading] = useState(true);


    const ano = new Date(data?.date || now).getFullYear();
    const mes = new Date(data?.date || now).getMonth() + 1;
    const dia = new Date(data?.date || now).getDate() +1;



    useEffect(() => {
        if (username) {
            const fetchData = async () => {
                try {
                    const response = await getRegistrationData(username); // Busca os dados da API
                    setData(response); // Atualiza o estado com os dados recebidos
                } catch (error) {
                    console.error('Erro ao buscar dados:', error);
                } finally {
                    setLoading(false); // Finaliza o carregamento
                }
            };

            fetchData();
        }
    }, [username]);

    if (loading) {
        return <HeartLoader/>;// Exibe um loading enquanto os dados são buscados
    }

    return (
<div className="relative mt-5 max-w-[350px] h-[700px] mx-auto pb-20 rounded-[50px] bg-zinc-950 border-[12px] border-gray-900 shadow-xl flex flex-col items-center">
            {/* Notch Superior */}
            <div className="absolute top-2 w-24 h-4 bg-gray-900 rounded-full z-10"></div>
            
            {/* Botões Laterais (volume) */}
            <div className="absolute left-0 top-1/4 w-[3px] h-10 bg-gray-700 rounded-r-md"></div>
            <div className="absolute left-0 top-[35%] w-[3px] h-10 bg-gray-700 rounded-r-md"></div>

            {/* Botão Lateral (power) */}
            <div className="absolute right-0 top-1/3 w-[3px] h-14 bg-gray-700 rounded-l-md"></div>

            {/* Conteúdo interno com rolagem */}
            
            <div className="w-full h-full overflow-y-auto bg-black text-white font-roboto rounded-[50px]">
                  {/* Header */}
                  <header className="flex items-center justify-between p-4 bg-black bg-opacity-75 max-w-[350px] mt-1 ">
                    <div className="flex items-center space-x-4">
                      <Image
                        src="/loveflix.png"
                        alt="Netflix logo"
                        width={100}
                        height={50}
                        className="h-8"
                      />
                      <nav className="hidden">
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
                  <main className="">
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
                            <FaPlus className="mr-2" /> Minha Lista
                          </button>
                        </div>
                      </div>
                    </section>
            
                    <section className="p-8">
                      <div className="flex flex-col">
                        <div className="">
                          <h2 className="text-2xl font-bold mb-4">Visão geral</h2>
                          <p className="text-gray-300 mb-4">
                          {data?.text || "Seu texto" }
                          </p>
                          <h3 className="text-xl font-bold mb-2">Elenco</h3>
                          <p className="text-gray-300 mb-4">{data?.names || "Nome & Nome"}</p>
                          <h3 className="text-xl font-bold mb-2">Genero</h3>
                          <p className="text-gray-300 mb-4">Adventure, Drama, Romance</p>
                        </div>
                        <div className="">
                                    <h2 className="text-2xl font-bold mb-4">Mais como este</h2>
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
                                        <p className="text-gray-300 mt-2">Nosso Filme❤️{index + 1}</p>
                                      </div>
                                    ))}
                                    </div>
                                  </div>
                      </div>
                    </section>
                  </main>
                </div>
        </div>

    );
}
