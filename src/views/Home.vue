<script lang="ts">
import PopularMovies from "../components/movies/PopularMovies.vue";

export default {
  name: "Home",
  components: {
    PopularMovies,
  },
};
</script>

<template>
  <div class="container mx-auto px-4 py-5">
    <PopularMovies />
  </div>
</template>
