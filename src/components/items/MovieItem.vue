<script lang="ts">
import { computed, PropType } from "vue";
import { GenreInterface, MovieInterface } from "../../types";
import { useRating } from "../../helpers/Number.ts";

export default {
  name: "MovieItem",
  methods: { useRating },
  props: {
    movie: Object as PropType<MovieInterface>,
    genres: Array as PropType<GenreInterface[]>,
  },

  setup(props) {
    const posterPath = computed(
      () =>
        `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${props.movie?.poster_path}`,
    );

    const genreName = (movieGenreId: number) => {
      const genre = props.genres?.find((g) => g.id === movieGenreId);
      return genre ? genre.name + ", " : "";
    };

    return {
      posterPath,
      genreName,
    };
  },
};
</script>

<template>
  <div>
    <RouterLink :to="`/movie/${movie?.id}`">
      <img
        :src="posterPath && posterPath"
        class="hover:opacity-75 transition ease-in-out duration-150"
      />
    </RouterLink>
    <h3>{{ movie?.title }}</h3>
    <div class="flex">
      <span class="ml-2"
        >{{ movie?.vote_average && useRating(movie?.vote_average) }} |
        {{ movie?.release_date }}</span
      >
      <br />
    </div>
    <span class="text-sm text-gray-500">
      <span v-for="genreId in movie?.genre_ids" :key="genreId">{{
        genreName(genreId)
      }}</span>
    </span>
  </div>
</template>
