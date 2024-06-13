import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addFolder,
  deleteFolder,
  editFolder,
  getFolderById,
  getUserFolders,
} from ".";
import { FolderOrPostProps } from "./type";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useGetUserFoldersQuery = (userId: string) =>
  useQuery({
    queryKey: ["get-user-folders"],
    queryFn: () => getUserFolders(userId),
    enabled: !!userId,
  });

const useGetFolderByIdQuery = (id: string) =>
  useQuery({
    queryKey: ["get-folder-by-id"],
    queryFn: () => getFolderById(id),
  });

const useAddFolderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-folder"],
    mutationFn: (payload: FolderOrPostProps) => addFolder(payload),
    onSuccess() {
      toast.success("add Folder Successfully");
      queryClient.invalidateQueries({
        queryKey: ["get-user-folders"],
      });
    },
    onError() {
      toast.error(`failed to add folder`);
    },
  });
};
const useEditFolderMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-folder"],
    mutationFn: (payload: FolderOrPostProps) => editFolder(payload),
    onSuccess() {
      navigate(-1);
      toast.success("edit Folder Successfully");
      queryClient.invalidateQueries({
        queryKey: ["get-user-folders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-folder-by-id"],
      });
    },
    onError() {
      toast.error(`failed to edit folder`);
    },
  });
};

const useDeleteFolderMutation = (userName: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-folder"],
    mutationFn: (id: string) => deleteFolder(id),
    onSuccess() {
      toast.success(`delete folder successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-user-folders"],
      });
      navigate(`/${userName}`);
    },
    onError() {
      toast.error(`failed to delete folder`);
    },
  });
};

export {
  useGetUserFoldersQuery,
  useGetFolderByIdQuery,
  useAddFolderMutation,
  useEditFolderMutation,
  useDeleteFolderMutation,
};
