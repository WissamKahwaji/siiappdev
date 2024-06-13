import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AddCommentInputProps } from "./type";
import {
  addComment,
  addPost,
  deletePost,
  editPost,
  getAllPosts,
  getPostById,
  getPostComments,
  getUserDocsPosts,
  getUserPosts,
  getUserVideosPosts,
  toggleLike,
  toggleSave,
} from ".";
import { toast } from "react-toastify";
import { FolderOrPostProps } from "../folder/type";

const useGetAllPostsQuery = () =>
  useQuery({
    queryKey: ["get-all-posts"],
    queryFn: () => getAllPosts(),
  });

const useGetUserPostsQuery = (postType: string | undefined, userId: string) =>
  useQuery({
    queryKey: ["get-user-posts"],
    queryFn: () => getUserPosts(postType, userId),
    enabled: !!userId,
  });

const useGetUserVideosPostsQuery = (userId: string) =>
  useQuery({
    queryKey: ["get-user-videos-posts"],
    queryFn: () => getUserVideosPosts(userId),
  });

const useGetUserDocsPostsQuery = (userId: string) =>
  useQuery({
    queryKey: ["get-user-docs-posts"],
    queryFn: () => getUserDocsPosts(userId),
  });

const useGetPostByIdQuery = (id: string) =>
  useQuery({ queryKey: ["get-post-by-id"], queryFn: () => getPostById(id) });

const useAddPostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-post"],
    mutationFn: (payload: FolderOrPostProps) => addPost(payload),
    onSuccess() {
      toast.success(`add post successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-user-posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-user-videos-posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-user-docs-posts"],
      });
    },
    onError() {
      toast.error(`failed to add post`);
    },
  });
};
const useEditPostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-post"],
    mutationFn: (payload: FolderOrPostProps) => editPost(payload),
    onSuccess() {
      toast.success(`edit post successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-post-by-id"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-all-posts"],
      });
    },
    onError() {
      toast.error(`failed to edit post`);
    },
  });
};

const useDeletePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-post"],
    mutationFn: (id: string) => deletePost(id),
    onSuccess() {
      toast.success(`delete post successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-user-posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-all-posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-user-videos-posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-user-docs-posts"],
      });
    },
    onError() {
      toast.error(`failed to delete post`);
    },
  });
};

const useGetPostCommentsQuery = (id: string | undefined) =>
  useQuery({
    queryKey: ["get-post-comments"],
    queryFn: () => getPostComments(id),
    enabled: !!id,
  });

const useAddCommentMutaion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-comment"],
    mutationFn: (payload: AddCommentInputProps) => addComment(payload),
    onSuccess() {
      toast.success(`add comment successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-user-posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-all-posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-user-videos-posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-user-docs-posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-post-comments"],
      });
    },
    onError() {
      toast.error(`failed to add comment`);
    },
  });
};

const useToggleLikeMutaion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["toggle-Like"],
    mutationFn: (id: string | undefined) => toggleLike(id),
    onSuccess() {
      // toast.success(`add Like successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-user-posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-all-posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-user-videos-posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-user-docs-posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-user-liked-posts"],
      });
    },
    onError() {
      // toast.error(`failed to add like`);
    },
  });
};

const useToggleSaveMutaion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["toggle-save"],
    mutationFn: (id: string | undefined) => toggleSave(id),
    onSuccess() {
      // toast.success(`add Like successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-user-posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-all-posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-user-videos-posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-user-docs-posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-user-saved-posts"],
      });
    },
    onError() {
      // toast.error(`failed to add like`);
    },
  });
};

export {
  useAddPostMutation,
  useGetUserPostsQuery,
  useAddCommentMutaion,
  useGetPostCommentsQuery,
  useToggleLikeMutaion,
  useEditPostMutation,
  useGetPostByIdQuery,
  useDeletePostMutation,
  useToggleSaveMutaion,
  useGetUserDocsPostsQuery,
  useGetUserVideosPostsQuery,
  useGetAllPostsQuery,
};
