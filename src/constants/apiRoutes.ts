const AUTH = {
  SIGN_IN: "/users/signin",
  SIGN_UP: "/users/signUp",
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
};

const USER = {
  BYID: "/users/ById",
  EDIT: "/users/edit-profile",
  GET_LIKED_POSTS: "/users/user-liked-posts",
  GET_SAVED_POSTS: "/users/user-saved-posts",
  GET_BY_USERNAEM: (userName: string) => `/users/by-userName/${userName}`,
  TOGGLE_FOLLOW: (id: string | undefined) => `/users/toggle-follow/${id}`,
};

const API_ROUTES = { AUTH, USER, POST, SII_CARD };
export default API_ROUTES;
