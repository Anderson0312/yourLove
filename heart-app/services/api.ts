import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import imageCompression from 'browser-image-compression';
require('dotenv').config();

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ||'http://localhost:3001/api',
});

export const getRegistrationData = async (userId: string) => {
  try {
    const response = await api.get(`/registration/${userId}`);
    return response.data.data;
  } catch (error) {
    console.error('Erro ao recuperar os dados:', error);
    throw error;
  }
};

export const saveRegistrationData = async (userId: string, step: number, data: any) => {
  try {
    const response = await api.post(`/registration/${userId}/step`, {
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

    // alert(`Enviando requisição para o servidor... ${compressedFiles}`); 
    const response = await api.post(`/registration/${userId}/upload`, formData, {
      timeout: 120000, // 30 segundos de timeout
      headers: {},
    });

    //  alert('Upload das fotos concluído com sucesso!'); 
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
    const response = await api.post(`/auth/login`, {
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
    const response = await api.post(`/users/register`, {
      ...data,
    });
    return response.data;
    
  } catch (error) {
    console.error('Erro ao salvar os dados:', error);
    throw error;
  }
};

export const getUsernameFromToken = (): string | null => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenUrl = urlParams.get('token');
  
    if (tokenUrl) {
        localStorage.setItem('token', tokenUrl);
        const decoded: any = jwtDecode(tokenUrl);
        console.log('tokenUrl', decoded)
        // Redirecione ou faça outras ações necessárias
    } else {
        console.error('Token not found in URL');
    }
   
    
  if (typeof window === "undefined") return null; 
  
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    console.log('tokenLogin', decoded)
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



