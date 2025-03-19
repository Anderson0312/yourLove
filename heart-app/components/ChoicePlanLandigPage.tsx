import { CheckIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';

const tiers = [
  {
    name: 'Anual',
    id: 'tier-Anual',
    href: '#',
    priceMonthly: '15',
    priceId : 'price_1R03syCmHaaYVWvZsbny3ljD',
    quantity:1,
    description: "O plano perfeito se você está começando a usar nosso site",
    features: ['Texto Dedicado', 'Contador Tempo Real', 'Data De Inicio', 'Máximo de 6 Imagens', 'Suport 24h','Música Escolhida'],
    featured: false,
  },
  {
    name: 'Vida Toda',
    id: 'tier-lifetime',
    href: '#',
    priceMonthly: '25',
    priceId : 'price_1R04PnCmHaaYVWvZDnHnELJe',
    quantity:1,
    description: 'Ideal para você que quer um site para lembrar da pessoa amanha para toda vida.',
    features: [
      'Texto Dedicado',
      'Contador Tempo Real',
      'Data De Inicios',
      'Máximo de 6 Imagens',
      'Suport 24hs',
      'Música Escolhida',
      'URL Customisada',
      'Layout Escolhido',
    ],
    featured: true,
  },
]


function classNames(...classes: (string | undefined | null | boolean)[]) {
    return classes.filter(Boolean).join(' ');
  }

export default function ChoicePlanLandigPage() {

  return (
    <div className="relative isolate md: p-10">
      <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="mx-auto aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base/7 font-semibold text-red-500">Preços</h2>
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-200 to-white text-3xl lg:text-5xl font-sans py-2 relative z-20 font-bold tracking-tight">
        Escolha o plano ideal para você
        </h2>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-300 md:text-lg text-neutral-200 mb-4">
      Escolha um plano acessível que esteja repleto dos melhores recursos para a pagina com seu amor.
      </p>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured ? 'border-2 border-white-500/50 relative bg-dark shadow-2xl  hover:shadow-2xl hover:shadow-emerald-500/[0.1]  border-white/[0.2]' : 'bg-white sm:mx-8 lg:mx-0 shadow-2xl border-2 border-red-500/50 hover:shadow-2xl hover:shadow-emerald-500/[0.1]  border-white/[0.2]',
              tier.featured
                ? ''
                : tierIdx === 0
                  ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl'
                  : 'sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none',
              'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10',
            )}
          >
            <h3
              id={tier.id}
              className={classNames(tier.featured ? 'text-red-400' : 'text-red-600', 'text-base/7 font-semibold')}
            >
              {tier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={classNames(
                  tier.featured ? 'text-white' : 'text-gray-900',
                  'text-5xl font-semibold tracking-tight',
                )}
              >
                R$
                {tier.priceMonthly}
              </span>
              <span className={classNames(tier.featured ? 'text-gray-400' : 'text-gray-500', 'text-base')}></span>
            </p>
            <p className={classNames(tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-6 text-base/7')}>
              {tier.description}
            </p>
            <ul
              role="list"
              className={classNames(
                tier.featured ? 'text-gray-300' : 'text-gray-600',
                'mt-8 space-y-3 text-sm/6 sm:mt-10',
              )}
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    aria-hidden="true"
                    className={classNames(tier.featured ? 'text-red-400' : 'text-red-600', 'h-6 w-5 flex-none')}
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              aria-describedby={tier.id}
              type='button'
              className={classNames(
                tier.featured
                  ? 'w-full bg-red-500 text-white shadow-xs hover:bg-red-400 focus-visible:outline-red-500'
                  : 'w-full text-red-600 ring-1 ring-red-200 ring-inset hover:ring-red-300 focus-visible:outline-red-600',
                'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10',
              )}
            >

              <Link href='https://our-love-app.vercel.app/register/1'>
              Criar Agora
              </Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
