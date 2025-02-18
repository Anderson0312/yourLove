'use client';

import { useState } from "react";
import { useRouter } from "next/navigation"; // Correção na importação
import { getRegisterUserData } from "@/services/api";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter(); // Correção na importação



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verifica se os campos estão preenchidos
    if (!email || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      // Prepara os dados para enviar (sem hash no frontend)
      const data = { email, password };

      // Envia os dados para a API
      const response = await getRegisterUserData(data);     

      // Verifica a resposta da API
      if (response?.message === "Login successful" && response?.token) {
          localStorage.setItem('token', response.token);
          router.push('/register/1'); 
          return; // Isso evita que o setLoading(false) rode depois
      } else {
        setErrorMessage(response?.message || "Error creating user. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred during registration.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-6 bg-pink-50 rounded-lg shadow-lg border border-red-200">
      <h2 className="text-center text-2xl font-bold text-red-600">Login</h2>
      <div className="mb-4">
      <label htmlFor="email" className="block text-lg font-medium text-red-600 mb-2">💌 Seu Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Insira seu email"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-lg font-medium text-red-600 mb-2">🔐 Escolha uma Senha</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-pink-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-red-400"
          placeholder="Digite uma senha segura"
        />
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
      )}
      <button
        type="submit"
        className="w-full py-2 mb-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
        disabled={loading}
      >
        {loading ? "Loading..." : "Login 💕"}
      </button>

      <p className="text-center text-black">
      Não tem uma conta? <Link href='/cadastro' className='text-red-500 hover:text-red-700 hover:underline'>Inscreva-se 💑</Link>
  </p>
    </form>
  );
}
