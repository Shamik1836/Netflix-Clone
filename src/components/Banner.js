import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "../axios";
import requests from "../requests";
function Banner() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      //   This is used for fetching one random movie
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);
  function truncate(str, max) {
    return str?.length > max ? str.substr(0, max - 1) + "…" : str;
  }
  return (
    <Header
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      {/* title */}
      <BannerContentsContainer>
        <BannerTitle>
          {movie?.title || movie?.name || movie?.original_name}
        </BannerTitle>
        <BannerButtonContainer>
          <Button>Play</Button>
          <Button>My List</Button>
        </BannerButtonContainer>
        {/* div with two buttons */}
        {/* decriuption */}
        <BannerContents></BannerContents>
        <Description>{truncate(movie?.overview, 150)}</Description>
      </BannerContentsContainer>
      <BannerFadeBottom />
    </Header>
  );
}

export default Banner;

const Header = styled.header`
  color: white;
  object-fit: contain;
  height: 448px;
`;
const BannerContentsContainer = styled.div`
  margin-left: 30px;
  padding-top: 140px;
  height: 190px;
`;
const BannerContents = styled.div``;
const BannerButtonContainer = styled.div``;
const Button = styled.button`
  cursor: pointer;
  color: #fff;
  outline: none;
  border: none;
  font-weight: 700;
  border-radius: 0.2vw;
  padding-left: 2rem;
  padding-right: 2rem;
  margin-right: 1rem;
  padding-top: 0.5rem;
  background-color: rgba(51, 51, 51, 0.5);
  padding-bottom: 0.5rem;
  &:hover {
    color: #000;
    background-color: #e6e6e6;
    transition: all 0.2s;
  }
`;
const Description = styled.h1`
  width: 45rem;
  line-height: 1.3rem;
  padding-top: 1rem;
  font-size: 0.8rem;
  max-width: 360px;
  height: 80px;
`;
const BannerTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  padding-bottom: 0.3rem;
`;
const BannerFadeBottom = styled.div`
  height: 7.4rem;
  background-image: linear-gradient(
    180deg,
    transparent,
    rgba(37, 37, 37, 0.61),
    #111
  );
`;
