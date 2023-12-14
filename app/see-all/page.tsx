'use client';

import styles from './seeall.module.css';
import { Key, useContext } from "react";
import { MovieContext } from "../../contexts/MovieContext";
import Link from 'next/link';

const SeeAll = () => {
    const { movieSets } = useContext(MovieContext);
    const movies = movieSets.allMovies;

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

export default SeeAll
