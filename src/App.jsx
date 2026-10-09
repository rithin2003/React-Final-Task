
import { Routes, Route, Outlet } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Watchlist from "./pages/Watchlist";
import Genres from "./pages/Genres";
import GenreMovies from "./pages/GenreMovies";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const Layout = () => {
  const { theme } = useTheme();

  return (
    <div className={theme.dark ? "app dark-theme" : "app light-theme"}>
      <Navbar />
      <div className="main-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="movies" element={<Movies />} />
      <Route path="movies/:id" element={<MovieDetails />} />
      <Route path="watchlist" element={<Watchlist />} />

      <Route path="genres" element={<Genres />}>
        <Route index element={
          <p className="message">Select a genre above to explore movies.</p>
        } />
        <Route path=":genre" element={<GenreMovies />} />

      </Route>

      <Route path="contact" element={<Contact />} />
      <Route path="profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default App;
