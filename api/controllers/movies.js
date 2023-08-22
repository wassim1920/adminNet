import Movie from "../models/Movie.js";


export const CreateMovie = async (req , res , next)=>{
    try{
        const newMovie = new Movie({
            ...req.body
        })
        await newMovie.save();
        res.status(201).json("Movie has been created");
    }catch(err){
        next(err)
    }
}


export const UpdateMovie = async (req,res,next)=>{
    try{
        const updateMovie = await Movie.findByIdAndUpdate(req.params.id , {$set: req.body} ,{new : true});
        res.status(200).json(updateMovie);
    }catch (err) {
       next(err);
    }
}

export const DeleteMovie = async (req,res,next)=>{
    try{
        const deleteMovie = await Movie.findByIdAndDelete(req.params.id);
        res.status(200).json("Movie has been deleted!");
    }catch (err) {
       next(err);
    }
}

export const GetMovie = async (req,res,next)=>{
    try{
        const getMovie = await Movie.findById(req.params.id);
        res.status(200).json(getMovie);
    }catch (err) {
        next(err);
    }
}

export const GetAllMovies = async (req,res,next)=>{
    const query = req.query.new;
    try{
        const getAllMovie = query ? await Movie.find().sort({_id:-1}).limit(5) : await Movie.find();
        res.status(200).json(getAllMovie)
    }catch(err) {
        next(err);
    }
}

// API endpoint to get the Movie count
export const GetMovieCount = async (req, res, next) => {
    try {
      const MovieCount = await Movie.countDocuments();
      res.status(200).json({ count: MovieCount });
    } catch (err) {
      next(err);
    }
  };

  // Random

  export const GetRandom = async (req , res ,next)=>{
   const type = req.query.type;
   let movie;
    try{
        if (type === "series"){
            movie = await Movie.aggregate([
                { $match: {isSeries: true}},
                { $sample: {size : 1}},
            ])
        }else{
            movie = await Movie.aggregate([
                { $match: {isSeries: false}},
                { $sample: {size : 1}},
            ])
        }
        res.status(200).json(movie);
    }catch(err){
        next(err)
    }
  }