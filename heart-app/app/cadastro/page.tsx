'use client'
import { useState } from "react";
import bcrypt from "bcryptjs";
import { saveRegisterUserData } from "@/services/api";
import Link from "next/link";
import FallingHearts from "@/components/FallingHearts";


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
  <>
  <div className="hearts-container fixed inset-0 z-0 overflow-hidden">
       <FallingHearts />
  </div>
  <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 min-h-screen z-10 relative">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img
      alt="Your Company"
      src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=red&shade=600"
      className="mx-auto h-10 w-auto"
    />
    <h2 className="mt-10 text-center text-2xl/9 font-bold text-red-700">
    Cadastro de usuário
    </h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm/6 font-medium text-withe">
        Endereço de Email
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm/6 font-medium text-withe">
        Nome de usuario
        </label>
        <div className="mt-2">
          <input
            id="Username"
            name="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm/6 font-medium text-withe">
            Senha
          </label>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
          />
        </div>
      </div>

      {errorMessage && <p className="text-red-600 text-center">💔 {errorMessage}</p>}
      {successMessage && <p className="text-green-600 text-center">💕 {successMessage}</p>}

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          disabled={loading}
         >
         {loading ? "Cadastrando com amor..." : "Criar Conta 💕"}
        </button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm/6 text-white">
    Já tem uma conta?{' '}
      <Link href="/login" className="font-semibold text-red-600 hover:text-red-500">
        fazer login
      </Link>
    </p>
  </div>
  </div>
  </>
  );
}
