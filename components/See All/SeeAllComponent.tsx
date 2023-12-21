"use client";

import "./seeall.css";
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

const SeeAllComponent = () => {
  const { movieSets } = useContext(MovieContext);
  const movies = movieSets.allMovies;
  const { setCurrentLoggedUser } = useUserContext();
  const { user } = useUser();
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    (async function fetchUserData() {
      try {
        if (user?.email) {
          const userData = await getUserByEmail(user?.email);
          const userFetched = userData[1] as UserType;
          if (userData[1] != null) {
            setCurrentLoggedUser(userFetched);
          } else {
            const newUser = {
              name: user.name,
              email: user.email,
              password: user.email,
            };
            const userCreated = await createUser(newUser);
            setCurrentLoggedUser(userCreated);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    })();
  }, [user]);

  return (
    <main className="see-all-component">
      <h1 className={`see-all-title ${isDarkMode ? "dark-mode" : ""}`}>
        {t("All movies")}
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
          {t("No movies added yet")}
        </p>
      )}
    </main>
  );
};

export default SeeAllComponent;
