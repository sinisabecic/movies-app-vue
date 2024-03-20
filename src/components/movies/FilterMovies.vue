<script lang="ts">
import MovieItem from "../items/MovieItem.vue";
import { computed, onMounted, ref } from "vue";
import { useMovieStore } from "../../store/movie";

export default {
  name: "FilterMovies",
  components: {
    MovieItem,
  },

  setup() {
    const movieStore = useMovieStore();

    onMounted(() => {
      movieStore.fetchMovies();
      movieStore.fetchGenres();
    });

    const searchTerm = ref("");

    const updateSearchTerm = () => movieStore.setSearchTerm(searchTerm.value);

    const movies = computed(() => movieStore.movies);
    const genres = computed(() => movieStore.genres);
    const filteredMovies = computed(() => movieStore.filteredMovies);

    return { movies, genres, filteredMovies, searchTerm, updateSearchTerm };
  },
};
</script>

<template>
  <div class="mx-5">
    <div class="flex justify-center">
      <input
        aria-label="true"
        type="text"
        class="rounded-full bg-gray-600 pl-9 pr-10 h-10 focus:outline-none w-1/2 my-4"
        placeholder="Search..."
        @input="updateSearchTerm"
        v-model="searchTerm"
      />
    </div>

    <h2
      class="text-center uppercase mt-5 text-yellow-500 text-lg font-semibold"
    >
      Search Results
    </h2>

    <div
      class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-8"
    >
      <MovieItem
        v-for="movie in filteredMovies"
        :key="movie.id"
        :movie="movie"
        :genres="genres"
      />
    </div>
  </div>
</template>
