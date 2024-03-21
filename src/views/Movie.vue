<script lang="ts">
import { ref, watch } from "vue";
import { fetchFromApi } from "../services/api";
import { getPosterPath } from "../helpers/Image";
import { useRoute } from "vue-router";
import { MovieInterface } from "../types";
import { PlayIcon } from "@heroicons/vue/24/solid";

export default {
  name: "Movie",
  methods: { getPosterPath },
  components: { PlayIcon },

  setup() {
    const route = useRoute();
    const movie = ref<MovieInterface | null>(null);

    const fetchMovie = async (movieID: string) => {
      try {
        const data = await fetchFromApi(`/movie/${movieID}`);
        movie.value = data;
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    watch(
      () => route.params.id,
      (newId) => {
        if (newId) fetchMovie(newId.toString());
      },
      { immediate: true },
    );

    return { movie };
  },
};
</script>

<template>
  <div class="py-10">
    <div
      class="container mx-auto flex flex-col md:flex-row items-center md:items-start border-b border-gray-600 pb-2"
    >
      <img
        :src="getPosterPath(movie?.poster_path)"
        alt="Movie Poster"
        class="w-64 h-96 object-cover"
      />
      <div class="md:ml-24 mt-6 md:mt-0">
        <h1 class="text-3xl md:text-4xl font-semibold">
          {{ movie?.original_title }}
        </h1>
        <div class="text-gray-500 text-sm mt-2 flex flex-wrap">
          <span class="mr-2"
            >{{ Math.round(movie?.popularity as number) }}% |
            {{ movie?.release_date }}</span
          >
          <span v-for="genre in movie?.genres" :key="genre.id" class="mr-2"
            >{{ genre.name }},</span
          >
        </div>
        <p class="mt-4">{{ movie?.overview }}</p>
        <div class="mt-5">
          <a
            :href="movie?.homepage"
            target="_blank"
            class="rounded bg-yellow-500 px-5 py-3 inline-flex items-center hover:bg-amber-500 transition-colors"
          >
            <PlayIcon class="w-6 h-6 fill-current mr-2" />
            <span>Watch Movie</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
