import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = 'https://heart-app-backend.vercel.app/api'; // Ajuste conforme necessário
const API_BASE_URL2 = 'http://localhost:4000/api'

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

export const uploadPhotos = async (userId: string, files: File[]) => {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append(`files`, file); // Enviando com chave 'files' (o backend deve suportar múltiplos arquivos)
    });

    const response = await axios.post(`${API_BASE_URL}/registration/${userId}/upload`, formData);
    return response.data;
    
  } catch (error) {
    console.error('Erro ao fazer upload das fotos:', error);
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








export const fetchTokenFromBackend = async () => {
  const response = await fetch(`${API_BASE_URL}/spotify-auth/token`);
  const data = await response.json();
  return data.accessToken;
};



export const searchMusic = async (query: string , token: any) => {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  return data; // Retorna a lista de músicas encontradas
};



export async function searchYouTubeMusic(query: string) {
  const apiKey = "AIzaSyAEwXdMDQpKIiMQj37kkadIQ_3YrItdFZU"; // Sua chave da API do YouTube
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