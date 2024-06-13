export type FolderModel = {
  _id: string;
  owner: {
    _id: string;
    fullName: string;
    profileImage: string;
    userName: string;
    isBusiness?: boolean;
  };
  name: string;
  images: string[];
  coverImg?: string;
  caption: string;
  link?: string | undefined;
  whatsAppNumber?: string | undefined;
  mobileNumber?: string | undefined;

  createdAt?: Date;
};

export type FolderInputProps = {
  _id?: string;
  name: string;
  caption: string;
  coverImg?: File | undefined;
  folderImages?: File[];
  link?: string | undefined;
  whatsAppNumber?: string | undefined;
  mobileNumber?: string | undefined;
  removeImages?: string[] | undefined;

  postImages?: File[];

  tags?: string[] | undefined;
  postType?: string | undefined;
  postVideo?: string | undefined;
  postDocs?: string | undefined;
  discountPercentage?: number | undefined;
};

export type FolderOrPostProps = {
  _id?: string;
  name?: string;
  caption: string;
  coverImg?: string | undefined;
  folderImages?: string[];
  link?: string | undefined;
  whatsAppNumber?: string | undefined;
  mobileNumber?: string | undefined;
  removeImages?: string[] | undefined;

  postImages?: File[];

  tags?: string[] | undefined;
  postType?: string | undefined;
  postVideo?: string | undefined;
  postDocs?: string | undefined;
  discountPercentage?: number | undefined;
};
