import { UserModel } from "../../../apis/account/type";
import { Link } from "react-router-dom";

type UserCardProps = {
  user: UserModel;
};

const UserCard = (props: UserCardProps) => {
  return (
    <div
      key={props.user._id}
      className="bg-white shadow-xl rounded-lg p-6 flex flex-col items-center transform transition duration-500 hover:scale-105 hover:shadow-2xl"
    >
      <img
        src={props.user.profileImage ?? "https://via.placeholder.com/150"}
        alt={props.user.fullName}
        className="w-24 h-24 rounded-full mb-4 border-4 border-secondary"
      />
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {props.user.fullName}
      </h2>
      <p className="text-gray-500 mb-2">@{props.user.userName}</p>
      <Link to={`/${props.user.userName}`} reloadDocument>
        <button className="px-4 py-2 mt-4 text-navBackground font-semibold bg-secondary rounded hover:bg-navBackground hover:text-secondary">
          View Profile
        </button>
      </Link>
    </div>
  );
};

export default UserCard;
