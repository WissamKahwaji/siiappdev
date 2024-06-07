import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import { SignUpValues } from "../auth/type";
import { PostModel } from "../posts/type";
import publicInstance from "../publicInstance";
import { EditProfileProps, SearchResult, UserModel } from "./type";

const getUserById = async () => {
  const res = await publicInstance.get<UserModel>(API_ROUTES.USER.BYID);
  return res.data;
};
const getUserByUserName = async (userName: string) => {
  const res = await publicInstance.get<UserModel>(
    API_ROUTES.USER.GET_BY_USERNAME(userName)
  );
  return res.data;
};

const getUserByUserCategory = async (userCategory: string) => {
  const res = await publicInstance.get<UserModel[]>(
    API_ROUTES.USER.GET_BY_USERCATEGORY(userCategory)
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

const getUserFollowers = async () => {
  const res = await publicInstance.get<UserModel[]>(
    API_ROUTES.USER.GET_FOLLOWERS
  );
  return res.data;
};

const getUserFollowings = async () => {
  const res = await publicInstance.get<UserModel[]>(
    API_ROUTES.USER.GET_FOLLOWINGS
  );
  return res.data;
};

const getUserSearch = async (query: string) => {
  const res = await publicInstance.get<SearchResult>(
    API_ROUTES.USER.USER_SEARCH(query)
  );
  return res.data;
};

const getUserAccounts = async () => {
  const res = await publicInstance.get<UserModel[]>(
    API_ROUTES.USER.USER_ACCOUNTS
  );
  return res.data;
};

const signUpWithAdd = async (data: SignUpValues) => {
  const res = await publicInstance.post(API_ROUTES.USER.SIGNUP_WITH_ADD, data);
  return res.data;
};

const switchAccount = async (data: { email: string }) => {
  const res = await publicInstance.post(API_ROUTES.USER.SWITCH_ACCOUNT, data);
  return res.data;
};

export {
  getUserById,
  editUserProfile,
  getUserLikedPosts,
  getUserSavedPosts,
  getUserByUserName,
  toggleFollow,
  getUserByUserCategory,
  getUserFollowers,
  getUserFollowings,
  getUserSearch,
  signUpWithAdd,
  getUserAccounts,
  switchAccount,
};
