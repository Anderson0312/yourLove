import Image from 'next/image'

export function FourSteps() {

    return (
              <div className="pt-40 lg:pt-8 pb-12 flex container flex-col items-center justify-center md: p-10 " data-sentry-component="HowWork" data-sentry-source-file="how-work.tsx">
        
              <button className="relative flex border content-center bg-black/20 hover:bg-black/10 transition duration-500 dark:bg-white/20 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit rounded-full" data-sentry-element="Tag" data-sentry-source-file="hover-border-gradient.tsx" data-sentry-component="HoverBorderGradient">
                <div className="w-auto z-10 px-4 py-2 rounded-[inherit] bg-black text-white text-xs flex items-center space-x-2">
                  <span>Como funciona?</span>
                </div>
                <div className="flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]" data-sentry-element="unknown" data-sentry-source-file="hover-border-gradient.tsx" style={{
            filter: "blur(2px)",
            position: "absolute",
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(17.6037% 44.7655% at 14.2653% 62.2437%, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)",
          }}></div>
                <div className="bg-black absolute z-1 flex-none inset-[2px] rounded-[100px]"></div>
              </button>
        
              <h2 className="bg-clip-text text-center text-transparent bg-gradient-to-b from-neutral-200 to-white text-3xl lg:text-5xl font-sans py-2 relative z-20 font-bold tracking-tight">
                Crie a página em 4 etapas
              </h2>
        
        
              <p className="max-w-xl text-center text-base md:text-lg text-neutral-200 mb-16">
                Surpreenda alguém especial com uma página personalizada. É fácil e rápido.
              </p>
        
        
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
        
                <div className="flex flex-col lg:border-r py-10 relative group/feature lg:border-l lg:border-b border-neutral-800" data-sentry-component="Feature" data-sentry-source-file="how-work.tsx">
                  <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-800 to-transparent pointer-events-none"></div>
                  <div className="mb-4 relative z-10 px-10 text-neutral-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tabler-icon tabler-icon-list-numbers">
                      <path d="M11 6h9"></path>
                      <path d="M11 12h9"></path>
                      <path d="M12 18h8"></path>
                      <path d="M4 16a2 2 0 1 1 4 0c0 .591 -.5 1 -1 1.5l-3 2.5h4"></path>
                      <path d="M6 10v-6l-2 2"></path>
                    </svg>
                  </div>
                  <div className="text-lg font-bold mb-2 relative z-10 px-10">
                    <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-700 group-hover/feature:bg-red-500 transition-all duration-200 origin-center"></div>
                    <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-100">1. Formulário de criação</span>
                  </div>
                  <p className="text-sm text-neutral-300 max-w-xs relative z-10 px-10">Siga as etapas preenchendo o formulário.</p>
                </div>
        
        
                <div className="flex flex-col lg:border-r py-10 relative group/feature lg:border-b border-neutral-800" data-sentry-component="Feature" data-sentry-source-file="how-work.tsx">
                  <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-800 to-transparent pointer-events-none"></div>
                  <div className="mb-4 relative z-10 px-10 text-neutral-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tabler-icon tabler-icon-coin">
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                      <path d="M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 0 1 -1.8 -1"></path>
                      <path d="M12 7v10"></path>
                    </svg>
                  </div>
                  <div className="text-lg font-bold mb-2 relative z-10 px-10">
                    <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-700 group-hover/feature:bg-red-500 transition-all duration-200 origin-center"></div>
                    <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-100">2. Pagamento seguro</span>
                  </div>
                  <p className="text-sm text-neutral-300 max-w-xs relative z-10 px-10">Faça o pagamento de forma segura com Cartão de Crédito.</p>
                </div>
        
        
                <div className="flex flex-col lg:border-r py-10 relative group/feature lg:border-b border-neutral-800" data-sentry-component="Feature" data-sentry-source-file="how-work.tsx">
                  <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-800 to-transparent pointer-events-none"></div>
                  <div className="mb-4 relative z-10 px-10 text-neutral-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tabler-icon tabler-icon-qrcode">
                      <path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
                      <path d="M7 17l0 .01"></path>
                      <path d="M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
                      <path d="M7 7l0 .01"></path>
                      <path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
                      <path d="M17 7l0 .01"></path>
                      <path d="M14 14l3 0"></path>
                      <path d="M20 14l0 .01"></path>
                      <path d="M14 14l0 3"></path>
                      <path d="M14 20l3 0"></path>
                      <path d="M17 17l3 0"></path>
                      <path d="M20 17l0 3"></path>
                    </svg>
                  </div>
                  <div className="text-lg font-bold mb-2 relative z-10 px-10">
                    <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-700 group-hover/feature:bg-red-500 transition-all duration-200 origin-center"></div>
                    <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-100">3. Código QR e link</span>
                  </div>
                  <p className="text-sm text-neutral-300 max-w-xs relative z-10 px-10">Você receberá um QR code e um link via email para acessar a página personalizada.</p>
                </div>
        
        
                <div className="flex flex-col lg:border-r py-10 relative group/feature lg:border-b border-neutral-800" data-sentry-component="Feature" data-sentry-source-file="how-work.tsx">
                  <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-800 to-transparent pointer-events-none"></div>
                  <div className="mb-4 relative z-10 px-10 text-neutral-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tabler-icon tabler-icon-hearts">
                      <path d="M14.017 18l-2.017 2l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 0 1 8.153 5.784"></path>
                      <path d="M15.99 20l4.197 -4.223a2.81 2.81 0 0 0 0 -3.948a2.747 2.747 0 0 0 -3.91 -.007l-.28 .282l-.279 -.283a2.747 2.747 0 0 0 -3.91 -.007a2.81 2.81 0 0 0 -.007 3.948l4.182 4.238z"></path>
                    </svg>
                  </div>
                  <div className="text-lg font-bold mb-2 relative z-10 px-10">
                    <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-700 group-hover/feature:bg-red-500 transition-all duration-200 origin-center"></div>
                    <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-100">4. Faça a surpresa</span>
                  </div>
                  <p className="text-sm text-neutral-300 max-w-xs relative z-10 px-10">Faça uma surpresa para alguém especial compartilhando o link ou o QR code.</p>
                </div>
              </div>
        
        
              <div className="flex flex-col lg:flex-row items-center justify-center gap-16 mt-12 lg:mt-0">
                <div>
                  <p className="text-white font-bold text-3xl lg:text-4xl lg:max-w-md">É <span className="text-red-600">fácil e rápido</span> de criar, veja um exemplo de página.</p>
                </div>
                <Image
                  src="/1-removebg.png" // caminho da imagem
                  alt="example image"
                  width={540} // largura
                  height={520} // altura
                  priority
                />
              </div>
            </div>
    )
  }

