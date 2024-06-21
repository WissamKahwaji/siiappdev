const AUTH = {
  SIGN_IN: "/users/signin",
  SIGN_UP: "/users/signUp",
  FORGET_PASSWORD: "/users/forget-password",
  RESET_PASSWORD: (token: string) => `/users/reset-password/${token}`,
  DELETE_ACCOUNT: "/users/delete-account",
};

const POST = {
  GET_ALL: "/post",
  GET_BY_USER: (postType: string | undefined, userId: string) =>
    `/post/user-posts/${userId}?type=${postType}`,
  GET_VIDEOS_POSTS: (userId: string) => `/post/user-videos-posts/${userId}`,
  GET_DOCS_POSTS: (userId: string) => `/post/user-docs-posts/${userId}`,
  ADD: "/post/create",
  EDIT: (id: string | undefined) => `/post/edit/${id}`,
  DELETE: (id: string | undefined) => `/post/delete/${id}`,
  GET_COMMENTS: (id: string | undefined) => `/post/${id}/comments`,
  ADD_COMMENT: (id: string | undefined) => `/post/${id}/add-comment`,
  TOGGLE_LIKE: (id: string | undefined) => `/post/${id}/toggleLike`,
  TOGGLE_SAVE: (id: string | undefined) => `/post/${id}/toggle-save-post`,
  BY_ID: (id: string) => `/post/${id}`,
};

const SII_CARD = {
  ADD: "/sii-card/add",
  GET_USER_CARD: "/sii-card/user-card",
  EDIT_CARD: "/sii-card/edit",
};

const USER = {
  BYID: "/users/ById",
  EDIT: "/users/edit-profile",
  GET_LIKED_POSTS: "/users/user-liked-posts",
  GET_SAVED_POSTS: "/users/user-saved-posts",
  GET_BY_USERNAME: (userName: string) => `/users/by-userName/${userName}`,
  GET_BY_USERCATEGORY: (userCategory: string) =>
    `/users/userCategory/${userCategory}`,
  GET_FOLLOWERS: "/users/user-followers",
  GET_FOLLOWINGS: "/users/user-followings",
  USER_SEARCH: (query: string) => `users/search?query=${query}`,

  TOGGLE_FOLLOW: (id: string | undefined) => `/users/toggle-follow/${id}`,
  SIGNUP_WITH_ADD: "/users/signUpWithAdd",
  USER_ACCOUNTS: "/users/user-accounts",
  SWITCH_ACCOUNT: "/users/switchAccount",
};

const FOLDER = {
  GET_USER_FOLDERS: (userId: string) => `/folders/user-folders/${userId}`,
  GET_BY_ID: (id: string) => `/folders/by-id/${id}`,
  CREATE_FOLDER: "/folders/add-folder",
  UPDATE_FOLDER: (id: string | undefined) => `/folders/update/${id}`,
  DELETE: (id: string | undefined) => `/folders/delete/${id}`,
};

const PRIVACY_POLICY = {
  GET: "/privacy-policy",
};

const INFO_HELP = {
  GET: "/info-help",
};

const API_ROUTES = {
  AUTH,
  USER,
  POST,
  SII_CARD,
  FOLDER,
  PRIVACY_POLICY,
  INFO_HELP,
};
export default API_ROUTES;
