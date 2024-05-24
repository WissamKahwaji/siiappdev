import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  editUserProfile,
  getUserById,
  getUserByUserName,
  getUserLikedPosts,
  getUserSavedPosts,
  toggleFollow,
} from ".";

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
  // const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-profile"],
    mutationFn: (payload: EditProfileProps) => editUserProfile(payload),
    onSuccess(_, variable) {
      toast.success(`edit ${variable.fullName} successfully.`);
      queryClient.invalidateQueries({ queryKey: ["get-user-byId"] });
      // navigate("/account", { replace: true });
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

export {
  useGetUserByIdQuery,
  useEditProfileMutation,
  useGetUserLikedPostsQuery,
  useGetUserSavedPostsQuery,
  useGetUserByUserNameQuery,
  useToggleFollowMutaion,
};
