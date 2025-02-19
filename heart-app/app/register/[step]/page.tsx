'use client';

import PreviewLaout from '@/components/previewLaout';
import { getRegistrationData, saveRegistrationData, uploadPhotos, getSpotifyToken, getUsernameFromToken } from '@/services/api';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid'
import Link from 'next/link';



const steps = [
  { id: 1, name: 'Title and Date' },
  { id: 2, name: 'Text and Music' },
  { id: 3, name: 'Photo and Names' },
  { id: 4, name: 'Summary' },
];

interface FormData {
  title: string;
  username: string;
  names: string;
  date: string;
  text: string;
  music: string;
  photo: File[] | null; // Objetos File originais
  photoPaths: string[] | null; // Caminhos das fotos retornados pelo backend
}


const RegisterStep = () => {
  const router = useRouter();
  const params = useParams();
  const stepParam = params.step ? parseInt(params.step as string, 10) : 1;
  const [query, setQuery] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [username, setUsername] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(stepParam);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    username: '',
    date: '',
    names: '',
    text: '',
    music: '',
    photo: null,
    photoPaths: null,
  });

  
  useEffect(() => {
    const user = getUsernameFromToken();
    setUsername(user);
    
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length > 5) {
      alert("Você só pode enviar no máximo 5 fotos.");
      return;
    }
    
  
    setFormData((prev) => ({ ...prev, photo: files }));
  };

  
  const userId = username ?? ""; // Defina o userId conforme necessário


  useEffect(() => {
    if (stepParam >= 1 && stepParam <= steps.length) {
      setCurrentStep(stepParam);
    } else {
      router.push('/register/1'); // Redireciona para o primeiro step caso o step seja inválido
    }
  }, [stepParam, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRegistrationData(userId);
        // Atualiza apenas os campos presentes na resposta da API
        setFormData((prevData) => ({
          ...prevData, // Mantém os valores existentes
          ...data,     // Atualiza com os novos dados
        }));
      } catch (error) {
        console.error('Erro ao recuperar os dados:', error);
      }
    };
  
    fetchData();
  }, [userId]);

  const handleNext = async () => {
    if (currentStep < steps.length) {
      try {
        if (currentStep === 3 && formData.photo) {
          // Faz o upload das fotos
          const uploadResponse = await uploadPhotos(userId, formData.photo);
  
          // Atualiza o formData com os caminhos das fotos, mas mantém os objetos File
          setFormData((prev) => ({
            ...prev,
            photoPaths: uploadResponse.filePaths, // Armazena os caminhos das fotos
          }));
  
          // Salva os dados do passo atual
          await saveRegistrationData(userId, currentStep, {
            ...formData,
            photoPaths: uploadResponse.filePaths, // Envia os caminhos das fotos
          });
        } else {
          // Salva os dados do passo atual (sem fotos)
          await saveRegistrationData(userId, currentStep, formData);
        }
  
        // Avança para o próximo passo
        const nextStep = currentStep + 1;
        router.push(`/register/${nextStep}`);
      } catch (error) {
        console.error('Erro ao salvar os dados:', error);
      }
    }
  };

  const handleBack = async () => {
    if (currentStep > 1) {
      try {
        await saveRegistrationData(userId, currentStep, formData);
        const prevStep = currentStep - 1;
        router.push(`/register/${prevStep}`);
      } catch (error) {
        console.error('Erro ao salvar os dados:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveRegistrationData(userId, currentStep, formData);
      alert('Dados enviados com sucesso!');
      router.push('/success'); // Redireciona para uma página de sucesso
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    }
  };

  const handleRemovePhoto = async (index: number) => {
    if (!formData.photoPaths) return;
  
    const updatedPaths = formData.photoPaths.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, photoPaths: updatedPaths }));
  
    try {
      await saveRegistrationData(userId, currentStep, {
        ...formData,
        photoPaths: updatedPaths, // Enviar lista atualizada de fotos
      });
    } catch (error) {
      console.error('Erro ao remover a foto:', error);
    }
  };
  

  const handleSearch = async () => {
    if (!query) {
      alert('Por favor, digite o nome da música.');
      return;
    }
  
    try {
      const token = await getSpotifyToken(); // Função para obter o token de acesso
  
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          query
        )}&type=track`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
  
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      if (data.tracks.items.length > 0) {
        console.log('Música encontrada:', data.tracks.items[0]); // Verifique a música encontrada
        setPreviewUrl(data.tracks.items[0].preview_url); // Pega o preview da primeira música
        setFormData((prev) => ({ ...prev, music: data.tracks.items[0].name })); // Atualiza o nome da música no formData
      } else {
        setPreviewUrl(''); // Limpa o previewUrl se nenhuma música for encontrada
      }
    } catch (e) {
      console.error('Erro ao buscar música: ', e);
      setPreviewUrl(''); // Limpa o previewUrl em caso de erro
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Step Indicators */}
      <div className="flex justify-center items-center space-x-1 mb-6">
        {steps.map((s, index) => (
          <div key={s.id} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex justify-center items-center ${
                currentStep === s.id ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-300 text-black'
              }`}
            >
              <Link href={`/register/${s.id}`}> 
              {s.id}
              </Link>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-12 h-2 ${
                  currentStep > s.id ? 'bg-red-500' : 'bg-gray-300'
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <div className="space-y-4 ">
            <div className=" sm:col-span-4 ">
              <label htmlFor="Titulo" className="block text-xl/3 font-bold text-withe">
                Titulo do site
              </label>
              <div className="mt-2">
                <input
                  id="Titulo"
                  name="Titulo"
                  type="Titulo"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Titulo do site"
                  className="block w-full rounded-md bg-gray-500 px-3 py-1.5 text-base text-withe outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
                />
              </div>
            </div>

          
            <div className="sm:col-span-4">
            <label htmlFor="Titulo" className="block text-xl/3 font-bold text-withe">
                Inicio do relacionamento
              </label>
              <div className="mt-2">
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="block w-full rounded-md bg-gray-500 px-3 py-1.5 text-base text-withe outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm/6 font-medium text-withe-900">
                Texto do casal
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  placeholder="Texto do casal"
                  rows={3}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  className="block w-full rounded-md bg-gray-500 px-3 py-1.5 text-base text-withe outline-1 -outline-offset-1 outline-red-300 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/7"
                  value={formData.text}
                />
              </div>
            </div>


            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm/6 font-medium text-withe">
                Selecione uma musica
              </label>
              <div className="mt-2">
                <input
                  id="musica"
                  name="musica"
                  placeholder="Digite o nome da música"
                  type="musica"
                  value={query  ||  formData.music}
                  onChange={(e) => setQuery(e.target.value)}
                  className="block w-full rounded-md bg-gray-500 px-3 py-1.5 text-base text-withe outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
                />
              </div>
              <button
                type="button" // Adicione isso para evitar o envio do formulário
                onClick={handleSearch}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
              >
                Buscar Música
              </button>
              {previewUrl && (
                <div className="mt-4">
                  <audio controls src={previewUrl}>
                    Seu navegador não suporta o elemento de áudio.
                  </audio>
                </div>
              )}
              </div>
            </div>

            

        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            
            <div className="sm:col-span-4">
              <label htmlFor="Nomes" className="block text-sm/6 font-medium text-withe">
              Nomes do casal
              </label>
              <div className="mt-2">
                <input
                  id="Nomes"
                  name="Nomes"
                  type="text"
                  value={formData.names}
                  onChange={(e) => setFormData({ ...formData, names: e.target.value })}
                  placeholder="Nomes do casal"
                  className="block w-full rounded-md bg-gray-500 px-3 py-1.5 text-base text-withe outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
                />
              </div>
            </div>

             <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-white text-sm/6 font-medium text-gray-900">
                Fotos do casal 
              </label>
              <div className="mt-2 flex justify-center bg-gray-500 rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                  <div className="mt-4 flex text-sm/6 text-withe">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-semibold text-red-600 focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-red-800"
                    >
                      <span>Envie suas fotos</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileChange}/>
                    </label>
                    <p className="pl-1 ">ou arraste aqui</p>
                  </div>
                  <p className="text-xs/5 text-withe">PNG, JPG até 10MB</p>
                </div>
              </div>
            </div>  

            {formData.photoPaths && formData.photoPaths.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {formData.photoPaths.map((photoUrl, index) => (
                <div key={index} className="relative w-24 h-24">
                  <img src={photoUrl} alt={`Foto ${index + 1}`} className="w-full h-full  object-cover rounded-lg shadow-md" />
                  <button
                    onClick={() => handleRemovePhoto(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )} 

              {/* <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full px-2 py-1 rounded bg-gray-500"
              /> */}
          

          </div>
          
        )}

      {currentStep === 4 && (
        <div>
          <h2 className="text-lg font-bold">Resumo</h2>

          <div className="bg-red-500 text-white p-4 rounded">
            <p><strong>Título:</strong> {formData.title}</p>
            <p><strong>Data:</strong> {formData.date}</p>
            <p><strong>Nomes:</strong> {formData.names}</p>
            <p><strong>Seu Texto:</strong> {formData.text}</p>
            <p><strong>Música:</strong> {formData.music}</p>
            <p><strong>Criado em:</strong> {new Date().toLocaleString()}</p>
            <p>
            <strong>Seu link do site: </strong>  
            <a href={`https://our-love-app.vercel.app/yourDatting/${formData.username}`}>
              {`https://our-love-app.vercel.app/yourDatting/${formData.username}`}
            </a>
            </p>
          </div>
        </div>
      )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Back
            </button>
          )}
          {currentStep < steps.length && (
            <button
              type="button"
              onClick={handleNext}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Next
            </button>
          )}
          {currentStep === steps.length && (
            <button
              type="submit"
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Submit
            </button>
          )}
        </div>
      </form>

      <PreviewLaout/>
    </div>
  );
};

export default RegisterStep;