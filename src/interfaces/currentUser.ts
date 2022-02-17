import {currentUserInterface} from "./user"
declare global {
    namespace Express {
      interface Request {
        user?: currentUserInterface;
      }
    }
  }