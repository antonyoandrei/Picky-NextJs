"use client";

import "./movieframe.css";
import { Key, useContext } from "react";
import "swiper/swiper-bundle.css";
import Link from "next/link";
import { MovieContext } from "../../contexts/MovieContext";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";

interface MovieFrameComponentProps {
  id: string;
  movieSet: "allMovies";
}

const MovieFrameComponent: React.FC<MovieFrameComponentProps> = ({
  movieSet,
}) => {
  const { movieSets } = useContext(MovieContext);
  const movies = movieSets[movieSet];
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
              <SwiperSlide>
                <article className="swiper-slide" key={index}>
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
