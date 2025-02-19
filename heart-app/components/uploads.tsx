import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const ImageUpload = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSelectedImages((prev) => [...prev, ...filesArray]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="col-span-full">
      <label htmlFor="file-upload" className="block text-white text-sm font-medium">
        Fotos do casal
      </label>
      <div className="mt-2 flex flex-col items-center bg-gray-500 rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center">
          <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
          <div className="mt-4 flex text-sm text-white">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md font-semibold text-red-600 focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-red-800"
            >
              <span>Envie suas fotos</span>
              <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileChange} accept="image/png, image/jpeg"/>
            </label>
            <p className="pl-1">ou arraste aqui</p>
          </div>
          <p className="text-xs text-white">PNG, JPG até 10MB</p>
        </div>
      </div>

      {/* Previews das imagens selecionadas */}
      {selectedImages.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {selectedImages.map((file, index) => (
            <div key={index} className="relative w-20 h-20">
              <Image
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
                className="w-full h-full object-cover rounded-md border"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 text-xs hover:bg-red-800"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
