import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import { qrCodeModel } from "./type";

const getUserQrCode = async (userName: string) => {
  const res = await publicInstance.get<qrCodeModel>(
    API_ROUTES.QRCODE.GET_BY_USERNAME(userName)
  );
  return res.data;
};

const editUserQrCode = async (payload: qrCodeModel) => {
  const { ...rest } = payload;
  const data = createFormData({ ...rest });
  const res = await publicInstance.post(API_ROUTES.QRCODE.ADD_EDIT, data);
  return res.data;
};

export { getUserQrCode, editUserQrCode };
