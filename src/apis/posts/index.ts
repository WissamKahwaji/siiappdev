import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import {
  AddCommentInputProps,
  CommentModel,
  PostInputProps,
  PostModel,
} from "./type";

const getAllPosts = async () => {
  const res = await publicInstance.get<PostModel[]>(API_ROUTES.POST.GET_ALL);
  return res.data;
};

const getUserPosts = async (postType: string | undefined, userId: string) => {
  const res = await publicInstance.get<PostModel[]>(
    API_ROUTES.POST.GET_BY_USER(postType, userId)
  );
  return res.data;
};
const getUserVideosPosts = async (userId: string) => {
  const res = await publicInstance.get<PostModel[]>(
    API_ROUTES.POST.GET_VIDEOS_POSTS(userId)
  );
  return res.data;
};
const getUserDocsPosts = async (userId: string) => {
  const res = await publicInstance.get<PostModel[]>(
    API_ROUTES.POST.GET_DOCS_POSTS(userId)
  );
  return res.data;
};

const getPostById = async (id: string) => {
  const res = await publicInstance.get<PostModel>(API_ROUTES.POST.BY_ID(id));
  return res.data;
};

const addPost = async (payload: PostInputProps) => {
  const { ...rest } = payload;
  const data = createFormData({ ...rest });
  const res = await publicInstance.post(API_ROUTES.POST.ADD, data);
  return res.data;
};

const editPost = async (payload: PostInputProps) => {
  const { ...rest } = payload;
  const data = createFormData({ ...rest });
  const res = await publicInstance.put(API_ROUTES.POST.EDIT(payload._id), data);
  return res.data;
};

const deletePost = async (id: string) => {
  const res = await publicInstance.delete(API_ROUTES.POST.DELETE(id));
  return res.data;
};

const getPostComments = async (id: string | undefined) => {
  const res = await publicInstance.get<CommentModel[]>(
    API_ROUTES.POST.GET_COMMENTS(id)
  );
  return res.data;
};

const addComment = async (payload: AddCommentInputProps) => {
  const data = createFormData(payload!);
  const res = await publicInstance.post(
    API_ROUTES.POST.ADD_COMMENT(payload.postId),
    data
  );
  return res.data;
};

const toggleLike = async (id: string | undefined) => {
  const res = await publicInstance.put(API_ROUTES.POST.TOGGLE_LIKE(id));
  return res.data;
};
const toggleSave = async (id: string | undefined) => {
  const res = await publicInstance.put(API_ROUTES.POST.TOGGLE_SAVE(id));
  return res.data;
};

export {
  addPost,
  getUserPosts,
  addComment,
  getPostComments,
  toggleLike,
  editPost,
  getPostById,
  deletePost,
  toggleSave,
  getUserDocsPosts,
  getUserVideosPosts,
  getAllPosts,
};
