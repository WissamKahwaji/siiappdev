import { useGetUserByUserNameQuery } from "../../apis/account/queries";
import { useLocation, useParams } from "react-router-dom";
import ProfileHeader from "../../components/pages/profile/profileHeader";
import ProfilePosts from "../../components/pages/profile/profilePosts";
import { useEffect } from "react";
import LoadingComponent from "../../components/const/LoadingComponent";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { userName } = useParams<{ userName: string }>();
  const { t } = useTranslation();
  const {
    data: userInfo,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useGetUserByUserNameQuery(userName ?? "");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const discountType = queryParams.get("discountType");

  useEffect(() => {
    console.log("Fetching data for userName:", userName);
  }, [userName]);

  if (isLoadingUser) {
    return (
      <div className="text-center h-screen flex flex-col justify-center items-center">
        <LoadingComponent />
      </div>
    );
  }

  if (isErrorUser) {
    return <div>Error loading profile.</div>;
  }

  return (
    <div className="container py-8 mx-auto relative">
      <main className="bg-background">
        {/* Fixed Button */}
        {discountType && (
          <div className="fixed top-[620px] left-0 right-0 z-50 flex justify-center">
            <button className="bg-secondary text-navBackground py-2 px-4 rounded-md shadow-lg">
              {t(discountType)}
            </button>
          </div>
        )}
        {userInfo && <ProfileHeader user={userInfo} />}
        {userInfo && <ProfilePosts userId={userInfo._id} />}
      </main>
    </div>
  );
};

export default Profile;
