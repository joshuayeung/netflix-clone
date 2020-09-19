import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "./axios";
import requests from "./requests";
const API_KEY = process.env.REACT_APP_API_KEY;

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);

      //   console.table(request.data.results);

      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }

    fetchData();
  }, []);

  //   console.log(movie);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  async function fetchTrailer(movie) {
    const requestUrl = `https://api.themoviedb.org/3/tv/${movie?.id}/videos?api_key=${API_KEY}`;
    const request = await axios.get(requestUrl);

    const trailerLink = request.data.results[0]?.key;

    window.open(`https://www.youtube.com/watch?v=${trailerLink}`);
    return trailerLink;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center 25%",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner__buttons">
          <button
            className="banner__button"
            onClick={() => fetchTrailer(movie)}
          >
            Play
          </button>
          <button className="banner__button">My List</button>
        </div>

        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
