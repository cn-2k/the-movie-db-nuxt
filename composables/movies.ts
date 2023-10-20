import type { AxiosInstance } from "axios";

const defaultPagination = {
  page: 1,
};

export default (httpClient: AxiosInstance) => {
  httpClient.interceptors.request.use((config) => {
    config.params = {
      ...config.params,
      api_key: useRuntimeConfig().public.mdbApiKey,
    };
    return config;
  });

  return {
    getPopularMovie: async ({ page } = defaultPagination) => {
      const query = { page };

      const response = await httpClient.get("/3/movie/popular", {
        params: query,
      });

      return {
        data: response.data,
      };
    },

    getMovieGenres: async () => {
      const response = await httpClient.get("/3/genre/movie/list");

      return {
        data: response.data,
      };
    },

    getMovieDetails: async (movie_id: any) => {
      const response = await httpClient.get(`/3/movie/${movie_id}`);

      return {
        data: response.data,
      };
    },
  };
};
