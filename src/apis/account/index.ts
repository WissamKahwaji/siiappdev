import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import { PostModel } from "../posts/type";
import publicInstance from "../publicInstance";
import { EditProfileProps, UserModel } from "./type";

const getUserById = async () => {
  const res = await publicInstance.get<UserModel>(API_ROUTES.USER.BYID);
  return res.data;
};
const getUserByUserName = async (userName: string) => {
  const res = await publicInstance.get<UserModel>(
    API_ROUTES.USER.GET_BY_USERNAEM(userName)
  );
  return res.data;
};

const getUserLikedPosts = async () => {
  const res = await publicInstance.get<PostModel[]>(
    API_ROUTES.USER.GET_LIKED_POSTS
  );
  return res.data;
};

const getUserSavedPosts = async () => {
  const res = await publicInstance.get<PostModel[]>(
    API_ROUTES.USER.GET_SAVED_POSTS
  );
  return res.data;
};

const editUserProfile = async (payload: EditProfileProps) => {
  const { ...rest } = payload;
  const data = createFormData({ ...rest });
  const res = await publicInstance.put(API_ROUTES.USER.EDIT, data);
  return res.data;
};
const toggleFollow = async (id: string | undefined) => {
  const res = await publicInstance.post(API_ROUTES.USER.TOGGLE_FOLLOW(id));
  return res.data;
};
export {
  getUserById,
  editUserProfile,
  getUserLikedPosts,
  getUserSavedPosts,
  getUserByUserName,
  toggleFollow,
};
