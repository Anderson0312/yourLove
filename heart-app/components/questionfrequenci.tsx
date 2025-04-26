"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/accordion"

const FAQSection = () => {

  return (
    <section className="mx-auto py-16 px-4">
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
  );
};

export default FAQSection;