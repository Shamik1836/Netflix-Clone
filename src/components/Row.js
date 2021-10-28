import React, { useState, useEffect } from "react";
import axios from "../axios";
import styled from "styled-components";
const base_url = "https://image.tmdb.org/t/p/original/";
function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  // A snippet of code that runs based on some condition
  useEffect(() => {
    // if [], it run once the row loads first
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      //   console.log(request);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  //   console.table(movies);
  return (
    <Rows>
      <h2>{title}</h2>
      <RowPosters>
        {movies.map((movie) =>
          isLargeRow ? (
            <RowPosterImgLarge
              key={movie.id}
              src={`${base_url}${movie.poster_path}`}
              alt={movie.name}
            ></RowPosterImgLarge>
          ) : (
            <RowPosterImg
              key={movie.id}
              src={`${base_url}${movie.backdrop_path} `}
              alt={movie.name}
            ></RowPosterImg>
          )
        )}
      </RowPosters>
    </Rows>
  );
}

export default Row;
const Rows = styled.div`
  color: white;
  margin-left: 20px;
`;
const RowPosterImg = styled.img`
  width: 100%;
  max-height: 100px;
  object-fit: contain;
  margin-right: 20px;
  transition: transform 450px;
  cursor: pointer;
  &:hover {
    transform: scale(1.08);
  }
`;
const RowPosters = styled.div`
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  padding: 20px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const RowPosterImgLarge = styled(RowPosterImg)`
  max-height: 250px;
  &:hover {
    transform: scale(1.09);
  }
`;
