"use client"
import HeadingTop from "@/components/HeadingTop"
import Link from "next/link";

export default function LandingPage() {

  
  return (
    <div className="container">
      <HeadingTop/>
    <div className="w-full flex container flex-col h-screen items-center justify-center md: p-10">
      <div
        className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-36 relative z-50"
        data-sentry-component="Hero"
        data-sentry-source-file="hero.tsx"
      >

        <div className="w-full pt-[100px] lg:w-1/2 lg:pt-8">

          <button
            className="relative flex border content-center bg-black/20 hover:bg-black/10 transition duration-500 dark:bg-white/20 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit rounded-full"
            data-sentry-element="Tag"
            data-sentry-source-file="hover-border-gradient.tsx"
            data-sentry-component="HoverBorderGradient"
          >
            <div className="w-auto z-10 px-4 py-2 rounded-[inherit] bg-black text-white text-xs flex items-center space-x-2">
              <span>Vamos começar?</span>
            </div>
            <div
              className="flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
              data-sentry-element="unknown"
              data-sentry-source-file="hover-border-gradient.tsx"
              style={{
                filter: "blur(2px)",
                position: "absolute",
                width: "100%",
                height: "100%",
                background:
                  "radial-gradient(19.5501% 47.7815% at 60.2043% 12.8957%, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)",
              }}
            ></div>
            <div className="bg-black absolute z-1 flex-none inset-[2px] rounded-[100px]"></div>
          </button>


          <h1 className="text-white text-5xl lg:text-6xl font-sans pt-3 relative z-20 font-bold tracking-tight">
            Surpreenda
          </h1>
          <h2 className="relative font-bold tracking-tight text-5xl lg:text-6xl font-sans text-red-500 pb-8 z-20">
            <span className="index-module_type__E-SaG">alguém especial</span>
          </h2>


          <p className="max-w-xl text-left text-base relative md:text-lg text-neutral-300">
            Pequenos gestos fazem toda a diferença. Mostre seu carinho de uma forma inesperada, criando uma página dedicada para alguém especial.
          </p>


          <button
            type="button"
            className="relative mt-6 w-full lg:w-[50%] inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] focus:outline-none focus:ring-0"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ffcbcb_0%,#b23939_50%,#ffcbcb_100%)]"></span>
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black px-3 py-1 text-sm font-semibold text-white backdrop-blur-3xl">
              <Link href='https://our-love-app.vercel.app/login'>
              Começar
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="tabler-icon tabler-icon-chevron-right ml-4"
              >
                <path d="M9 6l6 6l-6 6"></path>
              </svg>
            </span>
          </button>


          <div className="flex flex-row items-center mt-6 w-full">
            <div className="-mr-4 relative group">
              <img
                height="60"
                width="60"
                alt="João & Maria"
                className="object-cover !m-0 !p-0 object-top rounded-full h-10 w-10 border-2 group-hover:scale-105 group-hover:z-30 border-white relative transition duration-500"
                src="/images/approved/1.webp"
              />
            </div>
            <div className="-mr-4 relative group">
              <img
                height="60"
                width="60"
                alt="Ana & Pedro"
                className="object-cover !m-0 !p-0 object-top rounded-full h-10 w-10 border-2 group-hover:scale-105 group-hover:z-30 border-white relative transition duration-500"
                src="/images/approved/2.webp"
              />
            </div>
            <div className="-mr-4 relative group">
              <img
                height="60"
                width="60"
                alt="Lucas & Carol"
                className="object-cover !m-0 !p-0 object-top rounded-full h-10 w-10 border-2 group-hover:scale-105 group-hover:z-30 border-white relative transition duration-500"
                src="/images/approved/3.webp"
              />
            </div>
            <div className="-mr-4 relative group">
              <img
                height="60"
                width="60"
                alt="Camila & Felipe"
                className="object-cover !m-0 !p-0 object-top rounded-full h-10 w-10 border-2 group-hover:scale-105 group-hover:z-30 border-white relative transition duration-500"
                src="/images/approved/4.webp"
              />
            </div>
            <div className="-mr-4 relative group">
              <img
                height="60"
                width="60"
                alt="Bia & Henrique"
                className="object-cover !m-0 !p-0 object-top rounded-full h-10 w-10 border-2 group-hover:scale-105 group-hover:z-30 border-white relative transition duration-500"
                src="/images/approved/5.webp"
              />
            </div>
            <div className="-mr-4 relative group">
              <img
                height="60"
                width="60"
                alt="Clara & Rafael"
                className="object-cover !m-0 !p-0 object-top rounded-full h-10 w-10 border-2 group-hover:scale-105 group-hover:z-30 border-white relative transition duration-500"
                src="/images/approved/6.webp"
              />
            </div>
            <div className="relative ml-8 md:ml-12">
              <div className="flex flex-row items-center gap-2">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="#FFD700"
                  stroke="none"
                  className="tabler-icon tabler-icon-star-filled"
                  data-sentry-element="IconStarFilled"
                  data-sentry-source-file="hero.tsx"
                >
                  <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"></path>
                </svg>

              </div>
              <div className="text-neutral-300 text-xs mt-2">Aprovado por 37.412 pessoas</div>
            </div>
          </div>
        </div>


        <div className="relative lg:flex items-center w-full lg:w-1/2 justify-center">

          <div
            className="absolute w-[80%] max-w-[100px] lg:max-w-[220px] lg:rotate-[0deg] lg:translate-x-[-200px] aspect-[9/16] transition-all duration-300 hover:z-50 hover:scale-110"
            style={{
              zIndex: 3,
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 4px 6px, rgba(0, 0, 0, 0.08) 0px 1px 3px",
            }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden cursor-not-allowed">
              <div data-sentry-component="LazyLoadVideo" data-sentry-source-file="lazy-video.tsx">
                <video
   
                  preload="metadata"
                  loop
                  autoPlay
                  playsInline
                  muted
                  src="videos/video1.mp4"
                  className="absolute inset-0 w-full h-full object-cover"
                ></video>
              </div>
            </div>
          </div>


          <div
            className="absolute w-[80%] max-w-[100px] lg:max-w-[220px] lg:rotate-[10deg] aspect-[9/16] lg:mt-8 transition-all translate-x-[120px] lg:translate-x-[0px] duration-300 hover:z-50 hover:scale-110"
            style={{zIndex: 2, boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 4px 6px, rgba(0, 0, 0, 0.08) 0px 1px 3px",
          }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden cursor-not-allowed">
              <div data-sentry-component="LazyLoadVideo" data-sentry-source-file="lazy-video.tsx">
                <video
                  preload="metadata"
                  loop
                  autoPlay
                  playsInline
                  muted
                  src="videos/video1.mp4"
                  className="absolute inset-0 w-full h-full object-cover"
                ></video>
              </div>
            </div>
          </div>


          <div
            className="absolute w-[80%] max-w-[100px] lg:max-w-[220px] lg:rotate-[20deg] aspect-[9/16] lg:mt-32 translate-x-[240px] lg:translate-x-[200px] transition-all duration-300 hover:z-50 hover:scale-110"
            style={{
              zIndex: 3,
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 4px 6px, rgba(0, 0, 0, 0.08) 0px 1px 3px",
            }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden cursor-not-allowed">
              <div data-sentry-component="LazyLoadVideo" data-sentry-source-file="lazy-video.tsx">
                <video
                  preload="metadata"
                  loop
                  autoPlay
                  playsInline
                  muted
                  src="videos/video1.mp4"
                  className="absolute inset-0 w-full h-full object-cover"
                ></video>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      <div className="pt-40 lg:pt-8 pb-12 flex container flex-col items-center justify-center md: p-10" data-sentry-component="HowWork" data-sentry-source-file="how-work.tsx">

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
          <p className="text-sm text-neutral-300 max-w-xs relative z-10 px-10">Faça o pagamento de forma segura com Cartão de Crédito ou PIX.</p>
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
        <img alt="example image" data-sentry-element="Image" data-sentry-source-file="how-work.tsx" loading="lazy" width="540" height="520" decoding="async" data-nimg="1" className="lg:mt-14 w-auto h-auto" src="1.png" style={{color: "transparent"}}/>
      </div>
    </div>


    <div className="container flex flex-col items-center justify-center pb-12 md: p-10" data-sentry-component="Themes" data-sentry-source-file="themes.tsx">

      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-200 to-white text-3xl lg:text-5xl font-sans py-2 relative z-20 font-bold tracking-tight">
        Escolha o tema ideal
      </h2>


      <p className="max-w-xl text-center text-base md:text-lg text-neutral-200 mb-4">
        Escolha o tema ideal para a página personalizada. Você pode escolher entre os temas abaixo.
      </p>


      <div className="lg:grid lg:grid-cols-2 lg:gap-6">

        <div className="py-20 flex items-center justify-center" style={{perspective: '1000px'}}>
                  <div className="flex items-center justify-center relative transition-all duration-200 ease-linear inter-var"  style={{
                transform:
                  "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
              }}
            >
            <div className="[transform-style:preserve-3d] [&amp;>*]:[transform-style:preserve-3d] relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black border-white/[0.2] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border" data-sentry-component="CardBody" data-sentry-source-file="3d-card.tsx">
            
              <div className="w-fit transition duration-200 ease-linear text-xl font-bold text-white" data-sentry-element="Tag" data-sentry-source-file="3d-card.tsx" data-sentry-component="CardItem" style={{
                      transform:
                        "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
                    }}
                  >
                Padrão
              </div>

            
              <p className="w-fit transition duration-200 ease-linear text-sm max-w-sm mt-2 text-neutral-300" data-sentry-element="Tag" data-sentry-source-file="3d-card.tsx" data-sentry-component="CardItem" style={{
                  transform:
                    "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
                }}
              >
                Tema padrão com contador de tempo e animações de fundo.
              </p>

            
              <div className="transition duration-200 ease-linear w-full mt-4" data-sentry-element="Tag" data-sentry-source-file="3d-card.tsx" data-sentry-component="CardItem" style={{
                  transform:
                    "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
                }}
              >
                <video data-sentry-element="Image" loop data-sentry-source-file="themes.tsx" autoPlay muted playsInline width="1000" height="1000" data-nimg="1" className="w-full rounded-xl group-hover/card:shadow-xl" src="videos/videoweb.mp4" style={{color: 'transparent'}}/>
              </div>


              <div className="flex justify-between items-center mt-14">
                <div className="w-fit transition duration-200 ease-linear px-4 py-2 rounded-xl text-xs font-normal text-white" data-sentry-element="Tag" data-sentry-source-file="3d-card.tsx" data-sentry-component="CardItem"  style={{
                  transform:
                    "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
                }}
              >
                  Experimentar agora
                </div>
                <div className="w-fit transition duration-200 ease-linear px-4 py-2 rounded-xl bg-white text-black text-xs font-bold cursor-pointer" data-sentry-element="Tag" data-sentry-source-file="3d-card.tsx" data-sentry-component="CardItem"  style={{
                  transform:
                    "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
                }}
              >
                  Começar agora
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="py-20 flex items-center justify-center" style={{perspective: '1000px'}}>
          <div className="flex items-center justify-center relative transition-all duration-200 ease-linear inter-var" style={{
              transform:
                "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
            }}>
            <div className="[transform-style:preserve-3d] [&amp;>*]:[transform-style:preserve-3d] relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black border-white/[0.2] w-auto sm:w-[30rem] h-auto -mt-32 lg:mt-0 rounded-xl p-6 border" data-sentry-component="CardBody" data-sentry-source-file="3d-card.tsx">
            
              <div className="w-fit transition duration-200 ease-linear text-xl font-bold text-white" data-sentry-element="Tag" data-sentry-source-file="3d-card.tsx" data-sentry-component="CardItem" style={{
                  transform:
                    "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
                }}
              >
                Netflix
              </div>

            
              <p className="w-fit transition duration-200 ease-linear text-sm max-w-sm mt-2 text-neutral-300" data-sentry-element="Tag" data-sentry-source-file="3d-card.tsx" data-sentry-component="CardItem" style={{
                    transform:
                      "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
                  }}
                >
                Tema inspirado na Netflix com data e episódios(fotos) favoritos.
              </p>

            
              <div className="transition duration-200 ease-linear w-full mt-4" data-sentry-element="Tag" data-sentry-source-file="3d-card.tsx" data-sentry-component="CardItem" style={{
                  transform:
                    "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
                }}
              >
                <video  autoPlay muted loop data-sentry-element="Image" playsInline data-sentry-source-file="themes.tsx"  width="1000" height="1000" data-nimg="1" className="w-full rounded-xl group-hover/card:shadow-xl" src="videos/videoweb2.mp4" style={{color: 'transparent'}}/>
              </div>

              
              <div className="flex justify-between items-center mt-14">
                <div className="w-fit transition duration-200 ease-linear px-4 py-2 rounded-xl text-xs font-normal text-white" data-sentry-element="Tag" data-sentry-source-file="3d-card.tsx" data-sentry-component="CardItem" style={{
                    transform:
                      "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
                  }}>
                  Experimentar agora
                </div>
                <div className="w-fit transition duration-200 ease-linear px-4 py-2 rounded-xl bg-white text-black text-xs font-bold cursor-pointer" data-sentry-element="Tag" data-sentry-source-file="3d-card.tsx" data-sentry-component="CardItem" style={{
                  transform:
                    "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
                }}>
                  Começar agora
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    
    </div>
  );
}