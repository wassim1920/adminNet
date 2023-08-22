import express from "express";
import { login, registre } from "../controllers/auth.js";
import { verifyToken } from "../utils/verifyToken.js";


const router = express.Router(); 

router.post("/registre" , registre);
router.post("/login" , login)



export default router 