'use client';

import styles from './seeall.module.css';
import { Key, useContext, useEffect } from "react";
import { MovieContext } from "../../contexts/MovieContext";
import Link from 'next/link';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { getUserByEmail, createUser } from '../api/users.service'; 
import { UserType } from '@/contexts/UserContext';
import { useUserContext } from '@/utils/useUserContext';

const SeeAll = () => {
    const { movieSets } = useContext(MovieContext);
    const movies = movieSets.allMovies;
    const { setCurrentLoggedUser } = useUserContext();
    const { user } = useUser();

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
            console.error('Error fetching user data:', error);
          }
        })();
      }, [user]);

    return (
            <main className={styles.seeAllComponent}>
                <h1 className={styles.seeAllTitle}>All movies</h1>
                {movies.length > 0 ? (
                  <section className={styles.moviesWrapper}>
                      {movies.map((movie: { poster_image: string; title: string; id: number }, index: Key) => (
                          <article className="swiper-slide" key={index}>
                              <Link href={`/details/${movie.id}`}>
                                  <img className={styles.cover} src={movie.poster_image || 'https://res.cloudinary.com/du94mex28/image/upload/v1699002566/Picky/sans-affiche_hgymml.png'} alt={movie.title}/>
                              </Link>
                          </article>
                      ))}
                  </section>
                ) : (
                  <p className={styles.fallbackText2}>No movies added yet.</p>
                )}
            </main>
    )
} 

export default withPageAuthRequired(SeeAll)
