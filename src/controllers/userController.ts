import { PrismaClient } from '@prisma/client';
const { user } = new PrismaClient();
import bcrypt from 'bcrypt';
const saltRounds = 10;
import { Response, Request } from 'express';
import { userInterface, userCreateUpdate } from '../interfaces/user';
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
  const user_id :number | string = req.params.user_id;
  const userObj :userCreateUpdate= req.body.user;
  const userExists :userInterface = await user.findUnique({
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
  const existsUsername :userInterface = await user.findUnique({
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
    let updUser :Promise<userInterface> = userUpdate(hash);
    return res.json({ message: 'User Update successfully' , user: updUser});
  });
  const userUpdate = async (hash: string): Promise<userInterface> =>{ 
    const updatedUser :userInterface = await user.update({
      where: {
        id: parseInt(user_id),
      },
      data: {
        username: userObj.username,
        password: hash,
      },
      select: {
        id: true,
        username: true
      },
    });
    return updatedUser
  }
};

// create
const createUser = async (req: Request, res: Response) => {
  const userObj :userCreateUpdate = req.body.user;
  if (!userObj.username || !userObj.password) {
    return res.json({ message: 'password or user name is missing' });
  }
  const userExists :userInterface = await user.findUnique({
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
    let createUs :Promise<userInterface> = userData(hash);
    res.json({ message: 'User Created Successully', user:  createUs});
  });

  const userData = async (hash: string) :Promise<userInterface> => {
    const createdUser :userInterface = await user.create({
      data: {
        username: userObj.username,
        password: hash,
      },
      select: {
        username: true,
        password: true,
      },
    });
    return createdUser
  };
};

// dalete
const deleteUser = async (req: Request, res: Response) => {
  const user_id :number | string = req.params.user_id;
  const userExists :userInterface= await user.findUnique({
    where: {
      id: parseInt(user_id),
    },
  });
  if (!userExists) {
    return res.json({ message: 'User not present?' });
  }
  const userDelete :userInterface= await user.delete({
    where: {
      id: parseInt(user_id),
    },
  });
  if (userDelete) {
    return res.json({ message: 'user deleted successfully', user: userDelete });
  }
  res.json({ message: 'something went wrong' });
};

export default { getAllUsers, createUser, updateUser, deleteUser };
