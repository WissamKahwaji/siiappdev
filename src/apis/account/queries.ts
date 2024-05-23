import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  editUserProfile,
  getUserById,
  getUserByUserName,
  getUserLikedPosts,
  getUserSavedPosts,
} from ".";
import { useNavigate } from "react-router-dom";
import { EditProfileProps } from "./type";
import { toast } from "react-toastify";

const useGetUserByIdQuery = () =>
  useQuery({ queryKey: ["get-user-byId"], queryFn: () => getUserById() });

const useGetUserByUserNameQuery = (userName: string) =>
  useQuery({
    queryKey: ["get-user-userName"],
    queryFn: () => getUserByUserName(userName),
    enabled: !!userName,
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
    onSuccess(data, variable) {
      toast.success(`edit ${variable.fullName} successfully.`);
      queryClient.invalidateQueries({ queryKey: ["get-user-byId"] });
      navigate("/account", { replace: true });
    },
    onError(data, variable) {
      toast.error(`failed to edit ${variable.fullName}`);
    },
  });
};

export {
  useGetUserByIdQuery,
  useEditProfileMutation,
  useGetUserLikedPostsQuery,
  useGetUserSavedPostsQuery,
  useGetUserByUserNameQuery,
};
