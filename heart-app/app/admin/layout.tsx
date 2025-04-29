import type { Metadata } from 'next'
import '../globals.css'
import { Toaster } from 'react-hot-toast'
import { AdminDashboardSidebar } from '@/components/admin/admin-dashboard-sidebar'
import { AdminDashboardHeader } from '@/components/admin/admin-dashboard-header'

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
        <div className="flex min-h-screen flex-col md:flex-row bg-background">
          <AdminDashboardSidebar />
          <div className="flex-1">
            <AdminDashboardHeader />
            <main className="flex-1 p-4 md:p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
