import React from "react";
import Header from "../components/Header";
import AddMovie from "../components/AddMovie";
import Movies from "../components/Movies";

const Home = () => {
    return (
        <div>
            <Header/>
            <AddMovie/>
            <Movies/>
        </div>
    )
}

export default Home;