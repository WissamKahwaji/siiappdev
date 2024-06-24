import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editUserQrCode, getUserQrCode } from ".";
import { useNavigate } from "react-router-dom";
import { qrCodeModel } from "./type";
import { toast } from "react-toastify";

const useGetUserQrCodeQuery = (userName: string) =>
  useQuery({
    queryKey: ["get-user-qrcdeo"],
    queryFn: () => getUserQrCode(userName),
  });

const useEditUserQrCodeMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-user-qrcode"],
    mutationFn: (payload: qrCodeModel) => editUserQrCode(payload),
    onSuccess() {
      toast.success(`edit qrCode successfully.`);
      queryClient.invalidateQueries({ queryKey: ["get-user-qrcdeo"] });
      navigate(-1);
    },
    onError() {
      toast.error(`failed to edit`);
    },
  });
};

export { useGetUserQrCodeQuery, useEditUserQrCodeMutation };
