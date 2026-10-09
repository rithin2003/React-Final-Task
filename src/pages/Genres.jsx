
import { NavLink, Outlet } from "react-router-dom";

const Genres = () => {
  const genres = ["Action", "Comedy", "Drama", "Animation","Sci-Fi", "Romance","Horror"];

  return (
    <main className="page-container">
      <span className="eyebrow">EXPLORE BY CATEGORY</span>
      <h1>Movie Genres 🎭</h1>
      <p className="page-description">
        Choose a genre to explore movies that match your mood.
      </p>

      <div className="genre-menu">
        {genres.map(genre => (
          <NavLink key={genre} to={genre.toLowerCase()}
            className={({ isActive }) =>
              isActive ? "genre-tab active" : "genre-tab"
            }>
            {genre}
          </NavLink>
        ))}
      </div>

      <Outlet />
    </main>
  );
};

export default Genres;
