<template>
  <div class="flex h-screen w-full items-center justify-center py-14">
    <!-- MOVIE CONTAINER  -->
    <div
      class="h-full max-h-[50rem] w-[40rem] rounded-l-xl rounded-tr-xl bg-white"
    >
      <Nav
        class="rounded-t-xl"
        v-if="$route.name !== 'movie-id'"
        @refresh="favorites.getMovies()"
      >
        <template #menu>
          <NavItem to="/">Popular Movies</NavItem>
          <NavItem to="/favorites">
            <template #favorites>
              Favorites
              <span
                v-if="favorites.favorites"
                class="absolute top-3 ml-1 rounded-full border border-white bg-red-500 px-1 align-middle text-xs font-bold text-white"
              >
                {{ favorites.totalFavorites }}
              </span>
            </template>
          </NavItem>
        </template>
        <div class="flex-1">
          <div class="ml-2 flex w-full flex-row gap-3">
            <input
              type="text"
              :disabled="
                $route.path === '/favorites' && !favorites.favorites.length
              "
              v-model="favorites.searchMovieQuery"
              id="first_name"
              class="ml-4 block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-xs text-gray-900 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200"
              placeholder="Search movie..."
            />
            <div
              v-if="$route.path === '/'"
              @click="syncMovies()"
              title="Sync popular movies"
              class="my-auto flex cursor-pointer justify-end rounded-md bg-[#f2f2f2] px-3 py-2 font-bold tracking-wide text-slate-700 shadow-sm hover:bg-[#ebedef]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                :class="{
                  'direction-reverse animate-spin': syncMoviesFlag,
                }"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  fill="gray"
                  d="M6 12.05q0 1.125.425 2.188T7.75 16.2l.25.25V15q0-.425.288-.713T9 14q.425 0 .713.288T10 15v4q0 .425-.288.713T9 20H5q-.425 0-.713-.288T4 19q0-.425.288-.713T5 18h1.75l-.4-.35q-1.3-1.15-1.825-2.625T4 12.05Q4 9.7 5.2 7.787T8.425 4.85q.35-.2.738-.025t.512.575q.125.375-.013.75t-.487.575q-1.45.8-2.313 2.213T6 12.05Zm12-.1q0-1.125-.425-2.187T16.25 7.8L16 7.55V9q0 .425-.288.713T15 10q-.425 0-.713-.288T14 9V5q0-.425.288-.713T15 4h4q.425 0 .713.288T20 5q0 .425-.288.713T19 6h-1.75l.4.35q1.225 1.225 1.788 2.663T20 11.95q0 2.35-1.2 4.263t-3.225 2.937q-.35.2-.737.025t-.513-.575q-.125-.375.013-.75t.487-.575q1.45-.8 2.313-2.212T18 11.95Z"
                />
              </svg>
            </div>
            <a
              href="https://github.com/cn-2k/the-movie-db-vuejs"
              target="_blank"
              title="Go to Github"
              class="my-auto flex cursor-pointer justify-end rounded-md bg-[#f2f2f2] px-3 py-2 font-bold tracking-wide text-slate-700 shadow-sm hover:bg-[#ebedef]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 256 256"
              >
                <path
                  fill="gray"
                  d="M212.62 75.17A63.7 63.7 0 0 0 206.39 26A12 12 0 0 0 196 20a63.71 63.71 0 0 0-50 24h-20a63.71 63.71 0 0 0-50-24a12 12 0 0 0-10.39 6a63.7 63.7 0 0 0-6.23 49.17A61.5 61.5 0 0 0 52 104v8a60.1 60.1 0 0 0 45.76 58.28A43.66 43.66 0 0 0 92 192v4H76a20 20 0 0 1-20-20a44.05 44.05 0 0 0-44-44a12 12 0 0 0 0 24a20 20 0 0 1 20 20a44.05 44.05 0 0 0 44 44h16v12a12 12 0 0 0 24 0v-40a20 20 0 0 1 40 0v40a12 12 0 0 0 24 0v-40a43.66 43.66 0 0 0-5.76-21.72A60.1 60.1 0 0 0 220 112v-8a61.5 61.5 0 0 0-7.38-28.83ZM196 112a36 36 0 0 1-36 36h-48a36 36 0 0 1-36-36v-8a37.87 37.87 0 0 1 6.13-20.12a11.65 11.65 0 0 0 1.58-11.49a39.9 39.9 0 0 1-.4-27.72a39.87 39.87 0 0 1 26.41 17.8a12 12 0 0 0 10.1 5.53h32.35a12 12 0 0 0 10.11-5.53a39.84 39.84 0 0 1 26.41-17.8a39.9 39.9 0 0 1-.4 27.72a12 12 0 0 0 1.61 11.53A37.85 37.85 0 0 1 196 104Z"
                />
              </svg>
            </a>
          </div>
        </div>
      </Nav>
      <slot />
    </div>

    <!-- IMAGE CONTAINER  -->
    <div class="hidden xl:block">
      <NuxtImg src="/tmdb-logo.svg" width="400" alt="TMDB Logo" class="ml-10" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFavorites } from "@/store/favorites";

const favorites = useFavorites();
const syncMoviesFlag = ref<boolean>(false);

const syncMovies = async () => {
  try {
    syncMoviesFlag.value = true;
    await favorites.getMovies();
    syncMoviesFlag.value = false;
  } catch (error) {
    console.log(error);
  }
};
</script>

<style>
body {
  background-color: #0d253f;
}
</style>
