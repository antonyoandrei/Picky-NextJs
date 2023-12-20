"use client";

import "./searchbar.css";
import { Key, useContext, useEffect } from "react";
import { MovieContext } from "../../contexts/MovieContext";
import Link from "next/link";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { getUserByEmail, createUser } from "../../app/api/users.service";
import { UserType } from "@/contexts/UserContext";
import { useUserContext } from "@/utils/useUserContext";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";

const SearchbarComponent = () => {
  const { movieSets } = useContext(MovieContext);
  const movies = movieSets.allMovies;
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  return (
    <main className="searchbar-component">
      <h1 className={`searchbar-title ${isDarkMode ? "dark-mode" : ""}`}>
        {t("Results")}
      </h1>
      {movies.length > 0 ? (
        <section className="movies-wrapper">
          {movies.map(
            (
              movie: { poster_image: string; title: string; id: number },
              index: Key
            ) => (
              <article className="swiper-slide" key={index}>
                <Link href={`/details/${movie.id}`}>
                  <Image
                    width={200}
                    height={300}
                    alt={movie.title}
                    className="cover"
                    src={
                      movie.poster_image ||
                      "https://res.cloudinary.com/du94mex28/image/upload/v1699002566/Picky/sans-affiche_hgymml.png"
                    }
                    priority
                  />
                </Link>
              </article>
            )
          )}
        </section>
      ) : (
        <p className={`fallback-text-2 ${isDarkMode ? "dark-mode" : ""}`}>
          {t("Search for movies!")}
        </p>
      )}
    </main>
  );
};

export default SearchbarComponent;
