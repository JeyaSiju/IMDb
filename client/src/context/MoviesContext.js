import React, {useState, createContext} from "react";

export const MoviesContext = createContext();

export const MoviesContextProvider = props => {
    const [Movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState([]);

    const addMovie = (movie) => {
        setMovies([...Movies, movie]);
    }

    return (
        <MoviesContext.Provider value={ {Movies, setMovies, addMovie, selectedMovie, setSelectedMovie} }>
            {props.children}
        </MoviesContext.Provider>
    )
}
