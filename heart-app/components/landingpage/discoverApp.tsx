import { QRCodeCanvas } from "qrcode.react";
import Countdown from "../Countdown";
import LayoutSelector from "../LayoutSelector";
import YouTubeMusicSearch from "../YouTubeMusicSearch";


export default function DiscoverApp() {
  const data = new Date();
  data.setFullYear(data.getFullYear() -2); // Adiciona 1 ano
  data.setMonth(data.getMonth() + 3);
  const fullUrl = `https://our-love-app.vercel.app/register/1`
    return (
      <div className=" bg-gradient-to-r from-red-600 to-red-500 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <div>
          <h2 className="text-center text-base/7 font-semibold text-black">O que oferecemos</h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Vários Recursos
          </p>
          <p className="text-center text-base md:text-lg text-neutral-200 mb-4">
          Veja os recursos que você pode adicionar à sua página personalizada
          </p>

          </div>
          <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-md bg-white lg:rounded-l-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-20 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                  Contador de tempo
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Mostre há quanto tempo vocês estão juntos com um contador em tempo real.
                  </p>
                </div>
                <div className="@container relative min-h-[30rem] w-full grow max-lg:mx-auto max-lg:max-w-sm">
                  <div className="flex justify-center items-center absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[4cqw] border-x-[0.6cqw] border-t-[0.8cqw] border-gray-700 shadow-2xl"
                  style={{ backgroundColor:'#0A0A0A'}}>
                    <Countdown startDate={data} />
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-l-[2rem]"></div>
            </div>


            <div className="relative max-lg:row-start-1" id="recursos">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Música Escolhida</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  escolha uma música especial para vocês.
                  </p>
                </div>
                <div className="@container relative min-h-[15rem] w-full grow max-lg:mx-auto max-lg:max-w-sm">
                  <div className="flex justify-center mt-2  absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[4cqw] border-x-[0.6cqw] border-t-[0.8cqw] border-gray-700 shadow-2xl"
                  style={{ backgroundColor:'#0A0A0A'}}>
                  <YouTubeMusicSearch/>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-t-[2rem]"></div>
            </div>
            <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
              <div className="absolute inset-px rounded-lg bg-white"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Qr Code</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Baixe seu QR code ao finalizar o pagamento.
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                  <QRCodeCanvas value={fullUrl}
                    size={170} 
                    level="H" 
                    imageSettings={{
                      src: "/heart.png",
                      height: 60, 
                      width: 60,
                      excavate: true,
                    }}/>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5"></div>
            </div>


            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                  Layout Customizável
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Customize o layout da sua pagina da maneira que mais gostar.
                  </p>
                </div>

                   

                  <div className="@container relative min-h-[30rem] w-full grow max-lg:mx-auto max-lg:max-w-sm">
                  <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[4cqw] border-x-[0.6cqw] border-t-[0.8cqw] border-gray-700 bg-gray-900 shadow-2xl"
                  style={{ backgroundColor:'#0A0A0A'}}>
                    <LayoutSelector />
                  </div>
                </div>
                    
                  
                
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  