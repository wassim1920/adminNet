import express from "express";
import dotenv from "dotenv" ; 
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import moviesRoute from "./routes/movies.js"
import listsRoute from "./routes/lists.js"
// import mailRoute from "./routes/mail.js"
// import cookieParser from "cookie-parser";
import cors from "cors";




const app = express()
dotenv.config()

const connect = async ()=>{
try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to mongodb")
} catch (error) {
   throw error
}
};
mongoose.connection.on("disconnected" , ()=>{
    console.log("mongodb disconnected")
})

// middlewares
app.use(cors());
// app.use(cookieParser()); 
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute); 
app.use("/api/movies", moviesRoute);
app.use("/api/lists", listsRoute);
// app.use("/api/mail", mailRoute)

app.use((err, req, res ,next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || (" something went wrong! ");
    return res.status(errorStatus).json({
        success: false,
        status : errorStatus,
        message : errorMessage,
        stack : err.stack,
    });
});

// app.get("/", (req,res)=>{
//     res.send("first request")
// })
app.listen(1920 , ()=>{
    connect()
    console.log("connected .")
})