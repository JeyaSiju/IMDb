import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./routes/Home";
import MovieDetails from "./routes/MovieDetails";
import UpdateMovie from "./routes/UpdateMovie";
import { MoviesContextProvider } from "./context/MoviesContext";

const App = () => {
    return (
        <MoviesContextProvider>
            <div className="container">
                <Router>
                    <Routes>
                        <Route exact path = '/' element = {<Home />}/>
                        <Route exact path = '/Movie/:id' element = {<MovieDetails/>}/>
                        <Route exact path = '/Movie/:id/Update' element = {<UpdateMovie/>}/>
                    </Routes>
                </Router>
            </div>
        </MoviesContextProvider>
    );
}

export default App;