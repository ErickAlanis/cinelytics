import type { ActorItem } from '../types/content';
import type { TmdbPerson } from '../types/tmdb';

export function mapTmdbPersonToActorItem(person: TmdbPerson): ActorItem {
  return {
    id: person.id,
    name: person.name,
    popularity: person.popularity,
    strongGenreIds: [],
  };
}
