
import { useEffect, useState } from "react";
import { movies as sampleMovies } from "../data/movies";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const useMovies = () => {
  const [movieList, setMovieList] = useState(sampleMovies);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchMovies = async () => {
      if (!API_KEY) {
        setMovieList(sampleMovies);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Unable to fetch movies.");
        }

        const data = await response.json();

        if (active) {
          setMovieList(data.results.map(movie => ({
            id: movie.id,
            title: movie.title,
            year: movie.release_date?.slice(0, 4) || "N/A",
            genre: "Other",
            rating: movie.vote_average,
            duration: "N/A",
            description: movie.overview || "No description available.",
            poster: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : ""
          })));
        }
      } catch (err) {
        if (active) {
          setMovieList(sampleMovies);
          setError("Live API unavailable. Showing sample movies.");
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchMovies();

    return () => {
      active = false;
    };
  }, []);

  return { movieList, loading, error };
};
