import React, { useContext, useState } from "react";
import MovieFinder from "../apis/MovieFinder";
import { MoviesContext } from "../context/MoviesContext";

const AddMovie = () => {
    const {addMovie} = useContext(MoviesContext);
    const [name, setName] =  useState("");
    const [genre, setGenre] =  useState("");
    const [duration, setDuration] =  useState("Duration");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await MovieFinder.post("/new/", {
                name,
                genre,
                duration,
            });
            console.log(response);
            addMovie(response.data.data.movie);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="mb-4 text-center">
            <form action="">
                <div className="row justify-content-between">
                    <div className="col-md-4">
                        <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control text-center" placeholder="Movie"/>
                    </div>
                    <div className="col-md-4">
                        <input value={genre} onChange={e => setGenre(e.target.value)} type="text" className="form-control text-center" placeholder="Genre"/>
                    </div>
                    <div className="col-md-2">
                        <select value={duration} onChange={e => setDuration(e.target.value)} className="custom-select my-1 mr-sm-2" placeholder="Duration">
                            <option disabled>Duration</option>
                            <option value="1">O</option>
                            <option value="2">O O</option>
                            <option value="3">O O O</option>
                            <option value="4">O O O O</option>
                        </select>
                    </div>
                    <div className="col">
                        <button onClick={handleSubmit} type="submit" className="btn btn-warning">ADD</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddMovie;