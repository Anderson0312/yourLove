import ButtonCustom from '../Button'



export default function ChoiceTema() {
  return (
    <div className="container flex flex-col items-center justify-center pb-12 md: p-10" data-sentry-component="Themes" data-sentry-source-file="themes.tsx">
    <h2 className="text-center text-base/7 font-semibold text-red-500">Nosso diferencial</h2>
    <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-200 to-white text-3xl lg:text-5xl font-sans py-2 relative z-20 font-bold tracking-tight">
      Escolha o tema ideal
    </h2>


    <p className="max-w-xl text-center text-base md:text-lg text-neutral-200 mb-4">
      Escolha o tema ideal para a página personalizada. Você pode escolher entre os temas abaixo.
    </p>


    <div className="lg:grid lg:grid-cols-2 lg:gap-6">

      <div className="py-20 flex items-center justify-center lg:transition-all duration-300 hover:z-50 hover:scale-105" style={{perspective: '1000px'}}>
                <div className="flex items-center justify-center relative transition-all duration-200 ease-linear inter-var"  style={{
              transform:
                "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
            }}
          >
          <div className="grid justify-items-center [transform-style:preserve-3d] [&amp;>*]:[transform-style:preserve-3d] relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black border-white/[0.2] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border" data-sentry-component="CardBody" data-sentry-source-file="3d-card.tsx">
          
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
              <video data-sentry-element="Image" loop data-sentry-source-file="themes.tsx" autoPlay muted playsInline controls={false} width="1000" height="1000" data-nimg="1" className="w-full rounded-xl group-hover/card:shadow-xl" src="videos/videoweb.mp4" style={{color: 'transparent'}}/>
            </div>


            <div className="flex justify-between items-center mt-14">
            <ButtonCustom text={'Criar Agora'} width={100}/>
            </div>
          </div>
        </div>
      </div>


      <div className="py-20 flex items-center justify-center lg:transition-all duration-300 hover:z-50 hover:scale-105" style={{perspective: '1000px'}}>
        <div className="flex items-center justify-center relative transition-all duration-200 ease-linear inter-var" style={{
            transform:
              "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
          }}>
          <div className="grid justify-items-center [transform-style:preserve-3d] [&amp;>*]:[transform-style:preserve-3d] relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black border-white/[0.2] w-auto sm:w-[30rem] h-auto -mt-32 lg:mt-0 rounded-xl p-6 border" data-sentry-component="CardBody" data-sentry-source-file="3d-card.tsx">
          
            <div className="w-fit transition duration-200 ease-linear text-xl font-bold text-white" data-sentry-element="Tag" data-sentry-source-file="3d-card.tsx" data-sentry-component="CardItem" style={{
                transform:
                  "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
              }}
            >
              loveflix
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
              <video  autoPlay muted loop data-sentry-element="Image" playsInline data-sentry-source-file="themes.tsx" controls={false} width="1000" height="1000" data-nimg="1" className="w-full rounded-xl group-hover/card:shadow-xl" src="videos/videoweb2.mp4" style={{color: 'transparent'}}/>
            </div>

            
            <div className="flex justify-between items-center mt-14">
            <ButtonCustom text={'Criar Agora'} width={100}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
