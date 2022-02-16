import * as express from "express";
import { PrismaClient } from '@prisma/client'
const {user, post} = new PrismaClient()
let sessionRouter = express.Router();
import sessionController from "../controllers/sessionController"
// create
sessionRouter.post('/login', sessionController.getUserToken)

export default sessionRouter;

