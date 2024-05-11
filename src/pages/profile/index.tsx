import ProfileHeader from "../../components/pages/profile/profileHeader";
import ProfilePosts from "../../components/pages/profile/profilePosts";

const Profile = () => {
  return (
    <div className="container pt-8 mx-auto">
      <main className="bg-background">
        <ProfileHeader />
        <ProfilePosts />
      </main>
    </div>
  );
};

export default Profile;
