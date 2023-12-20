"use client";

import HeaderComponent from "@/components/Header/Header";
import SeeAllComponent from "@/components/See All/SeeAllComponent";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

const SeeAll = () => {
  return (
    <>
      <HeaderComponent query={undefined} onInputChange={undefined} />
      <SeeAllComponent />
    </>
  );
};

export default withPageAuthRequired(SeeAll);
