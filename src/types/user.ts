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

export type PurchaseResponseHttp = {
  message: string;
};
export type Purchase = {
  name: string;
  amount: number;
  userID?: string;
};

export type PurchaseType = {
  _id: string;
  userId: string;
  name: string;
  amount: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};

export type CurrentPurchaseResponseHttp = {
  item: PurchaseType[];
  message: string;
};

export type UpdatedPurchaseResponseHttp = {
  item: PurchaseType[];
  message: string;
};

export type EditType = {
  name: string;
  amount: number;
  id: string;
};
