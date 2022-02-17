import {currentUserInterface} from "./user"
import { Response, Request } from 'express';
export interface currentUserRequest extends Request {
    currentUser?: currentUserInterface;
  }
// declare global {
//     namespace Express {
//       interface Request {
//         currentUser?: currentUserInterface;
//       }
//     }
//   }