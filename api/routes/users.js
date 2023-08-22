import express from "express";
import { DeleteUser, GetAllUsers, GetUser, GetUserCount, GetUserStats, UpdateUser } from "../controllers/user.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router(); 

// userStats
router.get("/stats", verifyToken  , GetUserStats);
// userCount
router.get("/count",verifyToken , GetUserCount);
//Update
router.put("/:id",verifyToken ,  UpdateUser);
//delete
router.delete("/:id",verifyToken, DeleteUser);
//GET
router.get("/:id",verifyToken, GetUser);
//GETAll
router.get("/",verifyToken, GetAllUsers);

export default router 