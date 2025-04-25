// utils/qrcodeGenerator.ts
import { toDataURL } from 'qrcode';

export async function generateQRCodeDataURL(dynamicPath: string): Promise<string> {
  const urlBase = "https://ourlovee.vercel.app/yourDatting";
  const fullUrl = `${urlBase}/${dynamicPath}`;
  
  try {
    return await toDataURL(fullUrl, {
      width: 220,
      margin: 2,
      color: {
        dark: '#EC4899', // Cor rosa para combinar com yourLove
        light: '#FFFFFF'
      }
    });
  } catch (err) {
    console.error('Error generating QR code:', err);
    throw err;
  }
}