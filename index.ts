// imports pakages
import express from "express";
import dotenv from "dotenv";
// import from directories
import userRouter from "./routes/user";
import postRouter from "./routes/post";
// express
const app = express();
// dotenv 
dotenv.config();
// json
app.use(express.json())
// define a routes
app.use('/api/v1/users', userRouter)
app.use('/api/v1/posts', postRouter)



// start the Express server
app.listen( process.env.SERVER_PORT, () => {
    console.log( `server started at http://localhost:${ process.env.SERVER_PORT }` );
} );