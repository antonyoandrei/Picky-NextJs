"use client";

import "./moviedetails.css";
import imdb from "../../public/imdb.logo.svg";
import { useState, useEffect } from "react";
import { deleteMovieById, fetchMovieById } from "../../app/api/movies.service";
import Image from "next/image";
import { Genre, MovieType } from "../../contexts/MovieContext";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/ThemeContext";
import React from "react";

const MovieDetailsComponent = ({ movieId }: any) => {
  const [movieDetails, setMovieDetails] = useState<MovieType | null>(null);
  const [isSeen, setIsSeen] = useState(false);
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchDetails = async () => {
      if (movieId === undefined) {
        return;
      }
      try {
        const details = await fetchMovieById(movieId.id);
        setMovieDetails(details);
        const storedIsSeen = localStorage.getItem(`seen_${movieId.id}`);
        if (storedIsSeen !== null) {
          setIsSeen(JSON.parse(storedIsSeen));
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchDetails();
  }, [movieId]);

  const handleDeleteClick = async () => {
    if (movieId === undefined) {
      return;
    }
    try {
      const isDeleted = await deleteMovieById(movieId.id);
      if (isDeleted) {
        window.location.href = "/";
      } else {
        console.error("Failed to delete movie");
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const handleClick = () => {
    setIsSeen((prevIsSeen) => !prevIsSeen);
    localStorage.setItem(`seen_${movieId.id}`, JSON.stringify(!isSeen));
  };

  if (!movieDetails) {
    return (
      <div className="cradle-wrapper">
        <div className="newtons-cradle">
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="details-component">
      <section className="details-cover-container">
        <Image
          width={300}
          height={450}
          className="details-cover"
          src={
            movieDetails.poster_image ||
            "https://res.cloudinary.com/du94mex28/image/upload/v1699002566/Picky/sans-affiche_hgymml.png"
          }
          alt={movieDetails?.title}
          priority
        />
        <article className={`details-manager ${isDarkMode ? "dark-mode" : ""}`}>
          <div className="details-seen" onClick={handleClick}>
            {isSeen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`icon-manager ${
                  isDarkMode ? "dark-mode" : ""
                } icon-tabler icon-tabler-eye`}
                width="25"
                height="25"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`icon-manager ${
                  isDarkMode ? "dark-mode" : ""
                } icon-tabler icon-tabler-eye-closed`}
                width="25"
                height="25"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M21 9c-2.4 2.667 -5.4 4 -9 4c-3.6 0 -6.6 -1.333 -9 -4" />
                <path d="M3 15l2.5 -3.8" />
                <path d="M21 14.976l-2.492 -3.776" />
                <path d="M9 17l.5 -4" />
                <path d="M15 17l-.5 -4" />
              </svg>
            )}
            <p className={`text-manager ${isDarkMode ? "dark-mode" : ""}`}>
              {isSeen ? t("Seen") : t("Not Seen")}
            </p>
          </div>
        </article>
      </section>
      <section className="details-container">
        <article className="details-title-wrapper">
          <h1
            className={`details-movie-title ${isDarkMode ? "dark-mode" : ""}`}
          >
            {movieDetails.name}
          </h1>
          <svg
            onClick={handleDeleteClick}
            xmlns="http://www.w3.org/2000/svg"
            className={`icon icon-tabler icon-tabler-trash-x ${
              isDarkMode ? "dark-mode" : ""
            }`}
            width="40"
            height="40"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 7h16"></path>
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
            <path d="M10 12l4 4m0 -4l-4 4"></path>
          </svg>
        </article>
        <article
          className={`details-movie-info ${isDarkMode ? "dark-mode" : ""}`}
        >
          <div className="details-movie-info-rating-wrapper">
            <h2 className="details-movie-info-title">{t("RATING")}</h2>
            <div className="rating-container">
              <Image
                width={40}
                height={20}
                src={imdb}
                alt="imdb-logo"
                className="imdb"
                priority
              />
              <p className="details-movie-info-paragraph">
                {movieDetails.score}
              </p>
            </div>
          </div>
          <div className="details-movie-info-genres-wrapper">
            <h2 className="details-movie-info-title">{t("GENRES")}</h2>
            <div className="genres-container">
              <p className="details-movie-info-paragraph">
                {movieDetails.genres.map((genre: Genre) => genre.genre.name)}
              </p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default MovieDetailsComponent;
