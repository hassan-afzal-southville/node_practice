import { NextFunction,Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
const {token,user} = new PrismaClient()

const authentication =  async (req: Request, res :Response, next :NextFunction) => {
    let barerToken: string = "";
    if (req.headers["authorization"]){
        barerToken = req.headers["authorization"].split('Bearer ')[1]
    }
    const validateToken = await token.findFirst({
        where: {
            uuid: barerToken
        },
    })
    if (!validateToken){
       return res.json({message: "email or password is invalid"})
    }
    const logedInUser = await user.findFirst({
        where: {
            id: validateToken.user_id
        },
    })
    req.user = logedInUser;
    next()
}
    
export default { authentication };