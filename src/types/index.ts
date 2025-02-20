export type UserTreeType = {
  id: number;
  name: string;
  children: UserTreeType[];
};

export type LoadingType = {
  edit: boolean;
  add: boolean;
  delete: boolean;
  get: boolean;
};
