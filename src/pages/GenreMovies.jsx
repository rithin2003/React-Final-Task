
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { useMovies } from "../hooks/useMovies";

const GenreMovies = () => {
  const { genre } = useParams();
  const { movieList, loading } = useMovies();

  const filtered = movieList.filter(movie =>
    movie.genre.toLowerCase() === genre.toLowerCase()
  );

  return (
    <section className="nested-content">
      <h2>{genre} Movies</h2>

      {loading ? <p className="message">Loading movies...</p> : (
        <>
          {filtered.length > 0 ? (
            <div className="movie-grid">
              {filtered.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <p className="message">
              No movies in this genre yet. Try another category.
            </p>
          )}
        </>
      )}
    </section>
  );
};

export default GenreMovies;
