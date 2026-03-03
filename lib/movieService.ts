import axios from "axios";

const OMDB_KEY = process.env.OMDB_API_KEY;
const TMDB_KEY = process.env.TMDB_API_KEY;

export async function fetchMovieData(imdbId: string) {
  // 1️⃣ Fetch OMDb data
  const omdbRes = await axios.get(
    `https://www.omdbapi.com/?i=${imdbId}&apikey=${OMDB_KEY}`
  );

  if (omdbRes.data.Response === "False") {
    throw new Error("Movie not found");
  }

  const movie = omdbRes.data;

  // 2️⃣ Convert IMDb ID to TMDB ID
  const tmdbRes = await axios.get(
    `https://api.themoviedb.org/3/find/${imdbId}?api_key=${TMDB_KEY}&external_source=imdb_id`
  );

  const tmdbMovie = tmdbRes.data.movie_results[0];
  const tmdbId = tmdbMovie?.id;

  let reviews: string[] = [];

  if (tmdbId) {
    const reviewRes = await axios.get(
      `https://api.themoviedb.org/3/movie/${tmdbId}/reviews?api_key=${TMDB_KEY}`
    );

    reviews = reviewRes.data.results.map(
      (r: any) => r.content.slice(0, 500)
    );
  }

  return {
    title: movie.Title,
    poster: movie.Poster,
    year: movie.Year,
    rating: movie.imdbRating,
    plot: movie.Plot,
    cast: movie.Actors,
    reviews,
  };
}