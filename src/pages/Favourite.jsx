import MovieCard from "../components/MovieCard";
import "../css/favorite.css"
import { useMoviecontext } from "../contexts/movieContexts"
export default function Favourite() {
  const { favorites } = useMoviecontext();

  return (
    <>
      {favorites.length > 0 ? (
        <div className="movies-grid">
          {favorites.map(movie => (<MovieCard key={movie.id} movie={movie} />)
          )}
        </div>
      ) : (
        <div className='favorite-page'>
          <p>No Favorite movies added Yet !</p>
        </div>
      )}
    </>
  )
}

