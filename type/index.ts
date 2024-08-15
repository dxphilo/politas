export interface Politician {
  politician_id: number
  name: string
  office?: string
  county: string
  political_party?: string
  source_website?: string
  photo_url?: string
  age: string
  year_of_birth: number
  created_at?: string
  updated_at?: string
}

export interface CorruptionCase {
  politician_id: number
  name: string
  case_date: string
  case_description: string
  legal_outcome?: string
  link?: string
  title: string
}
