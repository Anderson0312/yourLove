import { Clock10Icon, HeartIcon } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative isolate bg-gray-900 py-12 border-t border-gray-800 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <HeartIcon className="h-6 w-6 text-red-500" />
              <span className="text-lg font-bold">OurLovee</span>
            </div>
            <p className="text-gray-400 mb-4">
              Eternize momentos especiais com seu amor através de páginas personalizadas.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/ourloveeqr/" target="_blank" className="text-gray-400 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="https://www.instagram.com/ourloveeqr" target="_blank" className="text-gray-400 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="https://www.tiktok.com/@ourloveeqr" target="_blank" className="text-gray-400 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2c2.209 0 4 1.791 4 4v.535c.72.27 1.38.646 1.953 1.119C19.36 8.523 20 9.957 20 11.5v.25c0 4.694-3.806 8.5-8.5 8.5S3 16.444 3 11.75v-.5C3 6.578 7.078 2.5 12 2zm0 2C8.686 4 6 6.686 6 10v.75C6 15.166 9.834 19 14.25 19S22.5 15.166 22.5 10.75v-.25c0-2.21-1.79-4-4-4h-.535c-.27-.72-.646-1.38-1.119-1.953C16.477 3.64 15.043 3 13.5 3H12v1z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#recursos" className="text-gray-400 hover:text-white">
                  Contador de Tempo
                </a>
              </li>
              <li>
                <a href="#recursos" className="text-gray-400 hover:text-white">
                  Galeria de Imagens
                </a>
              </li>
              <li>
                <a href="#recursos" className="text-gray-400 hover:text-white">
                  Músicas Personalizadas
                </a>
              </li>
              <li>
                <a href="#recursos" className="text-gray-400 hover:text-white">
                  QR Code
                </a>
              </li>
              <li>
                <a href="#recursos" className="text-gray-400 hover:text-white">
                  Layouts
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://wa.me/5521989419431" target="_blank" className="text-gray-400 hover:text-white">
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a href="mailto:ourloveeqr@gmail.com" target="_blank" className="text-gray-400 hover:text-white">
                  Contato
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@ourloveeqr/video/7496306775382134071?q=ourloveeqr&t=1745626713084" target="_blank" className="text-gray-400 hover:text-white">
                  Tutoriais
                </a>
              </li>
              {/* <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Comunidade
                  </a>
                </li> */}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link className="text-gray-400 hover:text-white" href="/termos">Termos de uso</Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white" href="/privacidade">Política de Privacidade</Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Política de Cookies
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Licenças
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© 2025 OurLovee. Todos os direitos reservados.</p>
          <div className="mt-4 md:mt-0 flex items-center">
            <Clock10Icon className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-gray-400 text-sm">Atendimento 24h (planos pagos)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;