'use client';

import { getRegistrationData, saveRegistrationData, uploadPhoto } from '@/services/api';
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
  names: string;
  date: string;
  text: string;
  music: string;
  photo: File | null;
}

const RegisterStep = () => {
  const router = useRouter();
  const params = useParams();
  const stepParam = params.step ? parseInt(params.step as string, 10) : 1;

  const [currentStep, setCurrentStep] = useState<number>(stepParam);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    date: '',
    names: '',
    text: '',
    music: '',
    photo: null,
  });

  const userId = 'Anderson'; // Defina o userId conforme necessário

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
        console.log('Dados recebidos da API:', data);
  
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
        console.log('Dados a serem enviados:', formData); // Log para depuração
        if (currentStep === 3 && formData.photo) {
          await uploadPhoto(userId, formData.photo);
        } else {
          await saveRegistrationData(userId, currentStep, formData);
        }

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
      console.log('Dados no submit:', formData);
      await saveRegistrationData(userId, currentStep, formData);
      alert('Dados enviados com sucesso!');
      router.push('/success'); // Redireciona para uma página de sucesso
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
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
            <input
              type="text"
              placeholder="Music"
              value={formData.music}
              onChange={(e) => setFormData({ ...formData, music: e.target.value })}
              className="w-full px-2 py-1 rounded bg-gray-500"
            />
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
              onChange={(e) =>
                setFormData({ ...formData, photo: e.target.files ? e.target.files[0] : null })
              }
              className="w-full px-2 py-1 rounded bg-gray-500"
            />
          </div>
          
        )}

        {currentStep === 4 && (
          <div>
            <h2 className="text-lg font-bold">Summary</h2>
            <pre className="bg-red-500 text-white p-4 rounded">{JSON.stringify(formData, null, 2)}</pre>
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
  );
};

export default RegisterStep;