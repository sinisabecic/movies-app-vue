<script lang="ts">
export default {
  name: "Navbar",
};
</script>

<template>
  <nav class="my-2 px-4 flex items-center justify-between sm:justify-start">
    <RouterLink to="/" class="shrink-0">
      <img
        src="../../assets/images/logo.png"
        alt="Logo"
        class="w-12 h-12 md:w-16 md:h-16"
      />
    </RouterLink>
    <ul class="hidden sm:flex sm:ml-6">
      <li>
        <RouterLink
          to="/"
          class="ml-5 text-sm md:text-base lg:text-lg hover:text-gray-900 dark:hover:text-white transition-colors"
          >Home</RouterLink
        >
      </li>
      <li>
        <RouterLink
          to="/filter-movies"
          class="ml-5 text-sm md:text-base lg:text-lg hover:text-gray-900 dark:hover:text-white transition-colors"
          >Filter Movies</RouterLink
        >
      </li>
    </ul>
  </nav>
</template>
