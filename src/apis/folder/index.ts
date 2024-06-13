import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import { FolderOrPostProps, FolderModel } from "./type";

const getUserFolders = async (userId: string) => {
  const res = await publicInstance.get<FolderModel[]>(
    API_ROUTES.FOLDER.GET_USER_FOLDERS(userId)
  );
  return res.data;
};

const getFolderById = async (id: string) => {
  const res = await publicInstance.get<FolderModel>(
    API_ROUTES.FOLDER.GET_BY_ID(id)
  );
  return res.data;
};

const addFolder = async (payload: FolderOrPostProps) => {
  const { ...rest } = payload;
  const data = createFormData({ ...rest });
  const res = await publicInstance.post(API_ROUTES.FOLDER.CREATE_FOLDER, data);
  return res.data;
};
const editFolder = async (payload: FolderOrPostProps) => {
  const { ...rest } = payload;
  const data = createFormData({ ...rest });
  const res = await publicInstance.put(
    API_ROUTES.FOLDER.UPDATE_FOLDER(payload._id),
    data
  );
  return res.data;
};

const deleteFolder = async (id: string) => {
  const res = await publicInstance.delete(API_ROUTES.FOLDER.DELETE(id));
  return res.data;
};

export { getUserFolders, getFolderById, addFolder, editFolder, deleteFolder };
