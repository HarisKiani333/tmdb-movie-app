import '../css/movieCard.css';
import { useMoviecontext } from '../contexts/movieContexts';
export default function MovieCard({movie}) {
    const { addToFavorites, removeFromFavorites, checkForFavorites } = useMoviecontext();

    const isFavorite = checkForFavorites(movie.id);

    function onFavouriteClick(e) {
        e.preventDefault();
        if (!isFavorite) {
            return addToFavorites(movie);
        } else {
            return removeFromFavorites(movie.id);
        }
    }

  return (

    
    <div className="movie-card">
        <div className="movie-poster">
          <img src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
       

        <div className="movie-overlay">
            <button
                className={`favorite-btn ${isFavorite ? 'active' : ""}`} onClick={onFavouriteClick}>
                  {isFavorite ? "❤️" : "🤍"}
                {console.log("isFavorite for", movie.id, ":", isFavorite)}
            </button>
        </div>
         </div>        
        <div className="movie-info">
          <h2>{movie.title}</h2>
            <p><strong>Release Date:</strong> {movie.release_date.split("-")[0]}</p>
          <p>{movie.overview}</p>
        </div>
    </div>
  )
}
