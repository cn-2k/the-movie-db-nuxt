<template>
  <div
    ref="el"
    class="h-[calc(100%_-_68px)] overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-sky-500 hover:scrollbar-thumb-sky-600"
  >
    <Movies :movies="movies.popularMovies" />
  </div>
</template>

<script setup lang="ts">
import { useFavorites } from "@/store/favorites";
import { useInfiniteScroll } from "@vueuse/core";

const movies = useFavorites();
const el = ref<HTMLElement | null>(null);
const page = ref(1);

onMounted(() => {
  getMoviesList();
});

const getMoviesList = async () => {
  try {
    const { data } = await movies.getMovies();
    movies.popularMovies = data;
  } catch (error) {
    console.log(error);
  }
};

const getMoviesOnScroll = async () => {
  try {
    page.value++;
    const { data } = await movies.getMovies(page.value);

    movies.popularMovies.push(...data);
  } catch (error) {
    console.log(error);
  }
};

useInfiniteScroll(
  el,
  () => {
    if (movies.searchMovieQuery) {
      return;
    }
    getMoviesOnScroll();
  },
  {
    throttle: 200,
  },
);
</script>

<style></style>
