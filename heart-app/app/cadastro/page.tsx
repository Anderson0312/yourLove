'use client'
import { useState } from "react";
import bcrypt from "bcryptjs";
import { saveRegisterUserData } from "@/services/api";


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
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
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

      <div className="mb-4">
        <label htmlFor="username" className="block text-lg font-medium text-black mb-2">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Choose a username"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-lg font-medium text-black mb-2">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Enter your password"
        />
      </div>

      {/* Exibe mensagens de erro ou sucesso */}
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      {successMessage && <p className="text-green-600">{successMessage}</p>}

      <button
        type="submit"
        className={`w-full py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading} // Desabilita o botão durante o carregamento
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
