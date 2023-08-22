import List from "../models/List.js";


export const CreateList = async (req , res , next)=>{
    try{
        const newList = new List({
            ...req.body
        })
        await newList.save();
        res.status(201).json("List has been created");
    }catch(err){
        next(err)
    }
}; 

export const UpdateList = async (req,res,next)=>{
    try{
        const updateList = await List.findByIdAndUpdate(req.params.id , {$set: req.body} ,{new : true});
        res.status(200).json(updateList);
    }catch (err) {
       next(err);
    }
}

export const DeleteList = async (req,res,next)=>{
    try{
        const deleteList = await List.findByIdAndDelete(req.params.id);
        res.status(200).json("List has been deleted!");
    }catch (err) {
       next(err);
    }
}

export const GetList = async (req,res,next)=>{
    try{
        const getList = await List.findById(req.params.id);
        res.status(200).json(getList);
    }catch (err) {
        next(err);
    }
}

export const GetAllLists = async (req,res,next)=>{
    const query = req.query.new;
    try{
        const getAllList = query ? await List.find().sort({_id:-1}).limit(5) : await List.find();
        res.status(200).json(getAllList)
    }catch(err) {
        next(err);
    }
}

// API endpoint to get the List count
export const GetListCount = async (req, res, next) => {
    try {
      const ListCount = await List.countDocuments();
      res.status(200).json({ count: ListCount });
    } catch (err) {
      next(err);
    }
  };

  // Random
  export const RandomList = async (req, res, next) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];
    try {
      if (typeQuery) {
        if (genreQuery) {
          list = await List.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: typeQuery, genre: genreQuery } },
          ]);
        } else {
          list = await List.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: typeQuery } },
          ]);
        }
      } else {
        list = await List.aggregate([{ $sample: { size: 10 } }]);
      }
      res.status(200).json(list);
    } catch (err) {
        next(err)
    }
  };
  
