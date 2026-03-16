import type { GenreId } from './brand'

export type MovieItem = {
  id: number
  title: string
  genreIds: GenreId[]
  popularity: number
  releaseDate?: string
}

export type ActorItem = {
  id: number
  name: string
  popularity: number
  strongGenreIds: GenreId[]
}

export type AnniversaryItem = {
  id: number
  title: string
  years: number
  campaignIdea: string
  genreIds: GenreId[]
}
