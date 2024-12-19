import React, { useState } from "react";
import MovieFinder from "../apis/MovieFinder";
import { useNavigate, useParams } from "react-router-dom";

const AddReview = (props) => {
    const {id} = useParams();
    const [name, setName] = useState("");
    const [review, setReview] =  useState("");
    const [rating, setRating] = useState("Rating");
    const Navigate = useNavigate();

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try {
            const response = await MovieFinder.post(`/${id}/addReview/`, {
                name,
                review,
                rating
            });
            console.log(response); 
            Navigate(`/`);
        } catch (error) {
            console.log(error);
        }
        //Navigate(`/Movie/${id}/`);
    }

    return (
        <div className="mb-2 form-control">
            <form action="">
                <div className="row justify-content-between mb-4">
                    <div className="col-md-8">
                        <label htmlFor="name">Name</label>
                        <input value={name} onChange={e => setName(e.target.value)} id="name" placeholder="Name" type="text" className="form-control" />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="rating">Rating</label>
                        <select value={rating} onChange={e => setRating(e.target.value)} className="form-control custom-select" id="rating">
                            <option disabled>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                  </div>
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="revire">Review</label>
                    <textarea value={review} onChange={e => setReview(e.target.value)} id="Review" className="form-control"></textarea>
                </div>
                <button type="submit" onClick={handleSubmitReview} className="btn btn-warning">Submit</button>
            </form>
        </div>
    )
}

export default AddReview;