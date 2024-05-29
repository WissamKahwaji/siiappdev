export type SiiCardModel = {
  _id?: string | undefined;
  fullName: string;
  email: string;
  mobileNumber: string;
  userName?: string | undefined;
  qrCode?: string | undefined;
};

export type EditCardParams = {
  email: string;
  mobileNumber: string;
};
