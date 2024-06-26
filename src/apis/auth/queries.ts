import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  deleteUserAccount,
  forgetPassword,
  resetPassword,
  signIn,
  signUp,
} from ".";
import {
  ForgetPasswordParams,
  ResetPasswordParams,
  SignInValues,
  SignUpValues,
} from "./type";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const useSignInMutation = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: (data: SignInValues) => signIn(data),
    onSuccess: (data, variables) => {
      localStorage.setItem("token", data.token);
      login(data.token);
      localStorage.setItem("userId", data.result._id);
      localStorage.setItem("userName", data.result.userName);
      localStorage.setItem("email", variables.email);
      // localStorage.setItem("password", variables.password);
      localStorage.setItem("profileImage", data.result.profileImage);
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
      // localStorage.setItem("password", variables.password);
      localStorage.setItem("profileImage", data.profileImage);

      navigate(`/${data.result.userName}`, { replace: true });
    },
    onError: () => {
      toast.error("User already exist, change username or email");
    },
  });
};

const useForgetPasswordMutation = () => {
  return useMutation({
    mutationKey: ["forget-password"],
    mutationFn: (data: ForgetPasswordParams) => forgetPassword(data),
    onSuccess: data => {
      console.log(data);
      toast.success(`success, Open Your mail box`);
    },
    onError: () => {
      toast.error("Error , Please try again later");
    },
  });
};

const useResetPasswordMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["reset-password"],
    mutationFn: (data: ResetPasswordParams) => resetPassword(data),
    onSuccess: () => {
      toast.success(`success`);
      navigate("/login", { replace: true });
    },
    onError: () => {
      toast.error("Error , Please try again later");
    },
  });
};

const useDeleteUserAccountMutation = () => {
  return useMutation({
    mutationKey: ["delete-user-account"],
    mutationFn: () => deleteUserAccount(),
    onSuccess: () => {
      toast.success(`success`);
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("profileImage");

      window.location.href = "/login";
    },
    onError: () => {
      toast.error("Error , Please try again later");
    },
  });
};

export {
  useSignInMutation,
  useSignUpMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useDeleteUserAccountMutation,
};
