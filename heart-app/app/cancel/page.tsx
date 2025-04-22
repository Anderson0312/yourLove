import Link from "next/link";

export default function CancelPage() {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-3xl font-bold text-red-600">Pagamento cancelado ❌</h1>
        <p className="mt-4 text-lg">O pagamento foi cancelado. Você pode tentar novamente quando quiser.</p>
        <Link  href="/register/5" className="mt-6 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
          Voltar para a página inicial
        </Link >
      </div>
    );
  }
  