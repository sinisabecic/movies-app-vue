import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

const apiMovieUrl: string = "https://api.themoviedb.org/3";
const apiKey: string = "8183d234f0477cb5b9dea44a1fca8b09";

export const apiCallMovie: AxiosInstance = axios.create({
  baseURL: apiMovieUrl,
  method: "GET",
  params: {
    api_key: apiKey,
  },
  headers: {
    accept: "application/json",
  },
});

apiCallMovie.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<AxiosResponse> => {
    if (401 === error.response?.status) {
      console.error(error);
      console.log("Greska!");
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  },
);

export const fetchFromApi = async (endpoint: string) => {
  try {
    const response = await apiCallMovie.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch from API:", error);
    throw error;
  }
};
