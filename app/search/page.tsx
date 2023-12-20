"use client";

import HeaderComponent from "@/components/Header/Header";
import FooterComponent from "@/components/Footer/Footer";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import SearchbarComponent from "@/components/Searchbar/Searchbar";

const SeeAll = () => {
  return (
    <>
      <HeaderComponent />
      <SearchbarComponent />
      <FooterComponent />
    </>
  );
};

export default withPageAuthRequired(SeeAll);
