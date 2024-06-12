import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import {
  ForgetPasswordParams,
  ResetPasswordParams,
  SignInValues,
  SignUpValues,
} from "./type";

const signIn = async (data: SignInValues) => {
  const res = await publicInstance.post(API_ROUTES.AUTH.SIGN_IN, data);
  return res.data;
};

const signUp = async (data: SignUpValues) => {
  const res = await publicInstance.post(API_ROUTES.AUTH.SIGN_UP, data);
  return res.data;
};

const forgetPassword = async (data: ForgetPasswordParams) => {
  const res = await publicInstance.post(API_ROUTES.AUTH.FORGET_PASSWORD, data);
  return res.data;
};

const resetPassword = async (data: ResetPasswordParams) => {
  const res = await publicInstance.put(
    API_ROUTES.AUTH.RESET_PASSWORD(data.token),
    data
  );
  return res.data;
};

export { signIn, signUp, forgetPassword, resetPassword };
