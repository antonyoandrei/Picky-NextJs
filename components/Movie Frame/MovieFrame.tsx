'use client';

import Swiper from 'swiper';
import './movieframe.css';
import { Key, useContext, useEffect } from 'react';
import 'swiper/swiper-bundle.css';
import Link from 'next/link';
import { MovieContext } from '../../contexts/MovieContext';

interface MovieFrameComponentProps {
  id: string;
  movieSet: 'allMovies';
}

const MovieFrameComponent: React.FC<MovieFrameComponentProps> = ({ movieSet }) => {
  const { movieSets } = useContext(MovieContext);
  const movies = movieSets[movieSet];

  useEffect(() => {
    const swiperContainer = document.querySelector(`.swiper-hero`) as HTMLElement;
    if (swiperContainer) {
      const swiper = new Swiper(swiperContainer, {
        loop: true,
        slidesPerView: 5,
        spaceBetween: 50,
      });
      swiper.update();
      return () => {
        swiper.destroy(true, true);
      };
    }
  }, [movies]);

  return (
    <>
      <section className="swiper swiper-hero">
        <div className="swiper-wrapper">
          {movies.map((movie: { poster_image: string; title: string; id: number }, index: Key) => (
            <article className="swiper-slide" key={index}>
              <Link href={`/details/${movie.id}`}>
                <img className='cover' src={movie.poster_image || 'https://res.cloudinary.com/du94mex28/image/upload/v1699002566/Picky/sans-affiche_hgymml.png'} alt={movie.title} />
              </Link>
            </article>
          ))}
        </div>
        {movies.length === 0 && <span className='fallback-text'>No movies added yet</span>}
      </section>
    </>
  );
}

export default MovieFrameComponent;
