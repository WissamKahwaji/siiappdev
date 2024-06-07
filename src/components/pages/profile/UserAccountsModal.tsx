import defaultImage from "../../../assets/guest-01-01.png";
import {
  useGetUserAccountsQuery,
  useSwitchAccountMutation,
} from "../../../apis/account/queries";
import { SyncLoader } from "react-spinners";

interface UserAccountsModalProps {
  onClose: () => void;
}

const UserAccountsModal = ({ onClose }: UserAccountsModalProps) => {
  const { data: users, isLoading, isError } = useGetUserAccountsQuery();
  const { mutate: switchAccount } = useSwitchAccountMutation();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50px]  bg-gray-100">
        <SyncLoader size={15} />
      </div>
    );
  }

  if (isError) {
    return <div>Error occurred</div>;
  }
  return (
    <div>
      <div className="flex flex-col w-full justify-start items-center space-y-5">
        {users &&
          users.length > 0 &&
          users.map((user, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-start md:gap-x-3 gap-x-2 w-full md:w-1/2 bg-navBackground/90  shadow-lg py-2 px-3 rounded-lg cursor-pointer"
              onClick={() => {
                switchAccount({ email: user.email });
              }}
            >
              <img
                src={user.profileImage ?? defaultImage}
                alt="profile"
                className=" object-cover rounded-full border-2 border-gray-200 shadow-md shadow-secondary/50 md:h-[40px] md:w-[40px] h-[40px] w-[40px]"
              />
              <p className="text-navBackground text-sm font-header text-white">
                {user.fullName}
              </p>
            </div>
          ))}
        <div
          className="w-full md:w-1/2 bg-secondary md:text-base text-sm text-navBackground font-serif px-3 py-2 rounded-lg shadow-md cursor-pointer"
          onClick={onClose}
        >
          Switch to another Existing Account
        </div>
      </div>
    </div>
  );
};

export default UserAccountsModal;
