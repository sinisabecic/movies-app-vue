export const getPosterPath = (poster_path: string | undefined) =>
  poster_path
    ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${poster_path}`
    : "";
