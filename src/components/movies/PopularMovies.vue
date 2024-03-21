<script lang="ts">
import MovieItem from "../items/MovieItem.vue";
import { computed, onMounted } from "vue";
import { useMovieStore } from "../../store/movie";

export default {
  components: {
    MovieItem,
  },

  setup() {
    const movieStore = useMovieStore();

    // *  Punjenje state
    onMounted(() => {
      movieStore.fetchMovies();
      movieStore.fetchGenres();
    });

    // *  Direktni pristup filmovima i zanrovima kroz store
    const movies = computed(() => movieStore.movies);
    const genres = computed(() => movieStore.genres);

    // * Paginacija
    // const nextPage = () => {
    //   if (movieStore.currentPage >= 1) {
    //     movieStore.fetchMovies(movieStore.currentPage + 1);
    //   }
    // };
    //
    // const prevPage = () => {
    //   if (movieStore.currentPage > 1) {
    //     movieStore.fetchMovies(movieStore.currentPage - 1);
    //   }
    // };

    // * Load more funkcija
    const loadMoreMovies = () => {
      if (movieStore.currentPage >= 1) {
        movieStore.fetchMovies();
      }
    };

    return {
      movies,
      genres,
      // nextPage,
      // prevPage,
      loadMoreMovies,
    };
  },
};
</script>

<template>
  <div class="container mx-auto px-4 py-5">
    <h2 class="uppercase text-yellow-500 text-lg font-semibold text-center">
      Popular Movies
    </h2>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-5"
    >
      <MovieItem
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        :genres="genres"
      />
    </div>
    <div class="flex justify-center">
      <button
        class="px-4 py-2 bg-gray-600 text-white rounded"
        @click="loadMoreMovies"
      >
        Show More
      </button>
    </div>
  </div>
</template>

<!--    <div class="flex justify-center mt-4">-->
<!--      <button-->
<!--        class="mr-2 px-4 py-2 bg-gray-600 text-white rounded"-->
<!--        @click="prevPage"-->
<!--        :disabled="currentPage === 1"-->
<!--      >-->
<!--        Previous-->
<!--      </button>-->
<!--      <button-->
<!--        class="px-4 py-2 bg-gray-600 text-white rounded"-->
<!--        @click="nextPage"-->
<!--        :disabled="currentPage === 50"-->
<!--      >-->
<!--        Next-->
<!--      </button>-->
<!--    </div>-->
