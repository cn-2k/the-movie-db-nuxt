<template>
  <div class="flex h-full w-full flex-col" v-if="currentMovieDetail">
    <div class="relative w-full select-none">
      <NuxtImg
        :src="`https://image.tmdb.org/t/p/w1280${currentMovieDetail.backdrop_path}`"
        alt="Backdrop Image"
        class="w-full object-cover"
      />
      <div class="absolute right-0 top-0 flex items-center p-4" title="Go back">
        <router-link
          :to="lastNavigatedRoute"
          class="rounded-full bg-[#0BB5E0] p-1 shadow-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.425 12q0-.2.063-.375T4.7 11.3l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12q0 .425-.288.713T19 13H7.825Z"
            />
          </svg>
        </router-link>
      </div>
    </div>

    <div class="w-full flex-1 bg-zinc-800 p-5">
      <div class="flex justify-between gap-2">
        <p class="text-2xl font-bold leading-tight tracking-wider text-white">
          {{ currentMovieDetail.original_title }}
        </p>
        <div class="my-auto">
          <svg
            v-if="!favorites.isFavorite(currentMovieDetail.id)"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            @click="toggleFavoriteMovie(currentMovieDetail.id)"
            class="cursor-pointer fill-transparent stroke-red-500 stroke-2"
            :class="{
              'fill-red-500': favorites.isFavorite(currentMovieDetail.id),
            }"
          >
            <path
              d="M12 20.325q-.35 0-.713-.125t-.637-.4l-1.725-1.575q-2.65-2.425-4.788-4.813T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.538t2.5-.562q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125Z"
            />
          </svg>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            class="cursor-pointer text-red-500"
            @click="favorites.removeFavoriteMovie(currentMovieDetail.id)"
            v-if="favorites.isFavorite(currentMovieDetail.id)"
          >
            <path
              fill="currentColor"
              d="M15 14v-2h8v2h-8Zm-4 7l-3.175-2.85q-1.8-1.625-3.088-2.9t-2.125-2.4q-.837-1.125-1.225-2.175T1 8.475q0-2.35 1.575-3.913T6.5 3q1.3 0 2.475.537T11 5.075q.85-1 2.025-1.538T15.5 3q2.125 0 3.563 1.288T20.85 7.3q-.45-.175-.9-.262t-.875-.088q-2.525 0-4.3 1.763T13 13q0 1.3.525 2.463T15 17.45q-.475.425-1.238 1.088T12.45 19.7L11 21Z"
            />
          </svg>
        </div>
      </div>
      <span
        class="mr-2 rounded bg-gray-300 px-2.5 py-0.5 text-xs font-bold text-gray-800"
        >{{ dayjs(currentMovieDetail.release_date).format("YYYY") }}</span
      >
      <span
        v-for="genre in currentMovieDetail.genres"
        :key="genre.id"
        class="mr-2 rounded bg-gray-100 px-2.5 py-0.5 text-xs font-bold text-gray-800 dark:bg-gray-700 dark:text-gray-300"
        >{{ genre.name }}</span
      >
      <p class="mt-4 text-sm leading-tight text-zinc-200">
        {{ currentMovieDetail.overview }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { useFavorites } from "@/store/favorites";
import { useRoute, useRouter } from "vue-router";

const currentMovieDetail = ref();
const route = useRoute();
const router = useRouter();

onMounted(() => {
  getMovieDetail();
});

const getMovieDetail = async () => {
  const { data } = await api.movies.getMovieDetails(route.params.id);

  currentMovieDetail.value = data;
};

const favorites = useFavorites();

const toggleFavoriteMovie = (movie_id: number) => {
  if (favorites.isFavorite(movie_id)) {
    favorites.removeFavoriteMovie(movie_id);
  } else {
    favorites.addFavoriteMovie(movie_id);
  }
};

const lastNavigatedRoute = computed(() => {
  const backUrl = router.options.history.state.back;
  const lastRoute = router.resolve({ path: `${backUrl}` });

  return lastRoute;
});
</script>
