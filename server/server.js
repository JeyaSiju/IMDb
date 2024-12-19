require("dotenv").config();
const express = require("express");
const db = require("./db");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());



//get all movies
app.get("/api/v1/Movie/all", async(req, res) => {

    try {
        const movies = await(db.query("SELECT * FROM MOVIES LEFT JOIN (SELECT movie_id,COUNT(*),TRUNC(AVG(rating),1) as AVG FROM REVIEWS GROUP BY movie_id) REVIEWS ON movies.id = reviews.movie_id;"));
        console.log(movies);
        res.json({
            status:"success",
            movies: movies.rows.length,
            data:{
                movies : movies.rows,
            }
        })
        
    } catch (error) {
        console.log(error);
    } 
})


//get a movie
app.get("/api/v1/Movie/:id", async (req,res) => {
    console.log(req.params);
    try {
        const movie = await db.query("SELECT * FROM MOVIES WHERE ID =$1", [req.params.id]);
        const reviews = await db.query("SELECT * FROM REVIEWS WHERE MOVIE_ID =$1", [req.params.id]);
        res.json({
            status:"success",
            data:{
                movie : movie.rows[0],
                reviews : reviews.rows,
            }
        });
        console.log(reviews.rows);

    } catch (error) {
        console.log(error);
    }
})


//add new movie
app.post("/api/v1/Movie/new", async (req,res) => {
    console.log(req.body);
    try {
        const movie = await db.query("INSERT INTO MOVIES (name,genre,duration) VALUES ($1,$2,$3) RETURNING *", [req.body.name, req.body.genre, req.body.duration]);
        res.status(201).json({
            status:"success",
            data:{
                movie : movie.rows[0],
            }
        })
    } catch (error) {
        console.log(error);
    }
})


//update a movie
app.put("/api/v1/Movie/:id", async (req,res) => {
    console.log(req.params.id);
    console.log(req.body);
    try {
        const movie = await db.query("UPDATE MOVIES SET name = $1, genre = $2, duration = $3 WHERE id = $4 RETURNING *" , [req.body.name, req.body.genre, req.body.duration, req.params.id]);
        res.json({
            status:"success",
            data:{
                movie : movie.rows,
            }
        })
    } catch (error) {
        console.log(error);
    }
})


//delete a movie
app.delete("/api/v1/Movie/:id", async (req,res) => {
    console.log(req.params.id);
    try {
        const movie = await db.query("DELETE FROM MOVIES WHERE id = $1 ", [req.params.id]);
        res.status(204).json({
            status:"success",
        })
    } catch (error) {
        console.log(error);
    }
})

//add a review
app.post("/api/v1/Movie/:id/addReview", async (req,res) => {
    try {
        const review = await db.query("INSERT INTO REVIEWS (movie_id,name,review,rating) VALUES ($1,$2,$3,$4) RETURNING *", [req.params.id, req.body.name, req.body.review, req.body.rating]);
        res.status(201).json({
            status:"success",
            data:{
                review : review.rows[0],
            }
        })
    } catch (error) {
        console.log(error);
    }
})



const port = process.env.PORT;
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
});