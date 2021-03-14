export interface IFriendship {
  id: number;
  fromUser: number;
  toUser: number;
  status: string;
  createdDate: Date;
  updatedDate: Date;
}
