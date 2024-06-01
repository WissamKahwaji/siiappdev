import React from "react";
import {
  useGetUserFollowersQuery,
  useGetUserFollowingsQuery,
} from "../../apis/account/queries";
import { SyncLoader } from "react-spinners";
import UserCard from "../../components/pages/profile/UserCard";

interface UserFollowingsPageProps {
  type: "followers" | "followings";
}

const UserFollowingsPage: React.FC<UserFollowingsPageProps> = ({ type }) => {
  const isFollowers = type === "followers";
  const followersQuery = useGetUserFollowersQuery();
  const followingsQuery = useGetUserFollowingsQuery();

  const {
    data: usersInfo,
    isLoading,
    isError,
  } = isFollowers ? followersQuery : followingsQuery;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <SyncLoader size={20} />
      </div>
    );
  }

  if (isError) {
    return <div>Error occurred</div>;
  }

  return (
    <div className="min-h-screen  bg-gradient-to-b from-gray-50 to-gray-200 py-12 flex justify-center items-start font-header">
      <div className="container mx-auto px-4">
        <h1 className="md:text-4xl text-2xl font-bold text-center text-gray-900 mb-8">
          {type === "followers" ? "Followers" : "Followings"}
        </h1>
        {usersInfo && usersInfo?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:mx-32">
            {usersInfo?.map(user => (
              <UserCard user={user} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-xl mt-12">
            There are no users yet .
          </p>
        )}
      </div>
    </div>
  );
};

export default UserFollowingsPage;
