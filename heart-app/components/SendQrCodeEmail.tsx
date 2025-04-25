'use client'; 
import { useEffect, useState } from 'react';

export default function SendQRCodeEmail() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [username, setUsername] = useState<string | null>(null);
    
    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        setUsername(savedUsername); 
      }, []);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch('/api/sendemail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: 'Email enviado com sucesso!', type: 'success' });
        setEmail('');
        setUsername('');
      } else {
        throw new Error(data.message || 'Falha ao enviar email');
      }
    } catch (error:any) {
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg shadow-md bg-gray-50 border dark:bg-gray-800 ">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Receba seu QrCode via email</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Seu email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-800 shadow-sm focus:border-pink-500 focus:ring-pink-500 p-2 border"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Enviando...' : 'Receber QRCode por Email'}
        </button>
      </form>
      {message.text && (
        <div className={`mt-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}
    </div>
  );
}