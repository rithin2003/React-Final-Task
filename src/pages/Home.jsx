
import { useRef, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { useMovies } from "../hooks/useMovies";

const Home = () => {
  const { movieList, loading, error } = useMovies();
  const [searchParams, setSearchParams] = useSearchParams();
  const [genre, setGenre] = useState("All");
  const searchRef = useRef(null);

  const search = searchParams.get("search") || "";

  const filteredMovies = movieList.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase()) &&
    (genre === "All" || movie.genre === genre)
  );

  const genres = ["All", "Action", "Comedy", "Drama", "Animation"];

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">YOUR NEXT FAVORITE FILM</span>
          <h1>Every movie has a <span>story.</span></h1>
          <p>Explore unforgettable movies, discover new favorites, and
            create your personal watchlist.</p>

          <div className="hero-actions">
            <Link to="/movies" className="primary-button">Explore Movies →</Link>
            <Link to="/watchlist" className="secondary-button">My Watchlist</Link>
          </div>
        </div>
        <div className="hero-art">🎬</div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FIND YOUR NEXT WATCH</span>
            <h2>Discover Movies</h2>
          </div>
          <button className="secondary-button"
            onClick={() => searchRef.current?.focus()}>
            Search Movies
          </button>
        </div>

        <input
          ref={searchRef}
          className="search-input"
          placeholder="Search by movie title..."
          value={search}
          onChange={event => setSearchParams(
            event.target.value ? { search: event.target.value } : {}
          )}
        />

        <div className="genre-filters">
          {genres.map(item => (
            <button key={item}
              className={genre === item ? "filter active-filter" : "filter"}
              onClick={() => setGenre(item)}>
              {item}
            </button>
          ))}
        </div>

        {loading ? <p className="message">Loading movies...</p> : (
          <>
            {error && <p className="message">{error}</p>}
            <div className="movie-grid">
              {filteredMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            {filteredMovies.length === 0 &&
              <p className="message">No movies found. Try another search.</p>}
          </>
        )}
      </section>
    </main>
  );
};

export default Home;
