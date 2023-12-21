"use client";

import "./modal.css";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { Genre, MovieContext, MovieType } from "../../contexts/MovieContext";
import toast from "react-hot-toast";
import { createMovie } from "../../app/api/movies.service";
import { userContext } from "../../contexts/UserContext";
import { uploadRequest } from "../../app/api/upload.service";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";

export type FormData = {
  id: number;
  title: string;
  rating: string;
  genres: Genre[] | any;
  imgSrc: string | undefined;
};

type UserModalProps = {
  isVisible: boolean;
  toggleModal: () => void;
  toggleButtonRef: React.RefObject<SVGSVGElement>;
};

const ModalComponent = ({
  isVisible,
  toggleModal,
  toggleButtonRef,
}: UserModalProps & { toggleButtonRef: React.RefObject<SVGSVGElement> }) => {
  const { isDarkMode } = useTheme();
  const modalClassName = isVisible
    ? `modal-component ${isDarkMode ? "dark-mode" : ""} shown`
    : `modal-component ${isDarkMode ? "dark-mode" : ""} hidden`;
  const [movie, setMovie] = useState<FormData>({
    id: 0,
    title: "",
    rating: "",
    genres: [],
    imgSrc: "",
  });
  const modalRef = useRef<HTMLDivElement>(null);
  const { addMovieToAll } = useContext(MovieContext);
  const { currentUser } = useContext(userContext);
  const [file, setfile] = useState<File>();
  const { t } = useTranslation();

  const onUpdate = async () => {
    const parsedRating = parseFloat(movie.rating);
    const cloudinaryImageUrl = await uploadRequest(file);
    try {
      if (movie.title && !isNaN(parsedRating) && movie.genres && movie.imgSrc) {
        const newMovie: MovieType = {
          name: movie.title,
          rating: parsedRating,
          genres: movie.genres,
          imgSrc: cloudinaryImageUrl || "",
          poster_image: cloudinaryImageUrl || "",
          id: movie.id,
          title: "",
          score: "",
        };
        const userId = currentUser?.id ?? 0;
        await createMovie(movie, userId);
        addMovieToAll(newMovie);
        setMovie({ title: "", rating: "", genres: [], imgSrc: "", id: 0 });
        window.location.href = "/";
      } else {
        toast.error(t("All fields are required, and rating must be a number."));
      }
    } catch (error) {
      console.error("Error creating movie:", error);
      toast.error(t("An error occurred while adding the movie."));
    }
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement> | null) => {
    if (e && e.target && e.target.files && e.target.files.length !== null) {
      const file = e.target.files[0];
      setfile(file);
      const cloudinaryImageUrl = await uploadRequest(file);
      setMovie((prevData) => ({
        ...prevData,
        imgSrc: cloudinaryImageUrl || "",
      }));
      window.dispatchEvent(new Event("movieImageUpdated"));
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isVisible &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        if (
          !toggleButtonRef.current ||
          !toggleButtonRef.current.contains(event.target as Node)
        ) {
          toggleModal();
        }
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (isVisible && event.key === "Escape") {
        toggleModal();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isVisible, toggleModal, modalRef, toggleButtonRef]);

  return (
    <section ref={modalRef} className={modalClassName}>
      <h3 className={`modal-title ${isDarkMode ? "dark-mode" : ""}`}>
        {t("Add a movie")}
      </h3>
      <div className="movie-info">
        <section className="cover-wrapper">
          <article
            className="cover-img"
            style={
              movie.imgSrc ? { backgroundImage: `url(${movie.imgSrc})` } : {}
            }
          >
            {!movie.imgSrc && (
              <Image
                height={300}
                alt={movie.title}
                width={200}
                className="cover"
                src="https://res.cloudinary.com/du94mex28/image/upload/v1699002566/Picky/sans-affiche_hgymml.png"
                priority
              />
            )}
          </article>
          <article className="cover-container">
            <input
              className="modal-img-input"
              type="file"
              onChange={handleChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-upload"
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
              <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
              <path d="M7 9l5 -5l5 5"></path>
              <path d="M12 4l0 12"></path>
            </svg>
          </article>
        </section>
        <form className="modal-form">
          <input
            className={`modal-input ${isDarkMode ? "dark-mode" : ""}`}
            type="text"
            placeholder={t("Title")}
            autoComplete="off"
            name="title"
            value={movie.title}
            onChange={handleInputChange}
          />

          <input
            className={`modal-input ${isDarkMode ? "dark-mode" : ""}`}
            type="text"
            placeholder={t("Rating")}
            autoComplete="off"
            name="rating"
            value={movie.rating}
            onChange={handleInputChange}
          />

          <input
            className={`modal-input ${isDarkMode ? "dark-mode" : ""}`}
            type="text"
            placeholder={t("Genres")}
            autoComplete="off"
            name="genres"
            value={movie.genres}
            onChange={handleInputChange}
          />
        </form>
      </div>
      <button
        type="button"
        className={`modal-btn ${isDarkMode ? "dark-mode" : ""}`}
        onClick={onUpdate}
      >
        <p className={`modal-btn-text ${isDarkMode ? "dark-mode" : ""}`}>
          {t("Add movie")}
        </p>
      </button>
    </section>
  );
};

export default ModalComponent;
