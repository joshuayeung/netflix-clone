import React from "react";
import "./App.css";
import Banner from "./Banner";
import Nav from "./Nav";
import requests from "./requests";
import Row from "./Row";

function App() {
  return (
    <div className="app">
      {/* Nav */}
      <Nav />
      <Banner />

      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
        isTv
      />

      <Row title="Trending Now" fetchUrl={requests.fetchTrending} isTv />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
      <Row title="Mystery Movies" fetchUrl={requests.fetchMystery} />
      <Row title="Sci-fi Movies" fetchUrl={requests.fetchSciFi} />
      <Row title="Western Movies" fetchUrl={requests.fetchWestern} />
      <Row title="Animation" fetchUrl={requests.fetchAnimation} />
      <Row title="TV" fetchUrl={requests.fetchTV} />
    </div>
  );
}

export default App;
