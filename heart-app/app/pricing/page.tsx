"use client"

import { useState } from "react"
import ChoicePlan from "@/components/ChoicePlan"
import { Button } from "@/components/buttonv2"
import { Header } from "@/components/Header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/accordion"
import { CheckIcon,  StarIcon, } from "lucide-react"
import Footer from "@/components/Footer"
import HeadingTop from "@/components/HeadingTop"
import { useRouter } from "next/navigation"

export default function PricingPage() {
    const router = useRouter()
    const [showTestimonials, setShowTestimonials] = useState(true)

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
            {/* Header */}
            <HeadingTop />
            <Header />

            {/* Hero Section */}
            <section className="container mx-auto py-12 px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Escolha o Plano Perfeito</h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                    Crie memórias eternas com seu amor. Escolha o plano que melhor se adapta às suas necessidades.
                </p>
            </section>

            {/* Pricing Plans */}
            <section className="py-12">
                <ChoicePlan />
            </section>

            {/* Features Comparison */}
            <section className="container mx-auto py-16 px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Compare os Recursos</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="py-4 px-6 text-left">Recurso</th>
                                <th className="py-4 px-6 text-center">Teste Grátis</th>
                                <th className="py-4 px-6 text-center">Anual</th>
                                <th className="py-4 px-6 text-center">Vida Toda</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800">
                                <td className="py-4 px-6">Texto Dedicado</td>
                                <td className="py-4 px-6 text-center">
                                    <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                                </td>
                            </tr>
                            <tr className="border-b border-gray-800">
                                <td className="py-4 px-6">Contador Tempo Real</td>
                                <td className="py-4 px-6 text-center">
                                    <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                                </td>
                            </tr>
                            <tr className="border-b border-gray-800">
                                <td className="py-4 px-6">Data De Inicio</td>
                                <td className="py-4 px-6 text-center">
                                    <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                                </td>
                            </tr>
                            <tr className="border-b border-gray-800">
                                <td className="py-4 px-6">Imagens</td>
                                <td className="py-4 px-6 text-center">Máximo 2</td>
                                <td className="py-4 px-6 text-center">Máximo 5</td>
                                <td className="py-4 px-6 text-center">Máximo 5</td>
                            </tr>
                            <tr className="border-b border-gray-800">
                                <td className="py-4 px-6">Edição Pós site feito</td>
                                <td className="py-4 px-6 text-center">
                                    <div className="h-5 w-5 mx-auto text-red-500">✕</div>
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                                </td>
                            </tr>
                            <tr className="border-b border-gray-800">
                                <td className="py-4 px-6">QR Code</td>
                                <td className="py-4 px-6 text-center">
                                    <div className="h-5 w-5 mx-auto text-red-500">✕</div>
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                                </td>
                            </tr>
                            <tr className="border-b border-gray-800">
                                <td className="py-4 px-6">Suporte 24h</td>
                                <td className="py-4 px-6 text-center">
                                    <div className="h-5 w-5 mx-auto text-red-500">✕</div>
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                                </td>
                            </tr>
                            <tr className="border-b border-gray-800">
                                <td className="py-4 px-6">Música Escolhida</td>
                                <td className="py-4 px-6 text-center">
                                    <div className="h-5 w-5 mx-auto text-red-500">✕</div>
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                                </td>
                            </tr>
                            <tr className="border-b border-gray-800">
                                <td className="py-4 px-6">Layout Escolhido</td>
                                <td className="py-4 px-6 text-center">
                                    <div className="h-5 w-5 mx-auto text-red-500">✕</div>
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <div className="h-5 w-5 mx-auto text-red-500">✕</div>
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                                </td>
                            </tr>
                            <tr className="border-b border-gray-800">
                                <td className="py-4 px-6">Duração</td>
                                <td className="py-4 px-6 text-center">1 dia</td>
                                <td className="py-4 px-6 text-center">1 ano</td>
                                <td className="py-4 px-6 text-center">Para sempre</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Testimonials */}
            {showTestimonials && (
                <section className="container mx-auto py-16 px-4">
                    <h2 className="text-3xl font-bold text-center mb-2">O Que Nossos Clientes Dizem</h2>
                    <p className="text-center text-gray-400 mb-12">Histórias reais de casais que usam nossa plataforma</p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                            <div className="flex items-center gap-2 mb-4">
                                <StarIcon className="h-5 w-5 text-yellow-500" />
                                <StarIcon className="h-5 w-5 text-yellow-500" />
                                <StarIcon className="h-5 w-5 text-yellow-500" />
                                <StarIcon className="h-5 w-5 text-yellow-500" />
                                <StarIcon className="h-5 w-5 text-yellow-500" />
                            </div>
                            <p className="text-gray-300 mb-4">
                                "Criei uma página para celebrar nosso aniversário de 5 anos. Minha esposa amou! O contador em tempo real
                                é incrível e as músicas deixam tudo mais especial."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
                                    R
                                </div>
                                <div>
                                    <p className="font-medium">Ricardo Souza</p>
                                    <p className="text-sm text-gray-400">Plano Vida Toda</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                            <div className="flex items-center gap-2 mb-4">
                                <StarIcon className="h-5 w-5 text-yellow-500" />
                                <StarIcon className="h-5 w-5 text-yellow-500" />
                                <StarIcon className="h-5 w-5 text-yellow-500" />
                                <StarIcon className="h-5 w-5 text-yellow-500" />
                                <StarIcon className="h-5 w-5 text-yellow-500" />
                            </div>
                            <p className="text-gray-300 mb-4">
                                "Comecei com o teste gratuito e logo fiz upgrade para o plano anual. Vale cada centavo! Poder editar o
                                site depois e ter suporte 24h faz toda diferença."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                    M
                                </div>
                                <div>
                                    <p className="font-medium">Marina Oliveira</p>
                                    <p className="text-sm text-gray-400">Plano Anual</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                            <div className="flex items-center gap-2 mb-4">
                                <StarIcon className="h-5 w-5 text-yellow-500" />
                                <StarIcon className="h-5 w-5 text-yellow-500" />
                                <StarIcon className="h-5 w-5 text-yellow-500" />
                                <StarIcon className="h-5 w-5 text-yellow-500" />
                                <StarIcon className="h-5 w-5 text-yellow-500" />
                            </div>
                            <p className="text-gray-300 mb-4">
                                "Escolhi o plano Vida Toda para nosso casamento. Compartilhamos o QR code com todos os convidados. Agora
                                temos uma lembrança digital eterna do nosso amor."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                                    J
                                </div>
                                <div>
                                    <p className="font-medium">João e Carla</p>
                                    <p className="text-sm text-gray-400">Plano Vida Toda</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ Section */}
            <section className="container mx-auto py-16 px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Perguntas Frequentes</h2>

                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1" className="border-b border-gray-700">
                            <AccordionTrigger className="text-left py-4">
                                O que acontece quando meu teste gratuito expira?
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-300 pb-4">
                                Quando seu teste gratuito de 1 dia expirar, você será redirecionado para a página de preços para
                                escolher um plano. Seu site continuará existindo, mas você não poderá acessá-lo até fazer upgrade para
                                um plano pago.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2" className="border-b border-gray-700">
                            <AccordionTrigger className="text-left py-4">Posso mudar de plano depois?</AccordionTrigger>
                            <AccordionContent className="text-gray-300 pb-4">
                                Sim! Você pode fazer upgrade do plano Anual para o plano Vida Toda a qualquer momento. A diferença de
                                valor será calculada proporcionalmente ao tempo restante do seu plano atual.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3" className="border-b border-gray-700">
                            <AccordionTrigger className="text-left py-4">Como funciona o QR Code?</AccordionTrigger>
                            <AccordionContent className="text-gray-300 pb-4">
                                O QR Code é gerado automaticamente para seu site e pode ser compartilhado com amigos e familiares.
                                Quando escaneado, ele direciona diretamente para sua página personalizada. Esta funcionalidade está
                                disponível apenas nos planos pagos.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-4" className="border-b border-gray-700">
                            <AccordionTrigger className="text-left py-4">Posso cancelar minha assinatura?</AccordionTrigger>
                            <AccordionContent className="text-gray-300 pb-4">
                                Para o plano Anual, você pode cancelar a qualquer momento, mas não haverá reembolso pelo período não
                                utilizado. O plano Vida Toda é um pagamento único, então não há necessidade de cancelamento.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-5" className="border-b border-gray-700">
                            <AccordionTrigger className="text-left py-4">Quantas imagens posso adicionar?</AccordionTrigger>
                            <AccordionContent className="text-gray-300 pb-4">
                                O plano de Teste Gratuito permite até 2 imagens. Os planos Anual e Vida Toda permitem até 5 imagens.
                                Todas as imagens são otimizadas automaticamente para carregamento rápido.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto py-16 px-4">
                <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl p-8 md:p-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Pronto para eternizar seu amor?</h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Comece hoje mesmo com nosso teste gratuito e descubra como podemos ajudar a celebrar seu relacionamento.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-red-500 hover:bg-red-600 text-white px-8"
                            onClick={() => router.push("/register/1")}
                        >
                            Começar Teste Gratuito
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-red-500 text-red-400 hover:bg-red-500/10"
                            onClick={() => router.push("/register/1")}
                        >
                            Ver Demonstração
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
