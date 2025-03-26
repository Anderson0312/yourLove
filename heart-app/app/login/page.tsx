'use client';

import { useState } from "react";
import { useRouter } from "next/navigation"; // Correção na importação
import { getRegisterUserData } from "@/services/api";
import Link from "next/link";
import FallingHearts from "@/components/animations/FallingHearts";
import Image from "next/image";
import GoogleButton from "@/components/GoogleButton";

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
    
    <>
    <div className="hearts-container fixed inset-0 z-0 overflow-hidden">
         <FallingHearts />
    </div>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 min-h-screen z-10 relative">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <Image
      width={25}
      height={25}
        alt="Your Company"
        src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=red&shade=600"
        className="mx-auto h-10 w-auto"
      />
      <h2 className="mt-10 text-center text-2xl/9 font-bold text-red-700">
        Entre com sua conta
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
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm/6 font-medium text-withe">
              Senha
            </label>
            <div className="text-sm">
              <a href="#" className="font-semibold text-red-600 hover:text-red-500">
                Esqueceu a senha?
              </a>
            </div>
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

        <div >
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            disabled={loading}
           >
           {loading ? "Loading..." : "Entrar 💕"}
          </button>
        </div>
      </form>

      <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-[#1a1a1a] px-2 text-gray-300">OU</span>
          </div>
        </div>


      <GoogleButton />

      <p className="mt-10 text-center text-sm/6 text-white">
        Não tem conta?{' '}
        <Link href="/cadastro" className="font-semibold text-red-600 hover:text-red-500">
          Registrar-se
        </Link>
      </p>
    </div>
    </div>
    </>
  );
}
