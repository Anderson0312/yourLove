import { AdminDashboardSidebar } from "@/components/admin/admin-dashboard-sidebar";
import { Metadata } from "next"
import toast, { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "Painel Administrativo",
  description: "Painel de controle para administração do site",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-background">
      <AdminDashboardSidebar />
        {children}
        <Toaster />
    </div>
  )
}











