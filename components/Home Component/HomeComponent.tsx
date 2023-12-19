"use client";

import "./home.css";
import { useEffect } from "react";
import Link from "next/link";
import { useUserContext } from "../../utils/useUserContext";
import { useUser } from "@auth0/nextjs-auth0/client";
import MovieFrameComponent from "../Movie Frame/MovieFrame";
import { getUserByEmail, createUser } from "../../app/api/users.service";
import { UserType } from "@/contexts/UserContext";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";

const HomepageComponent = () => {
  const { user, isLoading } = useUser();
  const { setCurrentLoggedUser } = useUserContext();
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

  if (isLoading) {
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
    <main className="home-wrapper">
      <section className="frame-title-wrapper">
        <div className={`frame-title ${isDarkMode ? "dark-mode" : ""}`}>
          {t("All movies")}
        </div>
        <Link href={`/see-all?title=All movies`}>
          <button className={`see-all-btn ${isDarkMode ? "dark-mode" : ""}`}>
            <p className={`see-all-text ${isDarkMode ? "dark-mode" : ""}`}>
              {t("See all")}
            </p>
          </button>
        </Link>
      </section>
      <MovieFrameComponent id="firstSwiper" movieSet="allMovies" />
    </main>
  );
};

export default HomepageComponent;
