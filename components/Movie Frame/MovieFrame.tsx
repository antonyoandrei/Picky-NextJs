"use client";

import React from "react";
import "./movieframe.css";
import { Key } from "react";
import "swiper/swiper-bundle.css";
import Link from "next/link";
import { MovieType } from "../../contexts/MovieContext";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/ThemeContext";

interface MovieFrameComponentProps {
  id: string;
  movieSet: "allMovies";
  movies: MovieType[];
}

const MovieFrameComponent: React.FC<MovieFrameComponentProps> = ({ movies }) => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  return (
    <section className={`swiper swiper-hero ${isDarkMode ? "dark-mode" : ""}`}>
      <div>
        <Swiper
          className="swiper-wrapper"
          navigation={true}
          modules={[Navigation]}
          spaceBetween={20}
          loop={true}
          breakpoints={{
            300: {
              slidesPerView: 2,
            },
            800: {
              slidesPerView: 5,
            },
          }}
        >
          {movies.map(
            (
              movie: { poster_image: string; title: string; id: number },
              index: Key
            ) => (
              <SwiperSlide key={index}>
                <article className="swiper-slide">
                  <Link href={`/details/${movie.id}`}>
                    <Image
                      width={200}
                      height={300}
                      className="cover"
                      src={
                        movie.poster_image ||
                        "https://res.cloudinary.com/du94mex28/image/upload/v1699002566/Picky/sans-affiche_hgymml.png"
                      }
                      alt={movie.title}
                      priority
                    />
                  </Link>
                </article>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
      {movies.length === 0 && (
        <span className={`fallback-text ${isDarkMode ? "dark-mode" : ""}`}>
          {t("No movies added yet")}
        </span>
      )}
    </section>
  );
};

export default MovieFrameComponent;
