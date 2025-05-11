export type User = {
  username: string;
  password: string;
};

export type UserResponseHttp = {
  id: string;
  username: string;
  message: string;
  accessToken: string;
};
