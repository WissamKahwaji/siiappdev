import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  editUserProfile,
  getUserAccounts,
  getUserById,
  getUserByUserCategory,
  getUserByUserName,
  getUserFollowers,
  getUserFollowings,
  getUserLikedPosts,
  getUserSavedPosts,
  getUserSearch,
  signUpWithAdd,
  switchAccount,
  toggleFollow,
} from ".";

import { EditProfileProps } from "./type";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { SignUpValues } from "../auth/type";
import { ErrorMessage } from "../type";

const useGetUserByIdQuery = () =>
  useQuery({ queryKey: ["get-user-byId"], queryFn: () => getUserById() });

const useGetUserByUserNameQuery = (userName: string) =>
  useQuery({
    queryKey: ["get-user-userName"],
    queryFn: () => getUserByUserName(userName),
    enabled: !!userName,
  });

const useGetUserByUserCategoryQuery = (userCategory: string) =>
  useQuery({
    queryKey: ["get-user-userCategory"],
    queryFn: () => getUserByUserCategory(userCategory),
  });

const useGetUserLikedPostsQuery = () =>
  useQuery({
    queryKey: ["get-user-liked-posts"],
    queryFn: () => getUserLikedPosts(),
  });

const useGetUserSavedPostsQuery = () =>
  useQuery({
    queryKey: ["get-user-saved-posts"],
    queryFn: () => getUserSavedPosts(),
  });

const useEditProfileMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-profile"],
    mutationFn: (payload: EditProfileProps) => editUserProfile(payload),
    onSuccess(_, variable) {
      toast.success(`edit ${variable.fullName} successfully.`);
      queryClient.invalidateQueries({ queryKey: ["get-user-userName"] });
      queryClient.invalidateQueries({ queryKey: ["get-user-byId"] });
      navigate(`/${variable.userName}`, { replace: true });
    },
    onError(_, variable) {
      toast.error(`failed to edit ${variable.fullName}`);
    },
  });
};

const useToggleFollowMutaion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["toggle-follow"],
    mutationFn: (id: string | undefined) => toggleFollow(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["get-user-userName"],
      });
    },
    onError() {
      // toast.error(`failed to add like`);
    },
  });
};

const useGetUserFollowersQuery = () =>
  useQuery({
    queryKey: ["get-user-followers"],
    queryFn: () => getUserFollowers(),
  });

const useGetUserFollowingsQuery = () =>
  useQuery({
    queryKey: ["get-user-followings"],
    queryFn: () => getUserFollowings(),
  });

const useGetUserSearchQuery = (query: string) =>
  useQuery({
    queryKey: ["get-user-search"],
    queryFn: () => getUserSearch(query),
    enabled: false,
  });

const useGetUserAccountsQuery = () =>
  useQuery({
    queryKey: ["get-user-accounts"],
    queryFn: () => getUserAccounts(),
  });

const useSignUpWithAddMutation = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  return useMutation({
    mutationKey: ["sign-up-with-add"],
    mutationFn: (data: SignUpValues) => signUpWithAdd(data),
    onSuccess: (data, variables) => {
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("password");

      localStorage.setItem("token", data.token);
      login(data.token);
      localStorage.setItem("userId", data.result._id);
      localStorage.setItem("userName", data.result.userName);
      localStorage.setItem("email", variables.email);
      localStorage.setItem("password", variables.password);
      navigate(`/`, { replace: true });
    },
    onError: () => {
      toast.error("User already exist, change username or email");
    },
  });
};
const useSwitchAccountMutation = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  return useMutation({
    mutationKey: ["switch-account"],
    mutationFn: (data: { email: string }) => switchAccount(data),
    onSuccess: (data, variables) => {
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("password");

      localStorage.setItem("token", data.token);
      login(data.token);
      localStorage.setItem("userId", data.result._id);
      localStorage.setItem("userName", data.result.userName);
      localStorage.setItem("email", variables.email);
      toast.success(`Switched To ${data.result.fullName}'s Account `);
      navigate(`/`, { replace: true });
    },
    onError: (error: ErrorMessage) => {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to sign in, please enter the correct email or password";
      toast.error(errorMessage);
    },
  });
};

export {
  useGetUserByIdQuery,
  useEditProfileMutation,
  useGetUserLikedPostsQuery,
  useGetUserSavedPostsQuery,
  useGetUserByUserNameQuery,
  useToggleFollowMutaion,
  useGetUserByUserCategoryQuery,
  useGetUserFollowersQuery,
  useGetUserFollowingsQuery,
  useGetUserSearchQuery,
  useSignUpWithAddMutation,
  useGetUserAccountsQuery,
  useSwitchAccountMutation,
};
