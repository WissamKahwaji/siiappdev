import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signIn } from ".";
import { SignInValues } from "./type";
const useSignInMutation = () => {
  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: (data: SignInValues) => signIn(data),
    onSuccess: data => {
      localStorage.setItem("token", data.token);
      window.location.replace("/");
    },
    onError: () => {
      toast.error("failed to sign in please enter correct password");
    },
  });
};
export { useSignInMutation };
