import FooterComponent from "@/components/Footer/Footer";
import HeaderComponent from "@/components/Header/Header";
import MovieDetailsComponent from "../../../components/Movie Details/MovieDetails";

const Details = ({ params }: { params: { id: number } }) => {
  return (
    <>
      <HeaderComponent />
      <MovieDetailsComponent movieId={params} />
      <FooterComponent />
    </>
  );
};

export default Details;
