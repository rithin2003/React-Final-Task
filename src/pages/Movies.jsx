
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { useMovies } from "../hooks/useMovies";

const Movies = () => {
  const { movieList, loading, error } = useMovies();
  const [params, setParams] = useSearchParams();
  const search = params.get("search") || "";

  const filtered = movieList.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="page-container">
      <span className="eyebrow">THE COLLECTION</span>
      <h1>Explore Movies 🎭</h1>
      <p className="page-description">Find your next favorite story.</p>

      <input className="search-input" placeholder="Search movies..."
        value={search}
        onChange={event => setParams(
          event.target.value ? { search: event.target.value } : {}
        )} />

      {loading ? <p className="message">Loading movies...</p> : (
        <>
          {error && <p className="message">{error}</p>}
          <div className="movie-grid">
            {filtered.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          {filtered.length === 0 &&
            <p className="message">No matching movies found.</p>}
        </>
      )}
    </main>
  );
};

export default Movies;
