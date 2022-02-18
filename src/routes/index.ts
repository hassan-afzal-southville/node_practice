import * as express from "express";
// import from directories
import userRouter from "./user";
import postRouter from "./post";
import sessionRouter from "./generateToken";
import authenticateUser from "../middleware/authenticateUser";

// define a routes
export const allRoutes = (app: express.Application) => {
    app.use('/api/v1/users', userRouter)
    app.use('/api/v1/posts',authenticateUser.authentication, postRouter)
    app.use('/api/v1/session', sessionRouter)
}
