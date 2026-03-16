export type BrandId = 'redbull' | 'tesla' | 'starbucks' | 'nike' | 'lego'

export type GenreId = number

export type BrandProfile = {
  id: BrandId
  name: string
  primaryGenre: GenreId
  secondaryGenres: [GenreId, GenreId]
}
