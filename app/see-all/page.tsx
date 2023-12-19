"use client";

import HeaderComponent from "@/components/Header/Header";
import FooterComponent from "@/components/Footer/Footer";
import SeeAllComponent from "@/components/See All/SeeAllComponent";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

const SeeAll = () => {
  return (
    <>
      <HeaderComponent />
      <SeeAllComponent />
      <FooterComponent />
    </>
  );
};

export default withPageAuthRequired(SeeAll);
