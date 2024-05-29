import { useNavigate, useParams } from "react-router-dom";
import { useGetUserByUserCategoryQuery } from "../../apis/account/queries";
import { SyncLoader } from "react-spinners";

const UsersByCategoriesPage = () => {
  const { userCategory } = useParams<{ userCategory: string }>();
  const navigate = useNavigate();
  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
  } = useGetUserByUserCategoryQuery(userCategory ?? "");

  if (isLoadingUsers) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <SyncLoader size={20} />
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
              <div
                key={user._id}
                className="bg-white shadow-xl rounded-lg p-6 flex flex-col items-center transform transition duration-500 hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={user.profileImage ?? "https://via.placeholder.com/150"}
                  alt={user.fullName}
                  className="w-24 h-24 rounded-full mb-4 border-4 border-secondary"
                />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {user.fullName}
                </h2>
                <p className="text-gray-500 mb-2">@{user.userName}</p>
                <button
                  className="px-4 py-2 mt-4 text-navBackground font-semibold bg-secondary rounded hover:bg-navBackground hover:text-secondary"
                  onClick={() => {
                    navigate(`/${user.userName}`);
                  }}
                >
                  View Profile
                </button>
              </div>
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
