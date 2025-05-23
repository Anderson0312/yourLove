'use client';

import PreviewLayoutPadrao from '@/components/previewLayoutPadrao';
import { getRegistrationData, saveRegistrationData, uploadPhotos } from '@/services/api';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PhotoIcon, ChevronRightIcon, ChevronLeftIcon, CalendarDateRangeIcon } from '@heroicons/react/24/solid'
import Link from 'next/link';
import Image from "next/image";
import YouTubeMusicSearch from '@/components/YouTubeMusicSearch';
import LayoutSelector from '@/components/LayoutSelector';
import PreviewLayoutNetfilx from '@/components/previewLayoutNetflix';
import ChoicePlan from '@/components/ChoicePlan';
import HeadingTop from '@/components/HeadingTop';
import { v4 as uuidv4 } from 'uuid';

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
  date: Date | null;
  text: string;
  layout: string;
  music: string;
  musicThumbnail: string;
  musicVideoId: string;
  photo: File[] | null;
  photoPaths: string[] | null;
  modelo_carrosel: string;
  modelo_date: string;
}


const RegisterStep = () => {
  const router = useRouter();
  const params = useParams();
  const stepParam = params.step ? parseInt(params.step as string, 10) : 1;
  const [query, setQuery] = useState('');
  const [username, setUsername] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(stepParam);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    username: '',
    date: null,
    names: '',
    text: '',
    layout: 'padrao',
    music: '',
    musicThumbnail: '',
    musicVideoId: '',
    photo: null,
    photoPaths: null,
    modelo_carrosel: 'padrao',
    modelo_date: 'nenhum',
  });
  const [errors, setErrors] = useState<{ names?: string; title?: string }>({});
  const [showErrors, setShowErrors] = useState(false);
  const [layout, setLayout] = useState(formData.layout || "padrao");
  const [modCarrosel, setModCarrosel] = useState(formData.modelo_carrosel || "padrao");
  const [modAnimation, setModAnimation] = useState(formData.modelo_date || "nenhum");

  useEffect(() => {
    // Verifica se já existe um username no localStorage
    const savedUsername = localStorage.getItem('username');

    // Se não existir um username salvo E tivermos nomes no form, gera um novo
    if (!savedUsername && formData.names) {
      const cleanName = formData.names.replace(/\s+/g, '').toLowerCase();
      const uniqueId = uuidv4().split('-')[0];
      const generatedUsername = `${cleanName}-${uniqueId}`;

      setUsername(generatedUsername);
      localStorage.setItem('username', generatedUsername);
    } else if (savedUsername) {
      // Se já existir um username, usa esse
      setUsername(savedUsername);
    }
  }, [formData.names]);

  useEffect(() => {
    const fetchData = async () => {
      if (!username) return; // Evita chamadas se username for indefinido

      try {
        const data = await getRegistrationData(username);
        setFormData((prevData) => ({
          ...prevData,
          ...data,
        }));
      } catch (error) {
        console.error('Erro ao recuperar os dados:', error);
      }
    };

    fetchData();
  }, [username]);

  useEffect(() => {
    if (stepParam >= 1 && stepParam <= steps.length) {
      setCurrentStep(stepParam);
    } else {
      router.push('/register/1');
    }
  }, [stepParam, router]);

  useEffect(() => {
    if (!query && formData.music) {
      setQuery(formData.music);
    }
  }, [formData.music]);

  useEffect(() => {
    if (formData.layout) {
      setLayout(formData.layout);
    }
  }, [formData.layout]);

  useEffect(() => {
    return () => {
      previewImages.forEach((image) => URL.revokeObjectURL(image));
    };
  }, [previewImages]);

  const validateFields = () => {
    const newErrors: { names?: string; title?: string } = {};

    if (!formData.names) {
      newErrors.names = "Insira seu nome para continuar.";
    }
    if (!formData.title) {
      newErrors.title = "Insira um título para continuar.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));

    if (files.length > 6) {
      alert("Você só pode enviar no máximo 5 fotos.");
      return;
    }
    setFormData((prev) => ({ ...prev, photo: files }));
  };

  const handleNext = async () => {
    if (currentStep < steps.length) {
      try {
        if (!username) return;
        if (currentStep === 1) {
          const isValid = validateFields();
          setShowErrors(true);

          if (!isValid) return;
        }

        if (currentStep === 3 && formData.photo) {
          setIsUploading(true);
          const uploadResponse = await uploadPhotos(username, formData.photo);

          setFormData((prev) => ({
            ...prev,
            photoPaths: uploadResponse.filePaths,
          }));

          console.log(formData)

          await saveRegistrationData(username, currentStep, {
            ...formData,
            photoPaths: uploadResponse.filePaths,
          });
        } else {
          await saveRegistrationData(username, currentStep, formData);
        }

        const nextStep = currentStep + 1;
        router.push(`/register/${nextStep}`);
      } catch (error) {
        console.error('Erro ao salvar os dados:', error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleBack = async () => {
    if (currentStep > 1) {
      if (!username) return;
      try {
        await saveRegistrationData(username, currentStep, formData);
        const prevStep = currentStep - 1;
        router.push(`/register/${prevStep}`);
      } catch (error) {
        console.error('Erro ao salvar os dados:', error);
      }
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!username) return; 
  //   try {
  //     await saveRegistrationData(username, currentStep, formData);
  //     alert('Dados enviados com sucesso!');
  //     setPreviewImages([]);
  //     router.push('/success');
  //   } catch (error) {
  //     console.error('Erro ao enviar os dados:', error);
  //   }
  // };

  const handleRemovePhoto = async (index: number) => {
    if (!formData.photoPaths) return;

    const updatedPaths = formData.photoPaths.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, photoPaths: updatedPaths }));

    if (!username) return;
    try {
      await saveRegistrationData(username, currentStep, {
        ...formData,
        photoPaths: updatedPaths,
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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value ? new Date(e.target.value) : null;
    setFormData((prev) => ({ ...prev, date: newDate }));
  };



  return (
    <div>
      <HeadingTop />

      <div className="container  mx-auto p-6 sm:flex">
        <div className="lg:w-2/3 xs:w-full">
          {/* Step Indicators */}
          <div className="flex justify-center items-center space-x-1 mb-6">
            {steps.map((s, index) => (
              <div key={s.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex justify-center items-center ${currentStep === s.id ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-300 text-black'
                    }`}
                >
                  <Link href={`/register/${s.id}`}>
                    {s.id}
                  </Link>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 h-2 ${currentStep > s.id ? 'bg-red-500' : 'bg-gray-300'
                      }`}
                  ></div>
                )}
              </div>
            ))}
          </div>

          {/* Form Content */}
          <form>
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
                      className="block w-full rounded-md bg-transparent border px-3 py-1.5 text-base text-withe outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
                    />
                    {showErrors && errors.names && <p className="text-red-500 text-sm mt-1">{errors.names}</p>}

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
                      className="block w-full rounded-md bg-transparent border px-3 py-1.5 text-base text-withe outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
                    />
                    {showErrors && errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
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
                      className="block w-full rounded-md bg-transparent border px-3 py-1.5 text-base text-withe outline-1 -outline-offset-1 outline-red-300 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/7"
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
                    Data De Início Relacionamento
                  </label>
                  <div className="mt-2 relative">
                    <input
                      id="date"
                      name="date"
                      placeholder='Data de quando se conheceram'
                      type="datetime-local"
                      value={formData.date ? formData.date.toLocaleString('sv-SE').slice(0, 16) : ''}
                      onChange={handleDateChange}
                      className="block w-full rounded-md bg-transparent border px-3 py-2 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 sm:text-sm pl-10"
                      style={{ width: '100%' }}
                    />
                    <CalendarDateRangeIcon className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="cover-photo" className="poppins-thin block text-lg font-bold text-withe">
                    Suas Fotos
                  </label>
                  <label
                    htmlFor="file-upload"
                    className="mt-2 flex cursor-pointer justify-center bg-transparent rounded-lg border px-3 py-5"
                  >
                    <div className="text-center">
                      <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                      <div className="mt-4 flex text-sm/6 text-white">
                        <span className="relative cursor-pointer rounded-md font-semibold text-red-600 hover:text-red-800">
                          Click aqui
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
                      accept="image/png, image/jpeg , image/jpg"
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
                        <Image src={photoUrl} alt={`Foto ${index + 1}`} width={25} height={25} className="w-full h-full  object-cover rounded-lg shadow-md" />
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

                {isUploading && (
                  <div className="flex justify-center items-center">
                    <div className="w-12 h-12 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
                  </div>
                )}

              </div>

            )}

            {currentStep === 4 && (
              <div>
                <LayoutSelector
                  onLayoutChange={(selectedLayout) => {
                    setFormData((prev) => ({
                      ...prev,
                      layout: selectedLayout, // Atualiza o formData com o layout
                    }));
                    setLayout(selectedLayout);
                  }}
                  onCarrouselChange={(selectedCarrosel) => {
                    setFormData((prev) => ({
                      ...prev,
                      modelo_carrosel: selectedCarrosel,
                    }));
                    setModCarrosel(selectedCarrosel);
                  }}
                  onAnimatedChange={(selectedAnimation) => {
                    setFormData((prev) => ({
                      ...prev,
                      modelo_date: selectedAnimation,
                    }));
                    setModAnimation(selectedAnimation);
                  }}
                />


              </div>
            )}

            {currentStep === 5 && (
              <div>
                {/* <h2 className="text-lg font-bold">Resumo</h2>
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
            </div> */}
                <ChoicePlan />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center justify-center border text-white py-2 px-4 rounded"
                >
                  <ChevronLeftIcon className="text-white mr-2 h-5 w-5" />
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
              {/* {currentStep === steps.length && (
              <button
                type="submit"
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Submit
              </button>
            )} */}
            </div>
          </form>
        </div>

        {layout === "padrao" ? (
          <PreviewLayoutPadrao modeloCarrosel={modCarrosel} modeloAnimeted={modAnimation} />
        ) : (
          <PreviewLayoutNetfilx />
        )}

      </div>
    </div>
  );
};

export default RegisterStep;