'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { useUser, UserProvider } from '@auth0/nextjs-auth0/client';
import { handleAuth } from '@auth0/nextjs-auth0';
import { fetchMovies } from '../app/api/movies.service';
import { useUserContext } from '../utils/useUserContext';

export type MovieType = {
  id: number;
  title: string;
  name: string;
  score: string;
  rating: number;
  genres: Genre[];
  imgSrc: string;
  poster_image: string;
};

export type Genre = {
  genre: {
    name: string
  }
}

type MovieSets = {
  [x: string]: any;
  allMovies: MovieType[];
};

type MovieContextType = {
  movieSets: MovieSets;
  addMovieToAll: (movie: MovieType) => void;
};

export const MovieContext = createContext<MovieContextType>({
  movieSets: {
    allMovies: [],
  },
  addMovieToAll: () => {},
});

type MovieProviderProps = {
  children: ReactNode;
};

const MovieProvider = ({ children }: MovieProviderProps) => {
  const [movieSets, setMovieSets] = useState<MovieSets>({ allMovies: [] });
  const { user } = useUser();
  const { currentUser } = useUserContext();
  const { loginWithRedirect } = handleAuth();
  
  useEffect(() => {
    const fetchMoviesForUser = async () => {
        try {
          if (!user || !currentUser) {
            return;
        }
            const moviesData = await fetchMovies(currentUser.id);
            setMovieSets((prevSets) => ({
                ...prevSets,
                allMovies: moviesData,
            }));
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    if (user) {
        fetchMoviesForUser();
    }
}, [user, currentUser]);

  const addMovieToAll = (movie: MovieType) => {
    if (user) {
      setMovieSets((prevSets) => ({
        ...prevSets,
        allMovies: [...prevSets.allMovies, movie],
      }));
    } else {
      loginWithRedirect();
    }
  };

  return (
    <MovieContext.Provider value={{ movieSets, addMovieToAll }}>
      {children}
    </MovieContext.Provider>
  );
};

export const AuthenticatedMovieProvider = ({ children }: MovieProviderProps) => (
  <UserProvider>
    <MovieProvider>
      {children}
    </MovieProvider>
  </UserProvider>
);

export default AuthenticatedMovieProvider;
