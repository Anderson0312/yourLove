import { saveRegistrationData } from '@/services/api';
import { useParams } from 'next/navigation';
import {  useState } from 'react';
import Image from "next/image";

interface FormData {
    title: string;
    names: string;
    date: Date; 
    text: string;
    music: string;
    photoPaths: string[];
}
interface FormComponentProps {
    formData: FormData;
    onUpdate: (data: FormData) => void;
}

export default function FormComponent({ formData }: FormComponentProps) {
    const [formState, setFormState] = useState<FormData>({
        ...formData,
        date: formData.date ? new Date(formData.date) : new Date(), // Garante que seja um objeto Date válido
    });
    const [previewImages, setPreviewImages] = useState<string[]>([]); // Para mostrar a pré-visualização das imagens
    const [isSubmitting, setIsSubmitting] = useState(false); // Para desabilitar o botão durante o envio
    const [error, setError] = useState<string | null>(null); // Para exibir erros
    const params = useParams(); // Captura os parâmetros da URL
    const userId = params.id as string;
        

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'date') {
            // Converte a string de volta para um objeto Date
            const dateValue = new Date(value);
            setFormState({ ...formState, [name]: dateValue });
        } else {
            setFormState({ ...formState, [name]: value });
        }
    };

    const handleRemovePhotoPreview = (indexToRemove: number) => {
        setPreviewImages((prevImages) =>
          prevImages.filter((_, index) => index !== indexToRemove)
        );
      };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const fileArray = Array.from(files);
            setPreviewImages(fileArray.map((file) => URL.createObjectURL(file))); // Criar URL de pré-visualização

            // Para enviar para o back-end, você pode armazenar os arquivos ou enviar como FormData
            setFormState((prev) => ({
                ...prev,
                photoPaths: fileArray.map((file) => file.name), // Aqui você pode armazenar apenas os nomes ou URLs reais
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const currentStep = 5;

        try {
            // Enviar os dados para a API
            await saveRegistrationData(userId, currentStep, formState);

            // Limpar o formulário ou redirecionar o usuário
            setFormState({
                title: '',
                names: '',
                date: new Date(),
                text: '',
                music: '',
                photoPaths: [],
            });
            setPreviewImages([]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro desconhecido');
            console.error('Erro ao enviar os dados:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const dateValue = formState.date.toISOString().split('T')[0];
    if (!userId) return null; // Não renderiza até que `userId` seja válido


    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded shadow">
            <div>
                <label className="block text-sm font-medium">Título</label>
                <input
                    type="text"
                    name="title"
                    value={formState.title}
                    onChange={handleChange}
                    className="w-full px-2 py-1 rounded bg-gray-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Nomes</label>
                <input
                    type="text"
                    name="names"
                    value={formState.names}
                    onChange={handleChange}
                    className="w-full px-2 py-1 rounded bg-gray-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Data Inicial</label>
                <input
                    type="date"
                    name="date"
                    value={dateValue}
                    onChange={handleChange}
                    className="w-full px-2 py-1 rounded bg-gray-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Texto</label>
                <textarea
                    name="text"
                    value={formState.text}
                    onChange={handleChange}
                    className="w-full px-2 py-1 rounded bg-gray-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Imagens</label>
                <input
                    type="file"
                    name="images"
                    onChange={handleImageChange}
                    multiple
                    accept="image/*"  // Limita os arquivos para imagens
                    className="w-full px-2 py-1 rounded bg-gray-500"
                />

                {/* Exibir pré-visualização das imagens selecionadas */}
                {previewImages.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-2">
                        {previewImages.map((image, index) => (
                            <div>
                               
                            <Image 
                            width={25}
                            height={25}
                                key={index}
                                src={image}
                                alt={`Preview ${index}`}
                                className="w-20 h-20 object-cover rounded"
                            />
                             <button
                   type='button'
                    onClick={() => handleRemovePhotoPreview(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                  >
                    X
                  </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 disabled:bg-gray-400"
            >
                {isSubmitting ? 'Enviando...' : 'Salvar'}
            </button>
        </form>
    );
}
