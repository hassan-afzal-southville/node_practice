import { currentUserInterface } from './user';
import { Request } from 'express';
export interface currentUserRequest extends Request {
  currentUser?: currentUserInterface;
}
