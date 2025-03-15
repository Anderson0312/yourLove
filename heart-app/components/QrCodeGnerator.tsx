import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

interface QRCodeGeneratorProps {
  dynamicPath: string |  null;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ dynamicPath }) => {
  const urlBase = "https://our-love-app.vercel.app/yourDatting";
  const fullUrl = `${urlBase}/${dynamicPath}`;
  const qrRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <div className="flex flex-col items-center gap-4 p-4 border rounded-lg shadow-md">
      <div ref={qrRef}>
        <QRCodeCanvas value={fullUrl} size={200} />
      </div>
      <p className="text-sm text-gray-500 break-words">{fullUrl}</p>
      <button
        onClick={downloadQRCode}
        className="px-4 py-2 text-white border rounded hover:bg-red-600 transition"
      >
        Baixar QR Code
      </button>
    </div>
  );
};

export default QRCodeGenerator;
