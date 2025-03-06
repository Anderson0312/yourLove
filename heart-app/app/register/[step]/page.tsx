'use client';

import PreviewLayoutPadrao from '@/components/previewLayoutPadrao';
import { getRegistrationData, saveRegistrationData, uploadPhotos, getUsernameFromToken } from '@/services/api';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PhotoIcon, ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid'
import Link from 'next/link';
import Image from "next/image";
import YouTubeMusicSearch from '@/components/YouTubeMusicSearch';
import LayoutSelector from '@/components/LayoutSelector';
import PreviewLayoutNetfilx from '@/components/previewLayoutNetflix';


const steps = [
  { id: 1, name: 'Title and Date' },
  { id: 2, name: 'Text and Music' },
  { id: 3, name: 'Photo and Names' },
  { id: 4, name: 'Choice Layout' },
  { id: 5, name: 'Summary' },
];

interface FormData {
  title: string;
  username: string;
  names: string;
  date: string;
  text: string;
  layout: string;
  music: string;
  musicThumbnail: string;
  musicVideoId: string;
  photo: File[] | null ; // Objetos File originais
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
    layout: '',
    music: '',
    musicThumbnail: '',
    musicVideoId: '',
    photo: null,
    photoPaths: null,
  });
  const [layout, setLayout] = useState(formData.layout || "padrao");

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
    const files = Array.from(e.target.files || []);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
    
    if (files.length > 5) {
      alert("Você só pode enviar no máximo 5 fotos.");
      return;
    }
    setFormData((prev) => ({ ...prev, photo: files }));
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
    setPreviewImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  useEffect(() => {
    if (formData.layout) {
      setLayout(formData.layout);
    }
  }, [formData.layout]); 


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
                <label htmlFor="Nomes" className="poppins-thin block text-lg font-bold text-withe">
                Nome Casal
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
                <label htmlFor="Titulo" className="poppins-thin block text-lg font-bold text-withe">
                  Titulo Site
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
                <label htmlFor="about" className="poppins-thin block text-lg font-bold text-withe">
                  Seu Texto
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
              <label htmlFor="Titulo" className=" poppins-thin block text-lg font-bold text-withe">
                  Data Inicial
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

              <div className="col-span-full">
                <label htmlFor="cover-photo" className="poppins-thin block text-lg font-bold text-withe">
                  Suas Fotos 
                </label>
                <label
                    htmlFor="file-upload"
                    className="mt-2 flex cursor-pointer justify-center bg-gray-500 rounded-lg border border-dashed border-gray-900/25 px-3 py-5"
                  >
                    <div className="text-center">
                      <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                      <div className="mt-4 flex text-sm/6 text-white">
                        <span className="relative cursor-pointer rounded-md font-semibold text-red-600 hover:text-red-800">
                          Envie suas fotos
                        </span>
                        <p className="pl-1">ou arraste aqui</p>
                      </div>
                      <p className="text-xs/5 text-white">PNG, JPG (max. 5 fotos)</p>
                    </div>
                    
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="hidden"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
              </div>  
                  {/* Exibir pré-visualização das imagens selecionadas */}
                  {previewImages.length > 0 && (
                      <div className="mt-4 grid grid-cols-3 gap-2 flex justify-center">
                          {previewImages.map((image, index) => (
                            <div key={index} className="relative w-24 h-24">
                              <Image 
                              width={25}
                              height={25}
                                  key={index}
                                  src={image}
                                  alt={`Preview ${index}`}
                                  className="w-24 h-24 object-cover rounded"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemovePhotoPreview(index)}
                                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-4 h-4"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M6.225 4.811a.75.75 0 0 1 1.06 0L12 9.525l4.715-4.714a.75.75 0 1 1 1.06 1.06L13.06 10.5l4.715 4.715a.75.75 0 1 1-1.06 1.06L12 11.575l-4.715 4.715a.75.75 0 0 1-1.06-1.06L10.94 10.5 6.225 5.785a.75.75 0 0 1 0-1.06Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>

                              </div>
                          ))}
                      </div>
                  )}  

              {formData.photoPaths && formData.photoPaths.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {formData.photoPaths.map((photoUrl, index) => (
                  <div key={index} className="relative w-24 h-24">
                    <Image src={photoUrl} alt={`Foto ${index + 1}`} width={25} height={25}  className="w-full h-full  object-cover rounded-lg shadow-md" />
                    <button
                    type='button'
                      onClick={() => handleRemovePhoto(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                    >
                     <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-4 h-4"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M6.225 4.811a.75.75 0 0 1 1.06 0L12 9.525l4.715-4.714a.75.75 0 1 1 1.06 1.06L13.06 10.5l4.715 4.715a.75.75 0 1 1-1.06 1.06L12 11.575l-4.715 4.715a.75.75 0 0 1-1.06-1.06L10.94 10.5 6.225 5.785a.75.75 0 0 1 0-1.06Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                    </button>
                  </div>
                ))}
              </div>
            )} 

            </div>
            
          )}

        {currentStep === 4 && (
          <div>
            <h2 className="text-lg font-bold">Escolha o Layout</h2>
            <LayoutSelector 
              onLayoutChange={(selectedLayout) => {
                setFormData((prev) => ({
                  ...prev,
                  layout: selectedLayout, // Atualiza o formData
                }));
                setLayout(selectedLayout);
              }} 
            />
          </div>
        )}

        {currentStep === 5 && (
          <div>
            <h2 className="text-lg font-bold">Resumo</h2>

            <div className="bg-red-500 text-white p-4 rounded">
              <p><strong>Título:</strong> {formData.title}</p>
              <p><strong>Data:</strong> {formData.date}</p>
              <p><strong>Nomes:</strong> {formData.names}</p>
              <p><strong>Seu Texto:</strong> {formData.text}</p>
              <p><strong>Layout:</strong> {formData.layout}</p>
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
                className="flex items-center justify-center bg-gray-500 text-white py-2 px-4 rounded"
              >
                <ChevronLeftIcon className="text-white mr-2 h-5 w-5"/>
                Back
              </button>
            )}
            {currentStep < steps.length && (
              <button
              type="button"
              onClick={handleNext}
              className="flex items-center justify-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Next
              <ChevronRightIcon className="text-white ml-2 h-5 w-5" />
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

      {layout === "padrao" ? (
        
          <PreviewLayoutPadrao/>
          
        ) : (
          
          <PreviewLayoutNetfilx/>
          
        )}
      
    </div>
  );
};

export default RegisterStep;