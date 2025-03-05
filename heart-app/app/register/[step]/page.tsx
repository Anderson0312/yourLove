'use client';

import PreviewLaout from '@/components/previewLaout';
import { getRegistrationData, saveRegistrationData, uploadPhotos, getUsernameFromToken } from '@/services/api';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid'
import Link from 'next/link';
import Image from "next/image";
import YouTubeMusicSearch from '@/components/YouTubeMusicSearch';


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
  musicThumbnail: string;
  musicVideoId: string;
  photo: File[]; // Objetos File originais
  photoPaths: string[] | null; // Caminhos das fotos retornados pelo backend
}


const RegisterStep = () => {
  const router = useRouter();
  const params = useParams();
  const stepParam = params.step ? parseInt(params.step as string, 10) : 1;
  const [query, setQuery] = useState('');
  const [username, setUsername] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(stepParam);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const userId = username ?? ""; 
  const [formData, setFormData] = useState<FormData>({
    title: '',
    username: '',
    date: '',
    names: '',
    text: '',
    music: '',
    musicThumbnail: '',
    musicVideoId: '',
    photo: [],
    photoPaths: null,
  });
  

  
  useEffect(() => {
    const user = getUsernameFromToken();
    setUsername(user);
    
  }, []);

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



  useEffect(() => {
    // Sincroniza query com o valor de formData.music
    if (!query && formData.music) {
      setQuery(formData.music);
    }
  }, [formData.music]);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const newFiles = Array.from(e.target.files);
    if (formData.photo.length + newFiles.length > 6) {
      alert("Você só pode enviar no máximo 5 fotos.");
      return;
    }

    const updatedFiles = [...formData.photo, ...newFiles];
    setFormData((prev) => ({ ...prev, photo: updatedFiles }));
    setPreviewImages((prev) => [...prev, ...newFiles.map(file => URL.createObjectURL(file))]);
    e.target.value = "";
  };



  


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

          console.log(formData)
  
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
      setPreviewImages([]);
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

  const handleRemovePhotoPreview = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      photo: prev.photo.filter((_, i) => i !== indexToRemove),
    }));
    setPreviewImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };
  

  
  


  return (
    <div className="container  mx-auto p-6 sm:flex">

      <div className="lg:w-2/3 xs:w-full">
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
            <div className="sm:col-span-4">
                <label htmlFor="Nomes" className="poppins-thin block text-lg/3 font-bold text-withe">
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
              <div className=" sm:col-span-4 ">
                <label htmlFor="Titulo" className="poppins-thin block text-lg/3 font-bold text-withe">
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
              
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">

              <div className="col-span-full">
                <label htmlFor="about" className="poppins-thin block text-lg/3 font-bold text-withe">
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

              <YouTubeMusicSearch
                selectedMusicUser={{
                  title: formData.music || "",
                  thumbnail: formData.musicThumbnail || "",
                  videoId: formData.musicVideoId || "",
                }}
                onMusicSelect={(music) => setFormData({ 
                  ...formData, 
                  music: music.title, 
                  musicThumbnail: music.thumbnail, 
                  musicVideoId: music.videoId 
                })}
              />


              </div>

              

          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              
              <div className="sm:col-span-4">
              <label htmlFor="Titulo" className=" poppins-thin block text-lg/3 font-bold text-withe">
                  Inicio do relacionamento
                </label>
                <div className="mt-2">
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="block w-full rounded-md bg-gray-500 px-3 py-1.5 text-base text-withe outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6 w-full"
                  />
                </div>
              </div>

              <div className="space-y-4">
          <label className="block text-lg font-bold">Fotos do casal</label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={() => document.getElementById("file-upload")?.click()}
            className={`px-4 py-2 rounded-lg text-white ${formData.photo.length >= 5 ? "bg-gray-400 cursor-not-allowed" : "bg-gray-500"}`}
            disabled={formData.photo.length >= 5}
          >
            {formData.photo.length >= 5 ? "Limite atingido (5 fotos)" : "Adicionar Foto"}
          </button>
          {previewImages.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {previewImages.map((image, index) => (
                <div key={index} className="relative w-24 h-24">
                  <Image src={image} alt={`Preview ${index}`} width={96} height={96} className="w-full h-full object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => handleRemovePhotoPreview(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

              {formData.photoPaths && formData.photoPaths.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {formData.photoPaths.map((photoUrl, index) => (
                  <div key={index} className="relative w-24 h-24">
                    <Image src={photoUrl} alt={`Foto ${index + 1}`} width={25} height={25}  className="w-full h-full  object-cover rounded-lg shadow-md" />
                    <button
                    type='button'
                      onClick={() => handleRemovePhoto(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )} 

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
      </div>
      <PreviewLaout/>
    </div>
  );
};

export default RegisterStep;