import { useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { getRegistrationData, saveRegistrationData } from "@/services/api";

interface QRCodeGeneratorProps {
  dynamicPath: string | null;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ dynamicPath }) => {
  const urlBase = "https://ourlovee.vercel.app/yourDatting";
  const fullUrl = `${urlBase}/${dynamicPath}`;
  const qrRef = useRef<HTMLDivElement | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const downloadQRCode = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.getElementsByTagName("canvas")[0];

      if (canvas) {
        const url = canvas.toDataURL("image/png");

        const a = document.createElement("a");
        a.href = url;
        a.download = `qrcode-${dynamicPath}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    }
  };

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    setUsername(savedUsername);
  }, []);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const currentStep = 5;
    const formDataPayment = "PAGO";

    if (!username) {
      setIsLoading(false);
      return;
    }
    
    try {
      const existingData = await getRegistrationData(username);
      await saveRegistrationData(username, currentStep, {
        ...existingData,
        payment: formDataPayment,
      });
    } catch (error) {
      console.error("Erro ao enviar os dados de pagamento:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadAndSubmit = (e: React.MouseEvent) => {
    downloadQRCode();
    handleSubmit(e);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 border rounded-lg shadow-md">
      <div ref={qrRef}>
        <QRCodeCanvas
          value={fullUrl}
          size={220}
          level="H"
          imageSettings={{
            src: "/heart.png",
            height: 60,
            width: 60,
            excavate: true,
          }}
        />
      </div>
      <p className="text-sm text-gray-500 break-words">{fullUrl}</p>
      <button
        onClick={handleDownloadAndSubmit}
        disabled={isLoading}
        className={`px-4 py-2 text-white border rounded bg-red-600 transition ${
          isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
        }`}
      >
        {isLoading ? "Processando..." : "Baixar QR Code"}
      </button>
    </div>
  );
};

export default QRCodeGenerator;