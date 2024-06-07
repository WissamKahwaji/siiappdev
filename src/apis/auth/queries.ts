import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signIn, signUp } from ".";
import { SignInValues, SignUpValues } from "./type";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const useSignInMutation = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: (data: SignInValues) => signIn(data),
    onSuccess: data => {
      localStorage.setItem("token", data.token);
      login(data.token);
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
  const { login } = useAuth();
  return useMutation({
    mutationKey: ["sign-up"],
    mutationFn: (data: SignUpValues) => signUp(data),
    onSuccess: (data, variables) => {
      localStorage.setItem("token", data.token);
      login(data.token);
      localStorage.setItem("userId", data.result._id);
      localStorage.setItem("userName", data.result.userName);
      localStorage.setItem("email", variables.email);
      localStorage.setItem("password", variables.password);
      navigate(`/${data.result.userName}`, { replace: true });
    },
    onError: () => {
      toast.error("User already exist, change username or email");
    },
  });
};

export { useSignInMutation, useSignUpMutation };
