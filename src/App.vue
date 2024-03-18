<script lang="ts">
import Searchbar from "./components/header/Searchbar.vue";
import Navbar from "./components/header/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Searchbar,
  },
};
</script>

<template>
  <div id="id">
    <div class="flex">
      <div
        class="w-full flex justify-between items-center border-b border-gray-500"
      >
        <Navbar />
        <transition name="flip">
          <Searchbar />
        </transition>
      </div>

      <router-view v-slot="{ Component }">
        <transition name="flip">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 768px) {
  .flex {
    flex-direction: column;
  }
}

/* Transition Effects */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

/* Responsive adjustments for smaller screens */
@media (max-width: 768px) {
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateY(10px);
  }
}

.flip-enter-active,
.flip-leave-active {
  transition: transform 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955);
  backface-visibility: hidden;
  perspective: 1000px;
}

.flip-enter-from,
.flip-leave-to {
  opacity: 0.5;
  transform: rotateY(90deg);
}

@media (max-width: 768px) {
  .flip-enter-from,
  .flip-leave-to {
    transform: rotateX(90deg);
  }
}
</style>
