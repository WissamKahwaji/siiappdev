import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import { InfoHelpModel } from "./type";

const getInfoHelp = async () => {
  const res = await publicInstance.get<InfoHelpModel[]>(
    API_ROUTES.INFO_HELP.GET
  );
  return res.data;
};

export { getInfoHelp };
