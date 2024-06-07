import { PostModel } from "../posts/type";

export type UserModel = {
  _id: string;
  userName: string;
  fullName: string;
  email: string;
  bio?: string | null;
  followings: [string];
  followers: [string];
  posts: [string];
  savedPosts: [string];
  likedPosts: [string];
  profileImage?: string;
  mobileNumber?: string;
  siiCard?: string;
  userCategory?: string | undefined;
  isBusiness?: boolean;
  userAbout?: {
    aboutUs?: string;
    ourMission?: string;
    ourVision?: string;
  };
  socialMedia?: {
    webSite?: string;
    whatsApp?: string;
    faceBook?: string;
    linkedIn?: string;
    instagram?: string;
    threads?: string;
    snapChat?: string;
    youtube?: string;
    tiktok?: string;
    painterest?: string;
    xPlatform?: string;
    otherLink?: string;
  };
};

export type EditProfileProps = {
  fullName: string;
  userName: string;
  mobileNumber: string;
  bio?: string | null;
  profileImage?: File | undefined;
  userAbout?: {
    aboutUs: string;
    ourMission: string;
    ourVision: string;
  };
  userCategory?: string | undefined;
  isBusiness?: boolean;
  socialMedia?: {
    webSite: string;
    whatsApp: string;
    faceBook: string;
    linkedIn: string;
    instagram: string;
    threads: string;
    snapChat: string;
    youtube: string;
    tiktok: string;
    painterest: string;
    xPlatform: string;
    otherLink: string;
  };
};

export type SearchResult = {
  users: UserModel[];
  posts: PostModel[];
  query: string;
};
