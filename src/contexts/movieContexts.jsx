import { createContext,useContext, useState,useEffect } from "react";

const MovieContext = createContext();
export const useMoviecontext =()=> useContext(MovieContext);
export const MovieProvider = ({children})=> {
    const [favorites, setFavorites] = useState([]);
   
    useEffect(()=>{ 
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
      }
    }, []);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);


    const addToFavorites = (movieID) => {
      setFavorites(previousMovies => [...previousMovies, movieID]);

    }


     const removeFromFavorites = (movieID) => {
        setFavorites(previousMovies => previousMovies.filter(m => m.id !== movieID));
    }

    const checkForFavorites = (movieID) => {
        return favorites.some(movie => movie.id === movieID);
    }

    const value = { favorites, addToFavorites, removeFromFavorites, checkForFavorites };

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
}
