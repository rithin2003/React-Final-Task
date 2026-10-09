
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMovie, removeMovie } from "../redux/watchlistSlice";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const watchlist = useSelector(state => state.watchlist);
  const saved = watchlist.some(item => item.id === movie.id);

  return (
    <article className="movie-card">
      <Link to={`/movies/${movie.id}`} className="poster-link">
        {movie.poster ? (
          <img src={movie.poster} alt={movie.title} className="movie-poster"
            onError={event => { event.currentTarget.style.visibility = "hidden"; }} />
        ) : (
          <div className="poster-placeholder">🎬</div>
        )}
      </Link>

      <div className="movie-info">
        <div className="movie-meta">
          <span>{movie.year}</span>
          <span className="rating">★ {Number(movie.rating).toFixed(1)}</span>
        </div>

        <h3>{movie.title}</h3>
        <p>{movie.genre}</p>

        <div className="card-actions">
          <Link to={`/movies/${movie.id}`} className="details-link">
            Details
          </Link>
          <button
            className={saved ? "save-button saved" : "save-button"}
            onClick={() => dispatch(saved
              ? removeMovie(movie.id)
              : addMovie(movie))}
          >
            {saved ? "♥ Saved" : "♡ Save"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
