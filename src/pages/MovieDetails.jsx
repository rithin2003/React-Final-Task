
import { Link, useParams } from "react-router-dom";
import { useMovies } from "../hooks/useMovies";
import { useDispatch, useSelector } from "react-redux";
import { addMovie, removeMovie } from "../redux/watchlistSlice";

const MovieDetails = () => {
  const { id } = useParams();
  const { movieList, loading } = useMovies();
  const dispatch = useDispatch();
  const watchlist = useSelector(state => state.watchlist);

  const movie = movieList.find(item => String(item.id) === id);
  const saved = movie && watchlist.some(item => item.id === movie.id);

  if (loading) return <p className="message">Loading movie details...</p>;

  if (!movie) {
    return (
      <main className="page-container">
        <h1>Movie not found</h1>
        <Link to="/movies" className="primary-button">Back to Movies</Link>
      </main>
    );
  }

  return (
    <main className="details-page">
      <Link to="/movies" className="back-link">← Back to Movies</Link>

      <div className="details-layout">
        {movie.poster ? (
          <img className="details-poster" src={movie.poster}
            alt={movie.title}
            onError={event => { event.currentTarget.style.visibility = "hidden"; }} />
        ) : <div className="poster-placeholder details-poster">🎬</div>}

        <div className="details-content">
          <span className="eyebrow">MOVIE DETAILS</span>
          <h1>{movie.title}</h1>
          <div className="detail-meta">
            <span>{movie.year}</span>
            <span>{movie.genre}</span>
            <span>★ {Number(movie.rating).toFixed(1)}</span>
            <span>{movie.duration}</span>
          </div>
          <h3>Synopsis</h3>
          <p>{movie.description}</p>
          <button className="primary-button"
            onClick={() => dispatch(saved
              ? removeMovie(movie.id)
              : addMovie(movie))}>
            {saved ? "♥ Remove from Watchlist" : "♡ Add to Watchlist"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default MovieDetails;
