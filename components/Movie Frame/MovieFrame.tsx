'use client';

import './movieframe.css';
import { Key, useContext, useEffect } from 'react';
import 'swiper/swiper-bundle.css';
import Link from 'next/link';
import { MovieContext } from '../../contexts/MovieContext';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

interface MovieFrameComponentProps {
  id: string;
  movieSet: 'allMovies';
}

const MovieFrameComponent: React.FC<MovieFrameComponentProps> = ({ movieSet }) => {
  const { movieSets } = useContext(MovieContext);
  const movies = movieSets[movieSet];

  return (
    <>
      <section className="swiper swiper-hero">
        <div className="swiper-wrapper">
          <Swiper navigation={true} modules={[Navigation]} slidesPerView={5} spaceBetween={20} loop={true} >
            {movies.map((movie: { poster_image: string; title: string; id: number }, index: Key) => (
              <SwiperSlide >
                <article className="swiper-slide" key={index}>
                  <Link href={`/details/${movie.id}`}>
                    <Image width={200} height={300} className='cover' src={movie.poster_image || 'https://res.cloudinary.com/du94mex28/image/upload/v1699002566/Picky/sans-affiche_hgymml.png'} alt={movie.title} />
                  </Link>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {movies.length === 0 && <span className='fallback-text'>No movies added yet</span>}
      </section>
    </>
  );
}

export default MovieFrameComponent;
