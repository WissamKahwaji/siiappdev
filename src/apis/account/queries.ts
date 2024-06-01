import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  editUserProfile,
  getUserById,
  getUserByUserCategory,
  getUserByUserName,
  getUserFollowers,
  getUserFollowings,
  getUserLikedPosts,
  getUserSavedPosts,
  getUserSearch,
  toggleFollow,
} from ".";

import { EditProfileProps } from "./type";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
};
