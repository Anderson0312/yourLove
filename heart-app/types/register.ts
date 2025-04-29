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
  email?: string | null
  payment?: string | null
  trialStartDate?: Date | null
  modelo_carrosel?: string | null
  modelo_date?: string | null
}