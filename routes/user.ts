import * as express from "express";
import { PrismaClient } from '@prisma/client'
const {user} = new PrismaClient()
let userRouter = express.Router();

// index
userRouter.get('/', async (req,res)=>{
   const users = await user.findMany({
       select:{
           username: true,
           posts: true,
           id: true
       },
   })
   res.json(users)
})

// update
userRouter.put('/:user_id', async (req,res)=>{
    const { user_id } = req.params
    const { username } = req.body
    const userExists = await user.findUnique({
        where:{
            id: parseInt(user_id),
        },
    })
    if(!userExists){
        return  res.json({message: "User not present?"})
    }
    const userUpdate = await user.update({
        where: {
            id: parseInt(user_id),
          },
        data: {
        username: username,
        },
        select: {
            id: true,
            username: true,
        },
    })
    if(userUpdate){
        return  res.json(userUpdate)
    }
    res.json({message: "something went wrong"})
})

// create
userRouter.post('/', async(req, res) => {
    const { username } = req.body
    const userExists = await user.findUnique({
        where:{
            username: username
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

// dalete
userRouter.delete('/:user_id', async (req,res)=>{
    const { user_id } = req.params
    const userExists = await user.findUnique({
        where:{
            id: parseInt(user_id),
        },
    })
    if(!userExists){
        return  res.json({message: "User not present?"})
    }
    const userDelete = await user.delete({
        where: {
            id: parseInt(user_id),
          },
    })
    if(userDelete){
        return  res.json({message: "user deleted successfully"})
    }
    res.json({message: "something went wrong"})
})

export default userRouter;