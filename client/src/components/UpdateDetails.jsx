import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MovieFinder from "../apis/MovieFinder";

const UpdateDetails = (props) => {
    const {id} = useParams();
    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [duration, setDuration] = useState("");
    const Navigate = useNavigate();

    useEffect( () => {
        const getMovies = async () => {
            try {
                const Movies = await MovieFinder.get(`/${id}/`);
                console.log(Movies.data.data.movie);
                setName(Movies.data.data.movie.name);
                setGenre(Movies.data.data.movie.genre);
                setDuration(Movies.data.data.movie.duration);
            } catch (error) {
                console.log(error);
            }
        };
        getMovies();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await MovieFinder.put(`/${id}`, {
                name,
                genre,
                duration,
            });
            console.log(response);
            Navigate(`/`);
        } catch (error) {
            console.log(error);
        }
    }

    return <div>
        <form action="">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control mb-4" id="name" />
            </div>
            <div className="form-group">
                <label htmlFor="genre">Genre</label>
                <input value={genre} onChange={(e) => setGenre(e.target.value)}type="text" className="form-control mb-4" id="genre" />
            </div>
            <div className="form-group">
                <label htmlFor="duration">Duration</label>
                <input value={duration} onChange={(e) => setDuration(e.target.value)}type="number" className="form-control mb-4" id="duration" />
            </div>
            <button onClick={handleSubmit} className="btn btn-warning">Submit Details</button>
        </form>
    </div>
}

export default UpdateDetails