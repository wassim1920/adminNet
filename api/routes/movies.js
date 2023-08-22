import express from "express";
import { CreateMovie, DeleteMovie, GetAllMovies, GetMovie, GetMovieCount, GetRandom, UpdateMovie } from "../controllers/movies.js";

const router = express.Router(); 
// createMovie
router.post("/new",   CreateMovie);
// random movie
router.get("/random",   GetRandom);
// MovieCount
router.get("/count",  GetMovieCount);
//Update
router.put("/:id",  UpdateMovie);
//delete
router.delete("/:id", DeleteMovie);
//GET
router.get("/:id", GetMovie);
//GETAll
router.get("/", GetAllMovies);

export default router 