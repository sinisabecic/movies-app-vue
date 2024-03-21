<script lang="ts">
import Navbar from "../components/header/Navbar.vue";
import Searchbar from "../components/header/Searchbar.vue";
import PopularMovies from "../components/movies/PopularMovies.vue";

export default {
  name: "Home",
  components: {
    PopularMovies,
    Navbar,
    Searchbar,
  },
};
</script>

<template>
  <div class="container mx-auto px-4 py-5">
    <PopularMovies />
  </div>
</template>
