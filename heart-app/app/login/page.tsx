'use client';

import { useState } from "react";
import { useRouter } from "next/navigation"; // Correção na importação
import { getRegisterUserData } from "@/services/api";

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
    <form onSubmit={handleSubmit} className="max-w-sm mt-10 mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-4">
        <label htmlFor="email" className="block text-lg font-medium text-black mb-2">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Enter your email"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-lg font-medium text-black mb-2">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-red-500"
          placeholder="Enter your password"
        />
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
      )}
      <button
        type="submit"
        className="w-full py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
        disabled={loading}
      >
        {loading ? "Loading..." : "Login"}
      </button>

    </form>
  );
}
