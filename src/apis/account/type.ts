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
  socialMedia?: {
    webSite?: string;
    whatsApp?: string;
    faceBook?: string;
    linkedIn?: string;
    instagram?: string;
    threads?: string;
    snapChat?: string;
    youtube?: string;
  };
};

export type EditProfileProps = {
  fullName: string;
  mobileNumber: string;
  bio?: string | null;
  profileImage?: File | undefined;
  socialMedia?: {
    webSite: string;
    whatsApp: string;
    faceBook: string;
    linkedIn: string;
    instagram: string;
    threads: string;
    snapChat: string;
    youtube: string;
  };
};
