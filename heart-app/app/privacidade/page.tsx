'use client'
import ButtonCustom from "@/components/Button";
import Footer from "@/components/Footer";
import HeadingTop from "@/components/HeadingTop";

export default function PoliticaDePrivacidade() {
    return (
      <>
           <HeadingTop/>
      <div className="max-w-4xl mx-auto p-6 mt-5 mb-5">
        <h1 className="text-3xl font-bold mb-4">Política de Privacidade</h1>
        <p>
          Sua privacidade é importante para nós. Esta política explica como coletamos,
          usamos e protegemos suas informações.
        </p>
        <h2 className="text-xl font-semibold mt-4">1. Coleta de Informações</h2>
        <p>
          Podemos coletar informações fornecidas por você, como nome, e-mail e dados de
          uso do aplicativo.
        </p>
        <h2 className="text-xl font-semibold mt-4">2. Uso das Informações</h2>
        <p>
          Utilizamos suas informações para melhorar nossos serviços, personalizar sua
          experiência e garantir a segurança da plataforma.
        </p>
        <h2 className="text-xl font-semibold mt-4">3. Segurança</h2>
        <p>
          Implementamos medidas para proteger suas informações contra acessos não
          autorizados.
        </p>
        <h2 className="text-xl font-semibold mt-4">4. Contato</h2>
        <p>Para dúvidas sobre sua privacidade, entre em contato conosco.</p>

        <ButtonCustom text={'Começar Agora'}/>
      </div>
      <Footer/>
      </>
    );
  }
  