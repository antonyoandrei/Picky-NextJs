"use client";

import FooterComponent from "@/components/Footer/Footer";
import HeaderComponent from "@/components/Header/Header";
import UserDetailsComponent from "@/components/User Details/UserDetails";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

const Profile = () => {
  return (
    <>
      <HeaderComponent />
      <UserDetailsComponent />
      <FooterComponent />
    </>
  );
};

export default withPageAuthRequired(Profile);
