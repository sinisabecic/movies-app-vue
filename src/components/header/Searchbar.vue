<script lang="ts">
import { ref, watch } from "vue";
import { ArrowPathIcon, MagnifyingGlassIcon } from "@heroicons/vue/24/solid";
import { MovieInterface } from "../../types";
import { useDebounce } from "../../hooks/useDebounce";
import { getPosterPath } from "../../helpers/Image";
import { useMovieStore } from "../../store/movie";

export default {
  name: "SearchBar",
  methods: { getPosterPath },
  components: {
    MagnifyingGlassIcon,
    ArrowPathIcon,
  },

  setup() {
    const searchResult = ref<MovieInterface[]>([]);
    const isLoading = ref<boolean>(false);
    const noResultFound = ref<boolean>(false);
    const searchTerm = ref<string>("");
    const debouncedSearchTerm = useDebounce(searchTerm, 600);
    const movieStore = useMovieStore();

    watch(debouncedSearchTerm, async (newTerm: string) => {
      if (newTerm && newTerm.trim()) {
        isLoading.value = true;
        searchResult.value = await movieStore.searchMovies(newTerm);
        noResultFound.value = searchResult.value.length === 0;
        isLoading.value = false;
      } else {
        searchResult.value = [];
        noResultFound.value = false;
      }
    });

    return {
      searchTerm,
      searchResult,
      isLoading,
      noResultFound,
    };
  },
};
</script>

<template>
  <div class="flex relative">
    <div class="flex relative flex-grow items-center mx-3">
      <input
        aria-label="true"
        type="text"
        class="rounded-full bg-gray-600 pl-9 pr-10 w-full h-10 focus:outline-none"
        placeholder="Search..."
        v-model="searchTerm"
      />

      <div class="absolute left-0 ml-3 flex items-center">
        <MagnifyingGlassIcon class="w-4 fill-current text-gray-300" />
      </div>

      <div v-if="isLoading" class="absolute right-0 mr-3 flex items-center">
        <ArrowPathIcon class="animate-spin w-5 h-5 text-gray-300" />
      </div>
    </div>

    <div class="absolute mt-12 ml-5 rounded bg-gray-600 w-60 top-0">
      <ul class="mt-3" v-if="searchResult.length !== 0">
        <RouterLink
          class="flex items-center border-b border-gray-500 p-1 hover:bg-yellow-500"
          :key="i"
          v-for="(movie, i) in searchResult"
          :to="`movie/${movie?.id}`"
        >
          <img :src="getPosterPath(movie?.poster_path)" alt="" class="w-10" />
          <span class="ml-3">{{ movie?.title }}</span>
        </RouterLink>
      </ul>

      <ul>
        <li v-if="noResultFound && searchTerm.trim().length > 0">
          No result for "{{ searchTerm }}"
        </li>
      </ul>
    </div>
  </div>
</template>
