import * as express from "express";
import { PrismaClient } from '@prisma/client'
const {user} = new PrismaClient()
let userRouter = express.Router();
userRouter.get('/', async (req,res)=>{
   const users = await user.findMany({
       select:{
           username: true,
           posts: true
       },
   })
   res.json(users)
})

userRouter.post('/', async(req, res) => {
    const { username } = req.body
    const userExists = await user.findUnique({
        where:{
            username: username
        },
        select:{
            username: true
        }
    })
    if(userExists){
        return res.status(400).json({
            message: "user already exists"
        })
    }
    const createUser = await user.create({
        data:{
            username: username
        },
        select:{
            username:true
        }
    })
    res.json(createUser)
})

export default userRouter;