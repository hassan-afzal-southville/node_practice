// imports pakages
import express from "express";
import dotenv from "dotenv";
import * as routes from "./src/routes";
// express
const app = express();
// dotenv 
dotenv.config();
// json
app.use(express.json())
routes.allRoutes( app );
// start the Express server
app.listen( process.env.SERVER_PORT, () => {
    console.log( `server started at http://localhost:${ process.env.SERVER_PORT }` );
} );
