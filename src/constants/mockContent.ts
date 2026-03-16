import type { ActorItem, AnniversaryItem, MovieItem } from '../types/content'

export const mockTrendingMovies: MovieItem[] = [
  {
    id: 1,
    title: 'Love in Orbit',
    genreIds: [18, 878],
    popularity: 89,
  },
  {
    id: 2,
    title: 'Midnight Letters',
    genreIds: [18],
    popularity: 84,
  },
  {
    id: 3,
    title: 'Summer Bloom',
    genreIds: [35, 10751],
    popularity: 78,
  },
  {
    id: 4,
    title: 'Neon Escape',
    genreIds: [878, 28],
    popularity: 61,
  },
  {
    id: 5,
    title: 'Frontier Run',
    genreIds: [12, 28],
    popularity: 66,
  },
]

export const mockUpcomingMovies: MovieItem[] = [
  {
    id: 101,
    title: 'Love in Orbit',
    genreIds: [18, 878],
    popularity: 89,
    releaseDate: '2026-06-12',
  },
  {
    id: 102,
    title: 'Midnight Letters',
    genreIds: [18],
    popularity: 84,
    releaseDate: '2026-06-28',
  },
  {
    id: 103,
    title: 'Summer Bloom',
    genreIds: [35],
    popularity: 78,
    releaseDate: '2026-07-04',
  },
]

export const mockActors: ActorItem[] = [
  {
    id: 201,
    name: 'Ryan Gosling',
    popularity: 91,
    strongGenreIds: [18, 35, 878],
  },
  {
    id: 202,
    name: 'Zendaya',
    popularity: 88,
    strongGenreIds: [18, 878],
  },
  {
    id: 203,
    name: 'Chris Hemsworth',
    popularity: 86,
    strongGenreIds: [28, 12],
  },
  {
    id: 204,
    name: 'Emma Stone',
    popularity: 79,
    strongGenreIds: [35, 18],
  },
]

export const mockAnniversaries: AnniversaryItem[] = [
  {
    id: 301,
    title: 'Back to the Future',
    years: 20,
    campaignIdea: 'Storytelling retro-futurista.',
    genreIds: [12, 878],
  },
  {
    id: 302,
    title: 'Harry Potter',
    years: 10,
    campaignIdea: 'Colecciones mágicas temáticas.',
    genreIds: [14, 10751],
  },
]
