'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const steps = [
  { id: 1, name: 'Title and Date' },
  { id: 2, name: 'Text and Music' },
  { id: 3, name: 'Photo' },
  { id: 4, name: 'Summary' },
];

interface FormData {
  title: string;
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
    text: '',
    music: '',
    photo: null,
  });

  useEffect(() => {
    if (stepParam >= 1 && stepParam <= steps.length) {
      setCurrentStep(stepParam);
    } else {
      router.push('/register/1'); // Redireciona para o primeiro step caso o step seja inválido
    }
  }, [stepParam, router]);

  const handleNext = () => {
    if (currentStep < steps.length) {
      const nextStep = currentStep + 1;
      router.push(`/register/${nextStep}`);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      router.push(`/register/${prevStep}`);
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
                currentStep === s.id ? 'bg-red-500  text-white' : 'bg-gray-300 text-black'
              }`}
            >
              {s.id}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-12 h-1 ${
                  currentStep > s.id ? 'bg-red-500 ' : 'bg-gray-300'
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <form>
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
