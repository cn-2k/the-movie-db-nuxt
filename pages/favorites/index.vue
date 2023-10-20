<template>
  <main
    class="h-[calc(100%_-_68px)] overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-sky-500 hover:scrollbar-thumb-sky-600"
  >
    <Movies :movies="favoriteMovies" />
    <div v-if="!favoriteMovies.length" class="mx-10 mt-4">
      <div
        class="flex items-center rounded-lg border border-blue-300 bg-blue-50 p-4 text-sm text-blue-800"
        role="alert"
      >
        <svg
          class="mr-3 inline h-4 w-4 flex-shrink-0"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
          />
        </svg>
        <div>No favorite movie has been selected!</div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useFavorites } from "@/store/favorites";

const favoriteMovies = computed(() => {
  return useFavorites().favorites as Array<any>;
});
</script>

<style></style>
