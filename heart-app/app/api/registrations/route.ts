
import { NextResponse } from "next/server"
import { Register } from "@/types/register"

// Dados de exemplo para simulação
const mockRegistrations: Register[] = [
  {
    id: "1",
    username: "joao_silva",
    created_at: new Date("2023-12-15T10:30:00"),
    title: "Nosso Amor",
    names: "João e Maria",
    date: new Date("2020-06-12T00:00:00"),
    text: "Nosso amor começou em um dia de verão...",
    layout: "layout1",
    music: "Perfect - Ed Sheeran",
    musicThumbnail: "https://i.ytimg.com/vi/2Vv-BfVoq4g/hqdefault.jpg",
    musicVideoId: "2Vv-BfVoq4g",
    photoPaths: ["/photos/1.jpg", "/photos/2.jpg", "/photos/3.jpg"],
    step: 5,
    payment: "lifetime",
    trialStartDate: null,
    modelo_carrosel: "modelo1",
    modelo_date: "modelo2"
  },
  {
    id: "2",
    username: "ana_costa",
    created_at: new Date("2024-01-05T14:20:00"),
    title: "Meu Amor",
    names: "Ana e Pedro",
    date: new Date("2022-02-14T00:00:00"),
    text: "Nosso primeiro encontro foi inesquecível...",
    layout: "layout2",
    music: "All of Me - John Legend",
    musicThumbnail: "https://i.ytimg.com/vi/450p7goxZqg/hqdefault.jpg",
    musicVideoId: "450p7goxZqg",
    photoPaths: ["/photos/4.jpg", "/photos/5.jpg"],
    step: 4,
    payment: "annual",
    trialStartDate: null,
    modelo_carrosel: "modelo2",
    modelo_date: "modelo1"
  },
  {
    id: "3",
    username: "carlos_santos",
    created_at: new Date("2024-02-20T09:15:00"),
    title: "Para Sempre",
    names: "Carlos e Juliana",
    date: new Date("2023-09-30T00:00:00"),
    text: "Desde o primeiro olhar eu soube que era você...",
    layout: "layout3",
    music: null,
    musicThumbnail: null,
    musicVideoId: null,
    photoPaths: ["/photos/6.jpg"],
    step: 3,
    payment: "free-trial",
    trialStartDate: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 horas atrás
    modelo_carrosel: null,
    modelo_date: null
  },
  {
    id: "4",
    username: "lucia_oliveira",
    created_at: new Date("2024-03-01T16:45:00"),
    title: null,
    names: "Lúcia e Roberto",
    date: null,
    text: null,
    layout: null,
    music: null,
    musicThumbnail: null,
    musicVideoId: null,
    photoPaths: [],
    step: 1,
    payment: null,
    trialStartDate: null,
    modelo_carrosel: null,
    modelo_date: null
  },
  {
    id: "5",
    username: "marcos_pereira",
    created_at: new Date("2024-03-10T11:30:00"),
    title: "Amor Eterno",
    names: "Marcos e Fernanda",
    date: new Date("2021-11-15T00:00:00"),
    text: "Cada dia ao seu lado é uma nova aventura...",
    layout: "layout1",
    music: "Thinking Out Loud - Ed Sheeran",
    musicThumbnail: "https://i.ytimg.com/vi/lp-EO5I60KA/hqdefault.jpg",
    musicVideoId: "lp-EO5I60KA",
    photoPaths: ["/photos/7.jpg", "/photos/8.jpg", "/photos/9.jpg", "/photos/10.jpg"],
    step: 5,
    payment: "free-trial",
    trialStartDate: new Date(Date.now() - 25 * 60 * 60 * 1000), // 25 horas atrás (expirado)
    modelo_carrosel: "modelo3",
    modelo_date: "modelo2"
  }
]

export async function GET() {
  // Simula um pequeno atraso para parecer uma chamada de API real
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return NextResponse.json(mockRegistrations)
}