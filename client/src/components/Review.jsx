import React from "react";
import Rating from "./Rating";

const Review = ({reviews}) => {
    return(
      <div className="row px-4 row-col-3 mb-2 justify-content-evenly ">
        {reviews && reviews.map((review) => {
            return (
                <div key={review.id} className="card text-white bg-dark mb-3 mt-4 " style={{maxWidth:"30%"}}>
            <div className="card-header d-flex justify-content-between">
                <span>{review.name}</span>
                <span><Rating rating={review.rating}/></span>
            </div>
            <div className="card-body">
                <p className="card-text">{review.review}</p>
            </div>
        </div>
            )
        })}
      </div>  
    )   
}

export default Review;