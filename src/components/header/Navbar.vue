<script setup lang="ts"></script>

<template>
  <nav class="px-4 py-2 flex items-center justify-between">
    <RouterLink to="/" class="shrink-0">
      <img
        src="../../assets/images/logo.png"
        alt="Logo"
        class="w-12 h-12 md:w-16 md:h-16"
      />
    </RouterLink>
    <ul class="hidden md:flex md:ml-6 space-x-4">
      <li>
        <RouterLink
          to="/"
          class="text-sm md:text-base lg:text-lg hover:text-gray-900 dark:hover:text-white transition-colors"
          >Home</RouterLink
        >
      </li>
      <li>
        <RouterLink
          to="/search-movies"
          class="text-sm md:text-base lg:text-lg hover:text-gray-900 dark:hover:text-white transition-colors"
          >Search Movies</RouterLink
        >
      </li>
    </ul>
  </nav>
</template>
