import { FormData } from "../../components/Add Modal/Modal";

export const createMovie = async (movie: FormData, userId: number) => {
  const url = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${url}/movie/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: movie.title,
        poster_image: movie.imgSrc,
        score: movie.rating,
        genres: [{ name: movie.genres }],
      }),
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovies = async (userId: number) => {
  const url = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${url}/movie/user/${userId}`, {
      method: "GET",
    });

    if (response.ok) {
      const moviesData = await response.json();
      return moviesData;
    } else {
      console.error("Failed to fetch movies");
      return [];
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const fetchMovieById = async (movieId: number) => {
  const url = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${url}/movie/${movieId}`, {
      method: "GET",
    });

    if (response.ok) {
      const movieData = await response.json();
      return movieData;
    } else {
      console.error(`Failed to fetch movie with ID `);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching movie with ID`, error);
    return null;
  }
};

export const deleteMovieById = async (movieId: number) => {
  const url = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${url}/movie/${movieId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log(`Movie with ID deleted successfully`);
      return true;
    } else {
      console.error(`Failed to delete movie with ID`);
      return false;
    }
  } catch (error) {
    console.error(`Error deleting movie with ID `, error);
    return false;
  }
};
