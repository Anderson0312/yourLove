'use client'
import { useState } from "react";
import bcrypt from "bcryptjs";
import { saveRegisterUserData } from "@/services/api";
import Link from "next/link";


export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verifica se os campos estão preenchidos
    if (!email || !username || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    setLoading(true);
    setErrorMessage("");  // Limpa mensagens de erro

    try {
      // Faz o hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Prepara os dados para enviar
      const data = {
        email,
        username,
        password: hashedPassword, // Senha criptografada
      };

      // Envia os dados para a função de registro
      const user = await saveRegisterUserData(data);

      // Verifica a resposta da API
      if (user) {
        setSuccessMessage("User created successfully!");
        setEmail("");
        setUsername("");
        setPassword("");
      } else {
        setErrorMessage("Error creating user. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred during registration.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-6 bg-pink-50 rounded-lg shadow-lg border border-red-200">
  <h2 className="text-center text-2xl font-bold text-red-600">Cadastro de usuário</h2>
  
  <div className="mb-4 mt-4">
    <label htmlFor="email" className="block text-lg font-medium text-red-600 mb-2">💌 Seu Email</label>
    <input
      id="email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full px-4 py-2 border border-pink-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-red-400"
      placeholder="Insira seu email"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="username" className="block text-lg font-medium text-red-600 mb-2">💑 Escolha um Username</label>
    <input
      id="username"
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="w-full px-4 py-2 border border-pink-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-red-400"
      placeholder="Escolha seu nome de usuário"
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

  {errorMessage && <p className="text-red-600 text-center">💔 {errorMessage}</p>}
  {successMessage && <p className="text-green-600 text-center">💕 {successMessage}</p>}

  <button
    type="submit"
    className={`w-full py-2 mb-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    disabled={loading}
  >
    {loading ? "Cadastrando com amor..." : "Criar Conta 💕"}
  </button>

  <p className="text-center text-black">
    Já tem uma conta? <Link href='/login' className='text-red-500 hover:text-red-700 hover:underline'>Faça login aqui 💑</Link>
  </p>
  </form>
  </div>
  );
}
