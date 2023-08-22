import express from "express";

import { CreateList, DeleteList, GetAllLists, GetListCount, RandomList, UpdateList } from "../controllers/lists.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/new" ,   CreateList);
// random List
router.get("/random-list",   RandomList);
// ListCount
router.get("/count",  GetListCount);
//Update
router.put("/:id",   UpdateList);
//delete
router.delete("/:id",  DeleteList);
//GET
router.get("/:id",  GetListCount);
//GETAll
router.get("/",  GetAllLists);
export default router