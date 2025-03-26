"use client"
import ButtonCustom from "@/components/Button";
import ChoicePlanLandigPage from "@/components/ChoicePlanLandigPage";
import FallingHearts from "@/components/animations/FallingHearts";
import Footer from "@/components/Footer";

import HeadingTop from "@/components/HeadingTop"
import DiscoverApp from "@/components/landingpage/discoverApp";
import ChoiceTema from "@/components/landingpage/choiceTema";
import { FourSteps } from "@/components/landingpage/foursteps";


export default function LandingPage() {
  
  return (
    <div className="container">
      <div className="hearts-container fixed inset-0 z-0 overflow-hidden">
         <FallingHearts />
    </div>
      <HeadingTop/>
    <div className="w-full flex container flex-col h-screen items-center justify-center md: p-10">
      <div
        className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-36 relative z-50"
        data-sentry-component="Hero"
        data-sentry-source-file="hero.tsx"
      >

        <div className="w-full pt-[50px] lg:w-1/2 lg:pt-8">

          {/* <button
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
          </button> */}


          <h1 className="text-white text-5xl lg:text-6xl font-sans pt-3 relative z-20 font-bold tracking-tight">
            Surpreenda
          </h1>
          <h2 className="relative font-bold tracking-tight text-5xl lg:text-6xl font-sans text-red-500 pb-8 z-20">
            <span className="index-module_type__E-SaG">alguém especial</span>
          </h2>


          <p className="max-w-xl text-left text-base relative md:text-lg text-neutral-300" style={{
              zIndex: 4}}>
            Pequenos gestos fazem toda a diferença. Mostre seu carinho de uma forma inesperada, criando uma página dedicada para alguém especial.
          </p>


          <ButtonCustom text={'Criar Agora'} width={50}/>


          <div className="flex flex-row items-center mt-6 w-full">
            <div className="-mr-4 relative group">
              {/* <img
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
              />*/}
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
              <div className="text-neutral-300 text-xs mt-2">Aprovado por 3.412 pessoas</div>
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
                  controls={false}
                  muted
                  src="videos/video1.mp4"
                  className="absolute inset-0 w-full h-full object-cover filter blur-[1px]"
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
                  controls={false}
                  muted
                  src="videos/video2.mp4"
                  className="absolute inset-0 w-full h-full object-cover filter blur-[1px]"
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
                  controls={false}
                  muted
                  src="videos/video3.mp4"
                  className="absolute inset-0 w-full h-full object-cover filter blur-[1px]"
                ></video>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

    <FourSteps/>

    <DiscoverApp/>

    <ChoiceTema/>

    <ChoicePlanLandigPage/>

    <Footer/>

    </div>
  );
}