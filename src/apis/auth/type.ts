export type SignInValues = { email: string; password: string };

export type SignUpValues = {
  email: string;
  password: string;
  userName: string;
  fullName: string;
  confirmPassword: string;
};

export type ResetPasswordParams = {
  password: string;
  token: string;
  confirmPassword: string;
};

export type ForgetPasswordParams = {
  email: string;
};
