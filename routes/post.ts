import * as express from "express";
import { PrismaClient } from '@prisma/client'
const {user, post} = new PrismaClient()
let postRouter = express.Router();
import postController from "../controllers/postController"
// create
postRouter.post('/', postController.createPost)

export default postRouter;