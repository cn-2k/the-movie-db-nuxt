// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@pinia/nuxt",
    "@vueuse/nuxt",
  ],
  image: {
    // Options
  },
  runtimeConfig: {
    apiSecret: "", // can be overridden by NUXT_API_SECRET environment variable
    public: {
      mdbApiKey: "", // can be overridden by NUXT_PUBLIC_MDB_API_KEY environment variable
    },
  },
  ssr: false,
});
