import FooterComponent from "@/components/Footer/Footer";
import HeaderComponent from "@/components/Header/Header";
import UserDetailsComponent from "@/components/User Details/UserDetails";

const Profile = () => {
  return (
    <>
      <HeaderComponent query={undefined} onInputChange={undefined} />
      <UserDetailsComponent />
      <FooterComponent />
    </>
  );
};

export default Profile;
