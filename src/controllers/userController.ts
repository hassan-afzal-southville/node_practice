import { PrismaClient } from '@prisma/client';
const { user } = new PrismaClient();
import bcrypt from 'bcrypt';
const saltRounds = 10;
import { Response, Request } from 'express';
import { userInterface } from '../interfaces/user';
// index
const getAllUsers = async (req: Request, res: Response) => {
  const users: userInterface[] = await user.findMany({
    select: {
      username: true,
      posts: {
        select: {
          title: true,
          post: true,
          user_id: true,
        },
      },
      id: true,
    },
  });
  res.json(users);
};

// update
const updateUser = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const userObj = req.body.user;
  const userExists = await user.findUnique({
    where: {
      id: parseInt(user_id),
    },
  });
  if (!userExists) {
    return res.json({ message: 'User not present?' });
  }
  if (!userObj.username && !userObj.password) {
    return res.json({ message: 'Username or password not present?' });
  }
  const existsUsername = await user.findUnique({
    where: {
      username: userObj.username,
    },
  });
  if (existsUsername && existsUsername.username !== userObj.username) {
    return res.json({ message: 'Username already present?' });
  }
  bcrypt.hash(userObj.password, saltRounds, function (err, hash) {
    if (err) {
      return res.json({ message: 'something went wrong' });
    }
    userUpdate(hash);
  });
  const userUpdate = async (hash: any) =>
    await user.update({
      where: {
        id: parseInt(user_id),
      },
      data: {
        username: userObj.username,
        password: hash,
      },
      select: {
        id: true,
        username: true,
        password: true,
      },
    });
  res.json({ message: 'User Update successfully' });
};

// create
const createUser = async (req: Request, res: Response) => {
  const userObj = req.body.user;
  if (!userObj.username || !userObj.password) {
    return res.json({ message: 'password or user name is missing' });
  }
  const userExists = await user.findUnique({
    where: {
      username: userObj.username,
    },
  });
  if (userExists) {
    return res.status(400).json({
      message: 'user already exists',
    });
  }
  bcrypt.hash(userObj.password, saltRounds, function (err, hash) {
    if (err) {
      return res.json({ message: 'something went wrong' });
    }
    userData(hash);
  });

  const userData = async (hash: any) => {
    await user.create({
      data: {
        username: userObj.username,
        password: hash,
      },
      select: {
        username: true,
        password: true,
      },
    });
  };
  res.json({ message: 'User Created Successully' });
};

// dalete
const deleteUser = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const userExists = await user.findUnique({
    where: {
      id: parseInt(user_id),
    },
  });
  if (!userExists) {
    return res.json({ message: 'User not present?' });
  }
  const userDelete = await user.delete({
    where: {
      id: parseInt(user_id),
    },
  });
  if (userDelete) {
    return res.json({ message: 'user deleted successfully' });
  }
  res.json({ message: 'something went wrong' });
};

export default { getAllUsers, createUser, updateUser, deleteUser };
