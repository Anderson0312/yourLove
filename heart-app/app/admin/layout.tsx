import type { Metadata } from 'next'
import '../globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Painel Administrador',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" >
      <body>
      <Toaster position="bottom-right" />
        {children}
        </body>
    </html>
  )
}
