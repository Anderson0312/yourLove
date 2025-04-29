const API_URL = 'https://heart-app-backend.vercel.app/api';

export const api = {
  // Registrations
  getAllRegistrations: async () => {
    const response = await fetch(`${API_URL}/registration/all`);
    return await response.json();
  },
  
  getRegistration: async (userId: string) => {
    const response = await fetch(`${API_URL}/registration/${userId}`);
    return await response.json();
  },
  
  createRegistration: async (userId: string, data: any) => {
    const response = await fetch(`${API_URL}/registration/create/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  },
  
  updateRegistration: async (userId: string, data: any) => {
    const response = await fetch(`${API_URL}/registration/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  },
  
  deleteRegistration: async (userId: string) => {
    const response = await fetch(`${API_URL}/registration/${userId}`, {
      method: 'DELETE',
    });
    return await response.json();
  },
  
  getMetrics: async () => {
    const response = await fetch(`${API_URL}/registration/metrics`);
    return await response.json();
  },
  
  saveStep: async (userId: string, stepData: any) => {
    const response = await fetch(`${API_URL}/registration/save-step/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stepData),
    });
    return await response.json();
  }
};