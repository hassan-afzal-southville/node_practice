import * as express from "express";
import { PrismaClient } from '@prisma/client'
const {user, post} = new PrismaClient()
let postRouter = express.Router();

postRouter.post('/', async(req, res) => {
    const  postObj = req.body.post
    const userExists = await user.findUnique({
        where:{
            username: postObj.user_id
        }
    })
    if(userExists){
    const createPost = await post.create({
        data:{
            title: postObj.title,
            post: postObj.post,
            user_id: postObj.user_id
        },
    })
    return res.json(createPost)
    }
    res.status(400).json({
        message: "Something went Wrong"
    })
})

export default postRouter;