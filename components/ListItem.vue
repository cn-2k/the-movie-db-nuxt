<template>
  <article class="flex items-start space-x-4 p-5">
    <NuxtLink :to="`/movie/${movie.id}`">
      <NuxtImg
        :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`"
        loading="lazy"
        decoding="async"
        alt=""
        width="60"
        height="88"
        class="flex-none select-none rounded-md bg-slate-100 shadow-lg shadow-zinc-400"
      />
    </NuxtLink>
    <div class="relative min-w-0 flex-auto">
      <h2 class="truncate font-semibold text-slate-700 sm:pr-20">
        {{ movie.title }}
      </h2>
      <dl class="mt-2 flex select-none flex-wrap text-sm font-medium leading-6">
        <div
          class="absolute right-0 top-0 hidden items-center space-x-1 sm:flex"
        >
          <dt class="text-sky-500">
            <span class="sr-only">Star rating</span>
            <svg width="16" height="20" fill="currentColor">
              <path
                d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z"
              />
            </svg>
          </dt>
          <dd class="font-bold text-zinc-600">{{ movie.vote_average }}</dd>
        </div>
        <div>
          <dt class="sr-only">Rating</dt>
          <dd class="rounded px-1.5 ring-1 ring-slate-200">
            {{ movie.original_language.toString().toUpperCase() }}
          </dd>
        </div>
        <div class="ml-2">
          <dt class="sr-only">Year</dt>
          <dd>
            {{ dayjs(movie.release_date).format("YYYY") }}
          </dd>
        </div>

        <!-- TODO: add animation heart like twitter lottie file  -->
        <div class="flex flex-col justify-center">
          <dd class="flex items-center">
            <!-- CIRCULO  -->
            <svg
              width="2"
              height="2"
              fill="currentColor"
              class="mx-2 my-auto text-slate-300"
              aria-hidden="true"
            >
              <circle cx="1" cy="1" r="1" />
            </svg>
            <!-- FAVORITO  -->
            <svg
              v-if="useRoute().path === '/'"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              class="cursor-pointer stroke-red-500 stroke-2"
              :class="{
                'fill-red-500': isFavorite,
                'fill-transparent': !isFavorite,
              }"
              @click="toggleFavoriteMovie(movie.id)"
            >
              <path
                d="M12 20.325q-.35 0-.713-.125t-.637-.4l-1.725-1.575q-2.65-2.425-4.788-4.813T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.538t2.5-.562q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125Z"
              />
            </svg>
            <!-- DESFAVORITO  -->
            <svg
              v-if="isFavorite && useRoute().path === '/favorites'"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              class="cursor-pointer text-red-500"
              @click="favorites.removeFavoriteMovie(movie.id)"
            >
              <path
                fill="currentColor"
                d="M15 14v-2h8v2h-8Zm-4 7l-3.175-2.85q-1.8-1.625-3.088-2.9t-2.125-2.4q-.837-1.125-1.225-2.175T1 8.475q0-2.35 1.575-3.913T6.5 3q1.3 0 2.475.537T11 5.075q.85-1 2.025-1.538T15.5 3q2.125 0 3.563 1.288T20.85 7.3q-.45-.175-.9-.262t-.875-.088q-2.525 0-4.3 1.763T13 13q0 1.3.525 2.463T15 17.45q-.475.425-1.238 1.088T12.45 19.7L11 21Z"
              />
            </svg>
          </dd>
        </div>
      </dl>
    </div>
  </article>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { useRoute } from "vue-router";
import { useFavorites } from "@/store/favorites";

defineProps<{
  movie: any;
  isFavorite: boolean;
}>();

const favorites = useFavorites();

const toggleFavoriteMovie = (movie_id: number) => {
  if (favorites.isFavorite(movie_id)) {
    favorites.removeFavoriteMovie(movie_id);
  } else {
    favorites.addFavoriteMovie(movie_id);
  }
};
</script>
