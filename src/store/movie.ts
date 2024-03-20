import { defineStore } from "pinia";
import { fetchFromApi } from "../services/api";
import { MovieInterface, GenreInterface } from "../types";

export const useMovieStore = defineStore("movie", {
  state: () => ({
    movies: [] as MovieInterface[],
    genres: [] as GenreInterface[],
    searchTerm: "" as string,
    currentPage: 1,
  }),

  actions: {
    // async fetchMovies(page: number = 1) {
    async fetchMovies() {
      // this.currentPage = page;

      try {
        const data = await fetchFromApi(
          `/movie/popular?page=${this.currentPage}`,
        );
        if (data && data.results) {
          this.movies = [...this.movies, ...data.results]; //? postojeci filmovi iz page=1 prekopiraj i pridododaj im nove iz naredne iteracije
          this.currentPage += 1;
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    },

    async fetchGenres() {
      try {
        const data = await fetchFromApi("/genre/movie/list");
        if (data && data.genres) {
          this.genres = data.genres;
        }
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    },

    async searchMovies(term: string) {
      if (!term.trim()) return [];

      try {
        const { results } = await fetchFromApi(`/search/movie?query=${term}`);
        return results || [];
      } catch (error) {
        console.error("Failed to search movies:", error);
        return [];
      }
    },

    setSearchTerm(term: string) {
      this.searchTerm = term;
    },
  },

  getters: {
    filteredMovies: (state) => {
      if (!state.searchTerm.trim()) return state.movies || [];

      return state.movies?.filter(
        (movie: MovieInterface) =>
          movie.title?.toLowerCase().includes(state.searchTerm.toLowerCase()),
      );
    },
  },
});
