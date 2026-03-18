export type TmdbMovie = {
  id: number;
  title: string;
  genre_ids: number[];
  popularity: number;
  release_date?: string;
  poster_path?: string | null;
  overview?: string;
};

export type TmdbPerson = {
  id: number;
  name: string;
  popularity: number;
  known_for_department?: string;
  profile_path?: string | null;
};

export type TmdbPaginatedResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type TmdbPersonMovieCredit = {
  id: number;
  title: string;
  genre_ids: number[];
  popularity: number;
  release_date?: string;
};

export type TmdbPersonMovieCreditsResponse = {
  cast: TmdbPersonMovieCredit[];
  crew: TmdbPersonMovieCredit[];
};
