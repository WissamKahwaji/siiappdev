export type PostModel = {
  _id: string;
  owner: {
    _id: string;
    fullName: string;
    profileImage: string;
    userName: string;
  };
  images: string[];
  caption: string;
  comments?: CommentModel[];
  likes?: string[];
  saves?: string[];
  link?: string | undefined;
  whatsAppNumber?: string | undefined;
  mobileNumber?: string | undefined;
  tags?: string[] | undefined;
  postType?: string | undefined;
  postVideo?: string | undefined;
  postDocs?: string | undefined;
};

export type PostInputProps = {
  _id?: string;
  caption: string;
  postImages?: File[];
  link?: string | undefined;
  whatsAppNumber?: string | undefined;
  mobileNumber?: string | undefined;
  tags?: string[] | undefined;
  postType?: string | undefined;
  postVideo?: string | undefined;
  postDocs?: string | undefined;
};

export type CommentModel = {
  _id: string;
  user: {
    _id: string;
    fullName: string;
    profileImage: string;
  };
  post: string;
  text: string;
};

export type AddCommentInputProps = {
  text: string;
  postId?: string | undefined;
};
