import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api'; // Ajuste conforme necessário

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
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao salvar os dados:', error);
    throw error;
  }
};

export const uploadPhoto = async (userId: string, file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_BASE_URL}/registration/${userId}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer upload da foto:', error);
    throw error;
  }
};