"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Calendar,
  CreditCard,
  Heart,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Menu,
  Music,
  Settings,
  Users,
} from "lucide-react"

import { Button } from "@/components/buttonv2"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function AdminDashboardSidebar() {
  const [open, setOpen] = useState(false)

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "#" },
    { icon: Users, label: "Casais", href: "#" },
    { icon: Calendar, label: "Datas", href: "#" },
    { icon: ImageIcon, label: "Fotos", href: "#" },
    { icon: Music, label: "Músicas", href: "#" },
    { icon: CreditCard, label: "Pagamentos", href: "#" },
    { icon: Settings, label: "Configurações", href: "#" },
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full ">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="#" className="flex items-center gap-2 font-semibold">
          <Heart className="h-6 w-6 text-rose-500" />
          <span className="text-xl">OurLovee</span>
        </Link>
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                index === 0 ? "bg-muted text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setOpen(false)}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t">
        <Button variant="outline" className="w-full justify-start" size="sm">
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden absolute top-3 left-3 z-50">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 border-r bg-background">
        <SidebarContent />
      </div>
    </>
  )
}
