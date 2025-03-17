const Footer = () => {
    return (
      <footer className="w-full pt-24 bg-gradient-to-r from-red-600 to-red-500 grid grid-cols-1 gap-12 px-12 box-border md:grid-cols-3">
        <div className="box-border flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-white">Sobre nós</h2>
          <p className="text-white text-sm">
            Nós criamos páginas de amor para surpreender seus entes queridos. Nosso objetivo é criar páginas personalizadas e únicas para cada ocasião, utilizando a tecnologia QR Code para tornar o momento ainda mais especial.
          </p>
          <p className="font-bold text-white text-sm">CNPJ 40.327.903/0001-04</p>
        </div>
        
        <div className="flex flex-col gap-2 box-border">
          <h2 className="text-2xl font-bold text-white">Contato</h2>
          <p className="text-white text-sm">
            Através do nosso <b>WhatsApp</b>, estamos sempre prontos para esclarecer todas as suas dúvidas e ajudar com qualquer questão relacionada à sua compra.
          </p>
          <a href="mailto:suporte@our-love.com" className="text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8">
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
            suporte@our-love.com
          </a>
        </div>
        
        <div className="box-border flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-white">Métodos de pagamento</h2>
          <div className="flex w-full gap-8 max-md:grid-cols-2">
            <div className="w-[60px]">
              <svg fill="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
                <path d="M16.539 9.186a4.155 4.155 0 0 0-1.451-.251c-1.6 0-2.73.806-2.738 1.963-.01.85.803 1.329 1.418 1.613.631.292.842.476.84.737-.004.397-.504.577-.969.577-.639 0-.988-.089-1.525-.312l-.199-.093-.227 1.332c.389.162 1.09.301 1.814.313 1.701 0 2.813-.801 2.826-2.032.014-.679-.426-1.192-1.352-1.616-.563-.275-.912-.459-.912-.738 0-.247.299-.511.924-.511a2.95 2.95 0 0 1 1.213.229l.15.067.227-1.287-.039.009zm4.152-.143h-1.25c-.389 0-.682.107-.852.493l-2.404 5.446h1.701l.34-.893 2.076.002c.049.209.199.891.199.891h1.5l-1.31-5.939zm-10.642-.05h1.621l-1.014 5.942H9.037l1.012-5.944v.002zm-4.115 3.275.168.825 1.584-4.05h1.717l-2.551 5.931H5.139l-1.4-5.022a.339.339 0 0 0-.149-.199 6.948 6.948 0 0 0-1.592-.589l.022-.125h2.609c.354.014.639.125.734.503l.57 2.729v-.003zm12.757.606.646-1.662c-.008.018.133-.343.215-.566l.111.513.375 1.714H18.69v.001h.001z"></path>
              </svg>
            </div>
            <div className="w-[60px]">
              <svg viewBox="0 -9 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="57" height="39" rx="3.5" fill="white" stroke="#F3F3F3"></rect>
                <path d="M34.3102 28.9765H23.9591V10.5122H34.3102V28.9765Z" fill="#828282"></path>
                <path d="M24.6223 19.7429C24.6223 15.9973 26.3891 12.6608 29.1406 10.5107C27.1285 8.93843 24.5892 7.99998 21.8294 7.99998C15.2961 7.99998 10 13.2574 10 19.7429C10 26.2283 15.2961 31.4857 21.8294 31.4857C24.5892 31.4857 27.1285 30.5473 29.1406 28.975C26.3891 26.8249 24.6223 23.4884 24.6223 19.7429" fill="#dbdbdb"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="col-span-full text-center text-white mt-12 text-sm py-2 flex items-center justify-center gap-2 max-md:flex-col">
          <a className="text-white" href="/termos">Termos de uso</a>
          <span>•</span>
          <a className="text-white" href="/privacidade">Política de Privacidade</a>
          <span>•</span>
          <p>Todos os direitos reservados - Our Love 2025</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;