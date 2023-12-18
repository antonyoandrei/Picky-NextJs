"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { useUserContext } from '../utils/useUserContext'; 
import { useUser } from '@auth0/nextjs-auth0/client';
import MovieFrameComponent from '../components/Movie Frame/MovieFrame'; 
import { getUserByEmail, createUser } from './api/users.service'; 
import styles from './homepage.module.css';
import { UserType } from '@/contexts/UserContext';

const Homepage = () => {
  const { user, isLoading } = useUser();
  const { setCurrentLoggedUser } = useUserContext();
  
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

  if (isLoading) {
    return (
      <div className="cradle-wrapper">
        <div className="newtons-cradle">
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
        </div>
      </div>
    );
  }

  return (
    <main className={styles.homeWrapper}>
      <section className={styles.frameTitleWrapper}>
        <div className={styles.frameTitle}>All movies</div>
          <Link href={`/see-all?title=All movies`}>
            <button className={styles.seeAllBtn}><p className={styles.seeAllText}>See all</p></button>
          </Link>
      </section>
      <MovieFrameComponent id="firstSwiper" movieSet="allMovies" />
    </main>
  );
};

export default Homepage;