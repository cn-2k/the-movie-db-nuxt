<template>
  <List>
    <RecycleScroller
      :items="filteredPopularMovies"
      :item-size="131"
      :page-mode="true"
      key-field="id"
      v-slot="{ item }"
    >
      <ListItem :movie="item" :is-favorite="favorites.isFavorite(item.id)" />
    </RecycleScroller>
    <div
      v-if="!filteredPopularMovies.length && favorites.searchMovieQuery"
      class="mx-10 mt-4"
    >
      <div
        class="mb-4 flex items-center rounded-lg border border-blue-300 bg-blue-50 p-4 text-sm text-blue-800"
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
        <div>No movies were found!</div>
      </div>
    </div>
  </List>
</template>

<script setup lang="ts">
import { computed } from "vue";
import List from "./List.vue";
import ListItem from "./ListItem.vue";
import { useFavorites } from "@/store/favorites";
import type { MovieInterface } from "@/types/index";

const props = defineProps<{
  movies: MovieInterface[];
}>();

const favorites = useFavorites();

const filteredPopularMovies = computed(() => {
  const filter = favorites.searchMovieQuery.toLowerCase();
  return props.movies.filter((movie: MovieInterface) =>
    movie.title.toLowerCase().includes(filter),
  );
});
</script>
