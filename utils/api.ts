import axios from "axios";

export const httpClient = axios.create({
  baseURL: "https://api.themoviedb.org/",
  timeout: 5000,
});

export default {
  movies: movies(httpClient),
};
