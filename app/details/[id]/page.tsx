"use client";

import FooterComponent from "@/components/Footer/Footer";
import HeaderComponent from "@/components/Header/Header";
import MovieDetailsComponent from "../../../components/Movie Details/MovieDetails";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

const Details = ({ params }: { params: { id: number } }) => {
  return (
    <>
      <HeaderComponent />
      <MovieDetailsComponent movieId={params} />
      <FooterComponent />
    </>
  );
};

export default withPageAuthRequired(Details);
