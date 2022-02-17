import { PrismaClient } from '@prisma/client';
const { user, token } = new PrismaClient();
import { uuid } from 'uuidv4';
import bcrypt from 'bcrypt';
import { Response, Request } from 'express';
import { generateTokenInterface, userInterface } from '../interfaces/user';
// types

type Token = {
  uuid: string;
};

const getUserToken = async (req: Request, res: Response) => {
  const userObj: generateTokenInterface = req.body.user;
  if (!userObj.username || !userObj.password) {
    return res.json({ message: 'password or user name is missing' });
  }
  const userExists: userInterface = await user.findUnique({
    where: {
      username: userObj.username,
    },
  });
  if (!userExists) {
    return res.json({ message: 'User not present?' });
  }
  bcrypt.compare(userObj.password, userExists.password, function (err, result) {
    if (result == true) {
      generateToken();
    } else {
      return res.json({ message: 'Email or password is invalid' });
    }
  });
  const generateToken = async () => {
    const userToken: Token = await token.create({
      data: {
        uuid: uuid(),
        user_id: userExists.id,
      },
      select: {
        uuid: true,
      },
    });
    return res.json({
      message: 'Token created Successfully',
      token: userToken.uuid,
    });
  };
};

export default { getUserToken };
