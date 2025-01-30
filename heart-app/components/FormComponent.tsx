import { useState } from 'react';

interface FormData {
    title: string;
    names: string;
    startDate: string;
    text: string;
    images: string[];
}
interface FormComponentProps {
    formData: FormData;
    onUpdate: (data: FormData) => void;
}

export default function FormComponent({ formData, onUpdate }: FormComponentProps) {
    const [formState, setFormState] = useState<FormData>(formData);
    const [previewImages, setPreviewImages] = useState<string[]>([]); // Para mostrar a pré-visualização das imagens


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const fileArray = Array.from(files);
            setPreviewImages(fileArray.map((file) => URL.createObjectURL(file))); // Criar URL de pré-visualização

            // Para enviar para o back-end, você pode armazenar os arquivos ou enviar como FormData
            setFormState((prev) => ({
                ...prev,
                images: fileArray.map((file) => file.name), // Aqui você pode armazenar apenas os nomes ou URLs reais
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onUpdate(formState);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4  rounded shadow">
            <div>
                <label className="block text-sm font-medium ">Título</label>
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
                    name="name"
                    value={formState.names}
                    onChange={handleChange}
                    className="w-full px-2 py-1 rounded bg-gray-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Data Inicial</label>
                <input
                    type="datetime-local"
                    name="startDate"
                    value={formState.startDate}
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
                    accept="/public/"  // Limita os arquivos para imagens
                    className="w-full px-2 py-1 rounded bg-gray-500"
                />

                {/* Exibir pré-visualização das imagens selecionadas */}
                {previewImages.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-2">
                        {previewImages.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Preview ${index}`}
                                className="w-20 h-20 object-cover rounded"
                            />
                        ))}
                    </div>
                )}
            </div>

            <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
                Salvar
            </button>
        </form>
    );
}
