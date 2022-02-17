import { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';
import {
  postCreateRequestData,
  postCreateResponseData,
} from '../interfaces/post';
const { post, token } = new PrismaClient();

// create
const createPost = async (req: Request, res: Response) => {
  const postObj: postCreateRequestData = req.body.post;
  const postData: postCreateResponseData = await post.create({
    data: {
      title: postObj.title,
      post: postObj.post,
      user_id: req.user.id,
    },
    select: {
      title: true,
      post: true,
      user_id: true,
    },
  });
  if (postData) {
    return res.json(postData);
  }
  res.status(400).json({
    message: 'Something went Wrong',
  });
};
export default { createPost };
