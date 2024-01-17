import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieDetailsComponent from "../Movie Details/MovieDetails";
import { LanguageProvider } from "../../contexts/LanguageContext";
import { UserContextProvider } from "../../contexts/UserContext";
import { ThemeProvider } from "../../contexts/ThemeContext";
import { fetchMovieById } from "../../app/api/movies.service";

jest.mock("../../app/api/movies.service");

jest.mock("next/image", () => {
  return ({ src, alt }: any) => <img src={src} alt={alt} />;
}, { virtual: true } as any);

test("Renders movie details", async () => {
  const mockResponse = {
    id: 1,
    title: "Movie 1",
    name: "Movie 1",
    score: "8.5",
    rating: 8.5,
    genres: [{ genre: { name: "Action" } }],
    imgSrc: "https://example.com/poster1.jpg",
    poster_image: "https://example.com/poster1.jpg",
  };

  (fetchMovieById as jest.Mock).mockResolvedValue(mockResponse);

  render(
    <UserContextProvider value={{ currentUser: { movies: [] } }}>
      <LanguageProvider>
        <ThemeProvider>
          <MovieDetailsComponent
            movieId={{
              id: 1,
            }}
          />
        </ThemeProvider>
      </LanguageProvider>
    </UserContextProvider>
  );

  await waitFor(() => {
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("8.5")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
  });
});
