import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signIn, signUp } from ".";
import { SignInValues, SignUpValues } from "./type";
import { useNavigate } from "react-router-dom";

const useSignInMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: (data: SignInValues) => signIn(data),
    onSuccess: data => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.result._id);
      localStorage.setItem("userName", data.result.userName);
      navigate(`/${data.result.userName}`, { replace: true });
    },
    onError: () => {
      toast.error("failed to sign in please enter correct email or password");
    },
  });
};

const useSignUpMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["sign-up"],
    mutationFn: (data: SignUpValues) => signUp(data),
    onSuccess: data => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.result._id);
      localStorage.setItem("userName", data.result.userName);
      navigate("/account", { replace: true });
    },
    onError: data => {
      toast.error(data.message);
    },
  });
};

export { useSignInMutation, useSignUpMutation };
