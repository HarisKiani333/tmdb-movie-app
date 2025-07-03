import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import "../css/home.css";
import { fetchMovies, GetPopularMovies, fetchLocalMovies } from "../services/api";
import { useLocation } from "react-router-dom";

const Home = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [Loading, setLoading] = useState(true);
    const location = useLocation();

  useEffect(() => {
  const loadPopularMovies = async () => {
    try {
      setLoading(true);
      const popularMovies = await GetPopularMovies();
      setMovies(popularMovies);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (location.state?.refresh || movies.length === 0) {
    loadPopularMovies();
  }
}, [location.state]);


  useEffect(() => {
    const loadLocalMovies = async () => {
      try {
        setLoading(true);
        const localMovies = await fetchLocalMovies();
        // Validate movie objects before setting state
        const validMovies = localMovies.filter(
          m => m && m.id && m.title && m.poster_path && m.release_date && m.overview
        );
        if (validMovies.length !== localMovies.length) {
          console.warn("Some movies from backend were invalid and filtered out", localMovies);
        }
        setMovies(validMovies);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching local movies:", error);
      } finally {
        setLoading(false);
      }
    };
    loadLocalMovies();
  }, []);




    async function handleSearch(event) {
        event.preventDefault();


        if (searchQuery.trim() === "")
            return;
        if (Loading)
            return;

        setLoading(true);

        try {
            const SearchResults = await fetchMovies(searchQuery);
            if (SearchResults.length === 0) {
                setError("No movies found for your search query.");
            } else {
                setMovies(SearchResults);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form enhanced-search">
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    className="search-input enhanced-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    required
                />
                <button type="submit" className="search-button enhanced-button">Search</button>
            </form>

            {error && <div className="error-message">Error: {error}</div>}


            {Loading ? (<div className="loading">Loading...</div>) : (<div className="movies-grid">
                {movies.map(movie => (<MovieCard key={movie.id} movie={movie} />)
                )}
            </div>
            )}

        </div>

    )

}

export default Home
