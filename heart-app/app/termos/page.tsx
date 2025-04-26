'use client'
import ButtonCustom from "@/components/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeadingTop from "@/components/HeadingTop";

export default function TermosDeUso() {
  return (
    <>
      <HeadingTop />
      <Header />
      <div className="max-w-4xl mx-auto p-6 mt-5 mb-5">
        <h1 className="text-3xl font-bold mb-4">Termos de Uso</h1>
        <p>
          Bem-vindo ao nosso aplicativo! Ao acessar ou usar nossos serviços, você concorda
          com os seguintes termos e condições. Leia atentamente antes de continuar.
        </p>
        <h2 className="text-xl font-semibold mt-4">1. Uso do Serviço</h2>
        <p>
          Você concorda em utilizar nossos serviços apenas para fins legais e de acordo com
          todas as leis e regulamentos aplicáveis.
        </p>
        <h2 className="text-xl font-semibold mt-4">2. Modificações</h2>
        <p>
          Reservamo-nos o direito de modificar ou descontinuar qualquer parte do serviço sem
          aviso prévio.
        </p>
        <h2 className="text-xl font-semibold mt-4">3. Contato</h2>
        <p>Se tiver dúvidas, entre em contato conosco pelo suporte.</p>

        <ButtonCustom text={'Começar Agora'} />
      </div>
      <Footer />
    </>
  );
}