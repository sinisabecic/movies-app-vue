<script lang="ts">
import MovieItem from "../items/MovieItem.vue";
import { computed, onMounted, ref, watchEffect } from "vue";
import { useMovieStore } from "../../store/movie";
import { useDebounce } from "../../hooks/useDebounce.ts";
import { ArrowPathIcon } from "@heroicons/vue/24/solid";

export default {
  name: "FilterMovies",
  components: {
    MovieItem,
    ArrowPathIcon,
  },

  setup() {
    const movieStore = useMovieStore();
    const searchTerm = ref("");
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    watchEffect(() => {
      movieStore.setSearchTerm(debouncedSearchTerm.value); //! debouncedSearchTerm.value je dependency
    });

    const movies = computed(() => movieStore.movies);
    const genres = computed(() => movieStore.genres);
    const filteredMovies = computed(() => movieStore.filteredMovies);

    onMounted(() => {
      movieStore.fetchMovies();
      movieStore.fetchGenres();
    });

    return { movies, genres, filteredMovies, searchTerm };
  },
};
</script>

<template>
  <div class="container mx-auto px-4 py-5">
    <div class="flex justify-center">
      <input
        aria-label="true"
        type="text"
        class="rounded-full bg-gray-600 pl-9 pr-10 h-10 focus:outline-none w-full max-w-md my-4"
        placeholder="Search..."
        v-model="searchTerm"
      />
    </div>
    <h2
      class="text-center uppercase mt-5 text-yellow-500 text-lg font-semibold"
      v-if="filteredMovies.length !== 0"
    >
      Search Results
    </h2>
    <h2
      class="text-center uppercase mt-5 text-yellow-500 text-lg font-semibold"
      v-else
    >
      No results found
    </h2>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-5"
    >
      <transition-group
        name="movie-item"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-5"
      >
        <MovieItem
          v-for="movie in filteredMovies"
          :key="movie.id"
          :movie="movie"
          :genres="genres"
        />
      </transition-group>
    </div>
  </div>
</template>

<style scoped>
.movie-item-enter-active,
.movie-item-leave-active {
  transition:
    opacity 0.7s,
    transform 0.7s;
}
.movie-item-enter,
.movie-item-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
