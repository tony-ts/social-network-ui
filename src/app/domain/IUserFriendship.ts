import {FriendFullInfo} from './FriendFullInfo';

export interface IUserFriendship {
  id: number;
  user: FriendFullInfo;
  status: string;
  createdDate: Date;
  updatedDate: Date;
}
