import { useParams } from "react-router-dom";
import { useGetUserByUserCategoryQuery } from "../../apis/account/queries";

import UserCard from "../../components/pages/profile/UserCard";
import LoadingComponent from "../../components/const/LoadingComponent";

const UsersByCategoriesPage = () => {
  const { userCategory } = useParams<{ userCategory: string }>();

  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
  } = useGetUserByUserCategoryQuery(userCategory ?? "");

  if (isLoadingUsers) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <LoadingComponent />
      </div>
    );
  }

  if (isErrorUsers) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-red-500 text-lg">
          Error loading users. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-gradient-to-b from-gray-50 to-gray-200 py-12 flex justify-center items-start font-header">
      <div className="container mx-auto px-4">
        <h1 className="md:text-4xl text-2xl font-bold text-center text-gray-900 mb-8">
          Users in "{userCategory}" Category
        </h1>
        {users && users?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:mx-32">
            {users?.map(user => (
              <UserCard user={user} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-xl mt-12">
            There are no users yet in this category
          </p>
        )}
      </div>
    </div>
  );
};

export default UsersByCategoriesPage;
