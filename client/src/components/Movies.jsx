import React, {useContext, useEffect} from "react";
import MovieFinder from "../apis/MovieFinder";
import { MoviesContext } from "../context/MoviesContext";
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";

const Movies = ( props ) => {
    const {Movies, setMovies} = useContext(MoviesContext);
    const Navigate = useNavigate();
    useEffect( () => {
        const getMovies = async () => {
            try {
                const Movies = await MovieFinder.get("/all/");
                setMovies(Movies.data.data.movies);
            } catch (error) {
                console.log(error);
            }
        };
        getMovies();
    }, [])

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
            const response = await MovieFinder.delete(`/${id}`);
            setMovies(Movies.filter(movie => {
                return movie.id !== id
            }))
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        
    }

    const handleUpdate = (e, id) => {
        e.stopPropagation();
        Navigate(`/Movie/${id}/Update`);
    }

    const handleSelect = (id) => {
        Navigate(`/Movie/${id}`);
    }

    return(
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="by-primary">
                        <th scope="col">Movie</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    { Movies && Movies.map((movie) => {
                        return (
                            <tr onClick={() => handleSelect(movie.id)} key={movie.id}>
                                <td>{movie.name}</td>
                                <td>{movie.genre}</td>
                                <td>{"O".repeat(movie.duration)}</td>
                                <td>{<Rating rating={movie.avg}/>}</td>
                                <td><button onClick={(e) => handleUpdate(e, movie.id)} className="btn btn-warning">Edit</button></td>
                                <td><button onClick={(e) => handleDelete(e, movie.id)} className="btn btn-warning">Delete</button></td>
                            </tr>
                        )

                    })
                    }
                </tbody>
            </table>

        </div>
    )
}

export default Movies;