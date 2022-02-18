import { postCreateResponseData } from './post';
export interface currentUserInterface {
  id: number;
  username: string;
}
export interface generateTokenInterface {
  username: string;
  password: string;
}
export interface userInterface {
  id?: number;
  username: string;
  password?: string;
  posts?: postCreateResponseData[];
  created_at?: Date;
  updated_at?: Date;
}

export interface userCreateUpdate {
    username: string;
    password: string;
  }
