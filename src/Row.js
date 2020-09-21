import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "./axios";
import YouTube from "react-youtube";
// import movieTrailer from "movie-trailer";

const API_KEY = process.env.REACT_APP_API_KEY;

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow, isTv }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [currentMovie, setCurrentMovie] = useState({});

  // a snippet of code which runs based on a specific condition
  useEffect(() => {
    // if [], run once when the row loads, and don't run again
    async function fetchData() {
      //   console.log(fetchUrl);
      const request = await axios.get(fetchUrl);

      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
    // https://developers.google.com/youtube/player_parameters
  };

  // console.table(movies);

  const handleClick = (movie, isTv) => {
    console.log(movie?.name || "");
    console.log(movie?.id || "");
    console.log(currentMovie);

    if (currentMovie === movie) {
      console.log("same movie");
      setTrailerUrl("");
      setCurrentMovie({});
    } else {
      async function fetchTrailer() {
        console.log(movie.media_type);
        const requestUrl = `https://api.themoviedb.org/3/${
          movie.media_type === "tv" || isTv ? "tv" : "movie"
        }/${movie?.id}/videos?api_key=${API_KEY}`;
        let request = await axios.get(requestUrl);

        setTrailerUrl(request.data.results[0]?.key);
        setCurrentMovie(movie);

        return request;
      }
      fetchTrailer();

      // movieTrailer(movie?.name || "")
      //   .then((url) => {
      //     const urlParams = new URLSearchParams(new URL(url).search);
      //     setTrailerUrl(urlParams.get("v"));
      //   })
      //   .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {/* row__poster */}

        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie, isTv)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && (
        <YouTube
          videoId={trailerUrl}
          opts={opts}
          onEnd={() => setTrailerUrl("")}
        />
      )}
    </div>
  );
}

export default Row;
