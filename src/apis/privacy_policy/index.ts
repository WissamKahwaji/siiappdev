import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import { PrivacyPolicyModel } from "./type";

const getPrivacyPolicy = async () => {
  const res = await publicInstance.get<PrivacyPolicyModel>(
    API_ROUTES.PRIVACY_POLICY.GET
  );
  return res.data;
};

export { getPrivacyPolicy };
