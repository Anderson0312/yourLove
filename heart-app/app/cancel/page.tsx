'use client'

import Header from "@/components/Header";
import HeadingTop from "@/components/HeadingTop";
import Link from "next/link";

export default function CancelPage() {
    return (
      <div className="bg-gray-50 dark:bg-gray-900">
      <HeadingTop/>
      <Header/>     
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full m-2 space-y-6 p-6 bg-white rounded-lg shadow-lg items-center dark:bg-gray-800 ">
        <div className="flex flex-col items-center">
          <CircleCancelIcon className="text-red-500 h-16 w-16 " />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-4">Pagamento Cancelado</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">O pagamento foi cancelado. Você pode tentar novamente quando quiser.</p>
        <div className="mt-2 border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
        <Link  href="/register/5" className="mt-6 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
          Voltar para a página inicial
        </Link >
        </div>
        </div>
        </div>
      </div>
      </div>

    );
  }


  function CircleCancelIcon(props:any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    )
  }

//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
//   <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
// </svg>

  