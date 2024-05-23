import { SyncLoader } from "react-spinners";
import { useGetUserByUserNameQuery } from "../../apis/account/queries";
import { useParams } from "react-router-dom";
import ProfileHeader from "../../components/pages/profile/profileHeader";
import ProfilePosts from "../../components/pages/profile/profilePosts";
import { useEffect } from "react";

const Profile = () => {
  const { userName } = useParams<{ userName: string }>();

  const {
    data: userInfo,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useGetUserByUserNameQuery(userName ?? "");

  useEffect(() => {
    console.log("Fetching data for userName:", userName);
  }, [userName]);
  if (isLoadingUser) {
    return (
      <div className="text-center h-screen flex flex-col justify-center items-center">
        <SyncLoader size={20} />
      </div>
    );
  }

  if (isErrorUser) {
    return <div>Error loading profile.</div>;
  }

  return (
    <div className="container py-8 mx-auto">
      <main className="bg-background">
        {userInfo && <ProfileHeader user={userInfo} />}
        {userInfo && <ProfilePosts userId={userInfo._id} />}
      </main>
    </div>
  );
};

export default Profile;
