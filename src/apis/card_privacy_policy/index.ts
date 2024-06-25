import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import { CardPrivacyPolicyModel } from "./type";

const getCardPrivacyPolicy = async () => {
  const res = await publicInstance.get<CardPrivacyPolicyModel>(
    API_ROUTES.CARD_PRIVACY_POLICY.GET
  );
  return res.data;
};

export { getCardPrivacyPolicy };
