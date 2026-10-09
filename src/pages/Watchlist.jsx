
import { useDispatch, useSelector } from "react-redux";
import { clearWatchlist } from "../redux/watchlistSlice";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";

const Watchlist = () => {
  const watchlist = useSelector(state => state.watchlist);
  const dispatch = useDispatch();

  return (
    <main className="page-container">
      <div className="section-heading">
        <div>
          <span className="eyebrow">YOUR COLLECTION</span>
          <h1>My Watchlist</h1>
          <p className="page-description">
            {watchlist.length} movie(s) saved
          </p>
        </div>

        {watchlist.length > 0 && (
          <button className="danger-button"
            onClick={() => {
              if (window.confirm("Clear your entire watchlist?")) {
                dispatch(clearWatchlist());
              }
            }}>
            Clear All
          </button>
        )}
      </div>

      {watchlist.length > 0 ? (
        <div className="movie-grid">
          {watchlist.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🎞️</div>
          <h2>Your watchlist is empty</h2>
          <p>Save movies you want to watch later.</p>
          <Link to="/movies" className="primary-button">
            Discover Movies
          </Link>
        </div>
      )}
    </main>
  );
};

export default Watchlist;
