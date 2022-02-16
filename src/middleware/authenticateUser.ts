import { PrismaClient } from '@prisma/client'
const {token} = new PrismaClient()

const authentication =  async (req :any, res :any, next :any) => {
    const barearToken = req.headers["authorization"].split('Bearer ')[1]
    const validateToken = await token.findFirst({
        where: {
            uuid: barearToken
        },
    })
    if (!validateToken){
       return res.json({message: "email or password is invalid"})
    }
    next()
}
    
export default { authentication };