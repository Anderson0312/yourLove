export interface Register {
    id: string
    username: string
    created_at: Date
    title?: string | null
    names?: string | null
    date?: Date | null
    text?: string | null
    layout?: string | null
    music?: string | null
    musicThumbnail?: string | null
    musicVideoId?: string | null
    photoPaths: string[]
    step: number
    payment?: string | null
    trialStartDate?: Date | null
    modelo_carrosel?: string | null
    modelo_date?: string | null
  }
  
  // Função para gerar uma data aleatória nos próximos 12 meses
  function randomFutureDate() {
    const now = new Date()
    const futureDate = new Date(now)
    futureDate.setMonth(now.getMonth() + Math.floor(Math.random() * 12))
    futureDate.setDate(Math.floor(Math.random() * 28) + 1) // Evitar problemas com meses de diferentes durações
    return futureDate
  }
  
  // Função para gerar uma data no passado recente (últimos 3 meses)
  function randomRecentDate() {
    const now = new Date()
    const pastDate = new Date(now)
    pastDate.setMonth(now.getMonth() - Math.floor(Math.random() * 3))
    pastDate.setDate(Math.floor(Math.random() * 28) + 1)
    return pastDate
  }
  
  // Gerar dados de exemplo
  export const mockRegistrations: Register[] = [
    {
      id: "1",
      username: "joaoemariana",
      created_at: randomRecentDate(),
      title: "Casamento de João e Mariana",
      names: "João & Mariana",
      date: randomFutureDate(),
      text: "Estamos muito felizes em compartilhar este momento com vocês!",
      layout: "layout1",
      music: "Perfect - Ed Sheeran",
      musicThumbnail: "https://example.com/thumbnail1.jpg",
      musicVideoId: "2Vv-BfVoq4g",
      photoPaths: ["/photos/joaoemariana/1.jpg", "/photos/joaoemariana/2.jpg"],
      step: 5,
      payment: "paid",
      trialStartDate: null,
      modelo_carrosel: "modelo1",
      modelo_date: "modelo1",
    },
    {
      id: "2",
      username: "pedroejulia",
      created_at: randomRecentDate(),
      title: "Casamento de Pedro e Julia",
      names: "Pedro & Julia",
      date: randomFutureDate(),
      text: "Venha celebrar o nosso amor!",
      layout: "layout2",
      music: "Can't Help Falling in Love - Elvis Presley",
      musicThumbnail: "https://example.com/thumbnail2.jpg",
      musicVideoId: "vGJTaP6anOU",
      photoPaths: ["/photos/pedroejulia/1.jpg"],
      step: 4,
      payment: "pending",
      trialStartDate: randomRecentDate(),
      modelo_carrosel: "modelo2",
      modelo_date: "modelo2",
    },
    {
      id: "3",
      username: "lucasebeatriz",
      created_at: randomRecentDate(),
      title: "Casamento de Lucas e Beatriz",
      names: "Lucas & Beatriz",
      date: randomFutureDate(),
      text: "Junte-se a nós neste dia especial!",
      layout: "layout3",
      music: "All of Me - John Legend",
      musicThumbnail: "https://example.com/thumbnail3.jpg",
      musicVideoId: "450p7goxZqg",
      photoPaths: ["/photos/lucasebeatriz/1.jpg", "/photos/lucasebeatriz/2.jpg", "/photos/lucasebeatriz/3.jpg"],
      step: 3,
      payment: "paid",
      trialStartDate: null,
      modelo_carrosel: "modelo1",
      modelo_date: "modelo3",
    },
    {
      id: "4",
      username: "felipeegabriela",
      created_at: randomRecentDate(),
      names: "Felipe & Gabriela",
      photoPaths: [],
      step: 1,
      trialStartDate: randomRecentDate(),
      payment: "pending",
    },
    {
      id: "5",
      username: "rafaeleana",
      created_at: randomRecentDate(),
      title: "Casamento de Rafael e Ana",
      names: "Rafael & Ana",
      date: randomFutureDate(),
      layout: "layout1",
      photoPaths: ["/photos/rafaeleana/1.jpg"],
      step: 2,
      payment: "pending",
      trialStartDate: randomRecentDate(),
    },
    {
      id: "6",
      username: "gustavoecarolina",
      created_at: randomRecentDate(),
      title: "Casamento de Gustavo e Carolina",
      names: "Gustavo & Carolina",
      date: randomFutureDate(),
      text: "Nosso grande dia chegou!",
      layout: "layout2",
      music: "Thinking Out Loud - Ed Sheeran",
      musicThumbnail: "https://example.com/thumbnail6.jpg",
      musicVideoId: "lp-EO5I60KA",
      photoPaths: ["/photos/gustavoecarolina/1.jpg", "/photos/gustavoecarolina/2.jpg"],
      step: 5,
      payment: "paid",
      modelo_carrosel: "modelo2",
      modelo_date: "modelo1",
    },
    {
      id: "7",
      username: "henriqueeleticia",
      created_at: randomRecentDate(),
      names: "Henrique & Letícia",
      photoPaths: [],
      step: 1,
      payment: "pending",
    },
    {
      id: "8",
      username: "victoriaematheus",
      created_at: randomRecentDate(),
      title: "Casamento de Victoria e Matheus",
      names: "Victoria & Matheus",
      date: randomFutureDate(),
      layout: "layout3",
      photoPaths: ["/photos/victoriaematheus/1.jpg"],
      step: 3,
      payment: "paid",
      trialStartDate: null,
    },
  ]
  