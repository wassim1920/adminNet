import User from "../models/User.js";

export const UpdateUser = async (req,res,next)=>{
    try{
        const updateUser = await User.findByIdAndUpdate(req.params.id , {$set: req.body} ,{new : true});
        res.status(200).json(updateUser);
    }catch (err) {
       next(err);
    }
}

export const DeleteUser = async (req,res,next)=>{
    try{
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted!");
    }catch (err) {
       next(err);
    }
}

export const GetUser = async (req,res,next)=>{
    try{
        const getuser = await User.findById(req.params.id);
        res.status(200).json(getuser);
    }catch (err) {
        next(err);
    }
}

export const GetAllUsers = async (req,res,next)=>{
    const query = req.query.new;
    try{
        const getAlluser = query ? await User.find().sort({_id:-1}).limit(5) : await User.find();
        res.status(200).json(getAlluser)
    }catch(err) {
        next(err);
    }
}

// API endpoint to get the user count
export const GetUserCount = async (req, res, next) => {
    try {
      const userCount = await User.countDocuments();
      res.status(200).json({ count: userCount });
    } catch (err) {
      next(err);
    }
  };

  // userStats

  export const GetUserStats = async (req , res ,next)=>{
    const today = new Date();
    const lastYear = today.setFullYear(today.getFullYear() - 1 );
    const monthsArray = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    try{
        const data = await User.aggregate([
            {
                $project: {
                    month: { $month : "$createdAt"},
                    // month: { $year : "$createdAt"},
                },
            },
            {
                $group: {
                    _id : "$month",
                    totalUsers: { $sum : 1},
                },
            },
        ]);
        res.status(200).json(data);
    }catch(err){
        next(err)
    }
  }