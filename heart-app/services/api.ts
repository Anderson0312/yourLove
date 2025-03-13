import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import imageCompression from 'browser-image-compression';
require('dotenv').config();


const API_BASE_URL = 'https://heart-app-backend.vercel.app/api'; // Ajuste conforme necessário
const API_BASE_URL2 = 'http://192.168.2.3:4000/api'

export const getRegistrationData = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/registration/${userId}`);
    return response.data.data;
  } catch (error) {
    console.error('Erro ao recuperar os dados:', error);
    throw error;
  }
};

export const saveRegistrationData = async (userId: string, step: number, data: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/registration/${userId}/step`, {
      ...data,
      step,
      username: userId
    });
    return response.data;
    
  } catch (error) {
    console.error('Erro ao salvar os dados:', error);
    throw error;
  }
};



const compressImage = async (file: File) => {
  const options = { maxSizeMB: 1, maxWidthOrHeight: 1024, useWebWorker: true };
  return await imageCompression(file, options);
};

export const uploadPhotos = async (userId: string, files: File[]) => {
  try {
    const compressedFiles = await Promise.all(files.map(compressImage));

    const formData = new FormData();
    compressedFiles.forEach((file) => formData.append(`files`, file));

    alert('Enviando requisição para o servidor...'); 
    const response = await axios.post(`${API_BASE_URL}/registration/${userId}/upload`, formData, {
      timeout: 60000, // 30 segundos de timeout
      headers: {},
    });

    alert('Upload das fotos concluído com sucesso!'); // Feedback visual para o usuário
    return response.data;
  } catch (error) {
    let errorMessage = 'Erro desconhecido ao fazer upload das fotos.';

    if (axios.isAxiosError(error)) {
      // Erro específico do Axios (como Network Error, timeout, etc.)
      if (error.response) {
        // Erro com resposta do servidor (status 4xx ou 5xx)
        errorMessage = `Erro no servidor: ${error.response.status} - ${error.response.data.message || 'Sem detalhes'}`;
      } else if (error.request) {
        // Erro sem resposta do servidor (falha na conexão)
        errorMessage = 'Sem resposta do servidor. Verifique sua conexão com a internet.';
      } else {
        // Outros erros do Axios
        errorMessage = `Erro ao configurar a requisição: ${error.message}`;
      }
    } else if (error instanceof Error) {
      // Erros genéricos do JavaScript
      errorMessage = `Erro: ${error.message}`;
    }

    alert(`uploadPhotos: ${errorMessage}`); // Exibe o erro em um alerta
    throw error;
  }
};

export const getRegisterUserData = async (data: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      ...data,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao recuperar os dados:', error);
    throw error;
  }
};

export const saveRegisterUserData = async (data: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/register`, {
      ...data,
    });
    return response.data;
    
  } catch (error) {
    console.error('Erro ao salvar os dados:', error);
    throw error;
  }
};

export const getUsernameFromToken = (): string | null => {
  if (typeof window === "undefined") return null; // Evita erro no Next.js SSR
  
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    return decoded?.username || null;
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
};

export async function searchYouTubeMusic(query: string) {
  const apiKey = process.env.NEXT_PUBLIC_API_YOUTUBE; // Sua chave da API do YouTube
  console.log(apiKey);
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&videoCategoryId=10&maxResults=5&key=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    
    if (!data.items || data.items.length === 0) {
      return []; // Retorna array vazio se não encontrar músicas
    }

    return data.items.map((item: any) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.default.url,
    }));
  } catch (error) {
    console.error("Erro ao buscar músicas:", error);
    return [];
  }
}

