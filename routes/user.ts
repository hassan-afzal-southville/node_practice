import * as express from "express";
import { PrismaClient } from '@prisma/client'
const {user} = new PrismaClient()
let userRouter = express.Router();
import userController from "../controllers/userController"
// {getAllUsers,createUser, updateUser,deleteUser }
// index
userRouter.get('/', userController.getAllUsers);

// update
userRouter.put('/:user_id',userController.updateUser )

// create
userRouter.post('/', userController.createUser)

// dalete
userRouter.delete('/:user_id',userController.deleteUser)

export default userRouter;