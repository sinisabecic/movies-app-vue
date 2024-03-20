export interface MovieInterface {
  id?: number;
  title?: string;
  backdrop_path?: string;
  poster_path?: string | any;
  release_date?: string;
  original_title?: string;
  homepage?: string;
  overview?: string;
  popularity?: number;
  vote_average?: number;
  video?: boolean;
  genre_ids?: number[];
  genres?: GenreInterface[];
}
export interface GenreInterface {
  id: number;
  name: string;
}
