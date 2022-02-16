import { PrismaClient } from '@prisma/client'
const {post, token} = new PrismaClient()

// create
    const createPost = async (req: any, res: any) => {
        const  postObj = req.body.post
        const barearToken = req.headers["authorization"].split('Bearer ')[1]
        const logedInUser = await token.findFirst({
            where: {
                uuid: barearToken
            },
        })
        if(!logedInUser){
            return res.status(400).json({
                message: "Something went Wrong"
            })
        }
        const postData = await post.create({
        data:{
            title: postObj.title,
            post: postObj.post,
            user_id: logedInUser.user_id
        },
        })
        if(postData){
            return res.json(postData)
        }
        res.status(400).json({
        message: "Something went Wrong"
        })
}
export default { createPost };
