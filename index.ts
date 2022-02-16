// imports pakages
import express from "express";
import dotenv from "dotenv";
// import from directories
import userRouter from "./src/routes/user";
import postRouter from "./src/routes/post";
import sessionRouter from "./src/routes/generateToken";
import authenticateUser from "./src/middleware/authenticateUser";
// express
const app = express();
// dotenv 
dotenv.config();
// json
app.use(express.json())
// define a routes 
app.use('/api/v1/users', userRouter)
app.use('/api/v1/posts',authenticateUser.authentication, postRouter)
app.use('/api/v1/session', sessionRouter)

// start the Express server
app.listen( process.env.SERVER_PORT, () => {
    console.log( `server started at http://localhost:${ process.env.SERVER_PORT }` );
} );
