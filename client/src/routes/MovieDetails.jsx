import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MoviesContext } from "../context/MoviesContext";
import MovieFinder from "../apis/MovieFinder";
import Review from "../components/Review";
import AddReview from "../components/AddReview";

const MovieDetails = () => {
    const {id} = useParams();
    const {selectedMovie, setSelectedMovie} = useContext(MoviesContext);

    useEffect(() => {
        const getSelectedMovie = async () => {
            try {
                const response = await MovieFinder.get(`/${id}`);
                setSelectedMovie(response.data.data);

            } catch (error) {
                console.log(error);
            }
        }
        getSelectedMovie();
    }, [])

    return (
        <div>
            {selectedMovie && (
                <>
                <h1 className="text-center display-1">{selectedMovie.movie.name}</h1>
                <Review reviews = {selectedMovie.reviews}/>
                <AddReview/>
                </>
            )}
        </div>
    )
}

export default MovieDetails;