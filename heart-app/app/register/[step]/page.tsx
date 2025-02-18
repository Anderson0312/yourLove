'use client';

import PreviewLaout from '@/components/previewLaout';
import { getRegistrationData, saveRegistrationData, uploadPhotos, getSpotifyToken, getUsernameFromToken } from '@/services/api';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
          console.log(uploadResponse)
  
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


  const handleSearch = async () => {
    console.log('Função handleSearch chamada'); // Verifique se essa mensagem aparece no console
    if (!query) {
      console.log('Campo de busca vazio'); // Verifique se o campo de busca está vazio
      alert('Por favor, digite o nome da música.');
      return;
    }
  
    try {
      console.log('Buscando música...'); // Verifique se a busca está sendo iniciada
      const token = await getSpotifyToken(); // Função para obter o token de acesso
      console.log('Token obtido:', token); // Verifique se o token foi obtido
  
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
  
      console.log('Resposta da API:', response); // Verifique a resposta da API
  
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Dados da API:', data); // Verifique os dados retornados pela API
  
      if (data.tracks.items.length > 0) {
        console.log('Música encontrada:', data.tracks.items[0]); // Verifique a música encontrada
        setPreviewUrl(data.tracks.items[0].preview_url); // Pega o preview da primeira música
        setFormData((prev) => ({ ...prev, music: data.tracks.items[0].name })); // Atualiza o nome da música no formData
      } else {
        console.log('Nenhuma música encontrada.');
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
      <div className="flex justify-center items-center space-x-4 mb-6">
        {steps.map((s, index) => (
          <div key={s.id} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex justify-center items-center ${
                currentStep === s.id ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'
              }`}
            >
              {s.id}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-12 h-1 ${
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
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-2 py-1 rounded bg-gray-500"
            />
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-2 py-1 rounded bg-gray-500"
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <textarea
              placeholder="Text"
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              className="w-full px-2 py-1 rounded bg-gray-500"
            />
              
              <div className="">
              <input
                type="text"
                placeholder="Digite o nome da música"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-2 py-1 rounded bg-gray-500"
              />
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
            <input
              type="text"
              placeholder="Nomes do casal"
              value={formData.names}
              onChange={(e) => setFormData({ ...formData, names: e.target.value })}
              className="w-full px-2 py-1 rounded bg-gray-500"
            />
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full px-2 py-1 rounded bg-gray-500"
              />

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
            <p><strong>Username:</strong> {formData.username}</p>
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