import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import { EditCardParams, SiiCardModel } from "./type";

const getUserSiiCard = async () => {
  const res = await publicInstance.get<SiiCardModel>(
    API_ROUTES.SII_CARD.GET_USER_CARD
  );
  return res.data;
};

const addSiiCard = async (payload: SiiCardModel) => {
  const { ...rest } = payload;
  const data = createFormData({ ...rest });
  const res = await publicInstance.post(API_ROUTES.SII_CARD.ADD, data);
  return res.data;
};
const editSiiCard = async (payload: EditCardParams) => {
  const { ...rest } = payload;
  const data = createFormData({ ...rest });
  const res = await publicInstance.put(API_ROUTES.SII_CARD.EDIT_CARD, data);
  return res.data;
};

export { getUserSiiCard, addSiiCard, editSiiCard };
