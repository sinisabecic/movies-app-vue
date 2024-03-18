<script lang="ts">
import MovieItem from "../items/MovieItem.vue";
import { computed, onMounted, ref } from "vue";
import { GenreInterface, MovieInterface } from "../items/types";
import { fetchFromApi } from "../../services/api";

export default {
  components: {
    MovieItem,
  },

  setup() {
    const movies = ref<MovieInterface[]>([]);
    const genres = ref<GenreInterface[]>([]);

    onMounted(async () => {
      try {
        const data = await fetchFromApi("/movie/popular");
        if (data && data.results) {
          movies.value = data.results;
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    });

    onMounted(async () => {
      try {
        const data = await fetchFromApi("/genre/movie/list");
        if (data && data.genres) {
          genres.value = data.genres;
        }
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    });

    return { movies, genres };
  },
};
</script>

<template>
  <div class="mx-5">
    <h2 class="uppercase mt-5 text-yellow-500 text-lg font-semibold">
      Popular Movies
    </h2>

    <div
      class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-8"
    >
      <MovieItem
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        :genres="genres"
      />
    </div>
  </div>
</template>
