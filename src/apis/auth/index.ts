import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import { SignInValues } from "./type";

const signIn = async (data: SignInValues) => {
  const res = await publicInstance.post(API_ROUTES.AUTH.SIGN_IN, data);
  return res.data;
};
export { signIn };
