import './seeall.module.css'
import { Key, useContext } from "react";
import { MovieContext } from "../../context/MovieContext";
import Link from 'next/link';

export default function SeeAll() {
    const { movieSets } = useContext(MovieContext);
    const movies = movieSets.allMovies;

    return (
            <main className="see-all-component">
                <h1 className="see-all-title">All movies</h1>
                {movies.length > 0 ? (
                  <section className="movies-wrapper">
                      {movies.map((movie: { poster_image: string; title: string; id: number }, index: Key) => (
                          <article className="swiper-slide" key={index}>
                              <Link href={`/details/${movie.id}`}>
                                  <img className='cover' src={movie.poster_image || 'https://res.cloudinary.com/du94mex28/image/upload/v1699002566/Picky/sans-affiche_hgymml.png'} alt={movie.title}/>
                              </Link>
                          </article>
                      ))}
                  </section>
                ) : (
                  <p className="fallback-text-2">No movies added yet.</p>
                )}
            </main>
    )
} 
