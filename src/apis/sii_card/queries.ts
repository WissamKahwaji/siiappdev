import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addSiiCard, editSiiCard, getUserSiiCard } from ".";
import { EditCardParams, SiiCardModel } from "./type";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useGetUserSiiCardQuery = () =>
  useQuery({
    queryKey: ["get-user-card"],
    queryFn: () => getUserSiiCard(),
  });

const useAddSiiCardMutaion = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-sii-card"],
    mutationFn: (payload: SiiCardModel) => addSiiCard(payload),
    onSuccess() {
      toast.success(`add sii-card successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-user-byId"],
      });

      navigate(`/sii-card`, { replace: true });
    },
    onError() {
      toast.error(`failed to add sii-card`);
    },
  });
};

const useEditSiiCardMutaion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-sii-card"],
    mutationFn: (payload: EditCardParams) => editSiiCard(payload),
    onSuccess() {
      toast.success(`edit sii-card successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-user-card"],
      });
    },
    onError() {
      toast.error(`failed to edit sii-card`);
    },
  });
};

export { useGetUserSiiCardQuery, useAddSiiCardMutaion, useEditSiiCardMutaion };
