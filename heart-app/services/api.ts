import axios from 'axios';

const API_BASE_URL = 'https://heart-app-backend.vercel.app/api'; // Ajuste conforme necessário

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


export const getSpotifyToken = async () => {
  const clientId = '3e2e8c7beed44d56a2b6962e6a20a2fc';
  const clientSecret = '4c3074872fa34ccc94cddd7e534d454b';

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
};

export const searchMusic = async (query: string , token: any) => {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  return data.tracks.items; // Retorna a lista de músicas encontradas
};