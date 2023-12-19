"use client";

import Link from "next/link";
import "./footer.css";
import logo from "../../public/logo.svg";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";

const FooterComponent = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  return (
    <footer className="footer-container">
      <section className="socials-wrapper">
        <Link href={"https://github.com/antonyoandrei"} target="_blank">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`icon-social ${
              isDarkMode ? "dark-mode" : ""
            } icon-tabler icon-tabler-brand-github`}
            width="35"
            height="35"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
          </svg>
        </Link>
        <Link
          href={"https://www.linkedin.com/in/antonyo-andrei"}
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`icon-social ${
              isDarkMode ? "dark-mode" : ""
            } icon-tabler icon-tabler-brand-linkedin`}
            width="35"
            height="35"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
            <path d="M8 11l0 5"></path>
            <path d="M8 8l0 .01"></path>
            <path d="M12 16l0 -5"></path>
            <path d="M16 16v-3a2 2 0 0 0 -4 0"></path>
          </svg>
        </Link>
        <Link href={"https://assemblerinstitute.com"} target="_blank">
          <Image
            width={35}
            height={35}
            src={logo}
            alt="Assmebler logo"
            className="ait-svg"
            priority
          />
        </Link>
      </section>
      <section className={`info-wrapper ${isDarkMode ? "dark-mode" : ""}`}>
        <p>{t("Conditions of use")}</p>
        <p>{t("Privacy & Policy")}</p>
        <p>{t("Press Room")}</p>
      </section>
      <section className={`rights-wrapper ${isDarkMode ? "dark-mode" : ""}`}>
        <p>{t("© 2023 Picky by Antonyo Andrei at AIT")}</p>
      </section>
    </footer>
  );
};

export default FooterComponent;
