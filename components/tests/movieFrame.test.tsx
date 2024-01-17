import { render, waitFor } from "@testing-library/react";
import MovieFrameComponent from "../Movie Frame/MovieFrame";
import React from "react";
import { LanguageProvider } from "../../contexts/LanguageContext";

jest.mock("swiper/modules", () => ({
  Navigation: {
    __esModule: true,
    default: jest.fn(),
  },
}));

jest.mock("swiper/react", () => ({
  __esModule: true,
  Swiper: ({ children }: any) => (
    <div className="mocked-swiper">{children}</div>
  ),
  SwiperSlide: ({ children }: any) => (
    <div className="mocked-swiper-slide">{children}</div>
  ),
}));

jest.mock("../../contexts/ThemeContext", () => ({
  useTheme: () => ({ isDarkMode: false }),
}));

describe("MovieFrameComponent", () => {
  it("renders movie component correctly", async () => {
    const movies = [
      {
        id: 1,
        title: "Movie 1",
        name: "Movie 1",
        score: "8.5",
        rating: 8.5,
        genres: [{ genre: { name: "Action" } }],
        imgSrc: "/poster1.jpg",
        poster_image: "/poster1.jpg",
      },
    ];
    const { container } = render(
      <LanguageProvider>
        <MovieFrameComponent
          movieSet="allMovies"
          id="firstSwiper"
          movies={movies}
        />
      </LanguageProvider>
    );
    const swiperSlideElements = await waitFor(() =>
      container.querySelectorAll(".swiper-slide")
    );
    expect(swiperSlideElements.length).toBeGreaterThanOrEqual(1);
  });
});
