import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const { token, user } = new PrismaClient();
import { currentUserRequest } from '../interfaces/currentUser';
const authentication = async (
  req: currentUserRequest,
  res: Response,
  next: NextFunction
) => {
  let barerToken: string = '';
  if (req.headers.authorization) {
    barerToken = req.headers.authorization.split('Bearer ')[1];
  }
  const validateToken = await token.findFirst({
    where: {
      uuid: barerToken,
    },
  });
  if (!validateToken) {
    return res.json({ message: 'email or password is invalid' });
  }
  const logedInUser = await user.findFirst({
    where: {
      id: validateToken.user_id,
    },
    select: {
      id: true,
      username: true,
    },
  });
  req.currentUser = logedInUser;
  next();
};
export default { authentication };