import HeaderComponent from "@/components/Header/Header";
import FooterComponent from "@/components/Footer/Footer";
import HomepageComponent from "@/components/Home Component/HomeComponent";

const Homepage = () => {
  return (
    <>
      <HeaderComponent query={undefined} onInputChange={undefined} />
      <HomepageComponent />
      <FooterComponent />
    </>
  );
};

export default Homepage;
