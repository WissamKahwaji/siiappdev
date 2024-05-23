import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addSiiCard, getUserSiiCard } from ".";
import { SiiCardModel } from "./type";
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

      navigate("/account", { replace: true });
    },
    onError() {
      toast.error(`failed to add sii-card`);
    },
  });
};

export { useGetUserSiiCardQuery, useAddSiiCardMutaion };
