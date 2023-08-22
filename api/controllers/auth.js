import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt  from "jsonwebtoken";
import {createError} from "../utils/error.js"
// import  cloudinary  from "../utils/cloudinary.js";


export const registre = async (req,res,next)=>{
  try{
    //to hide the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
        ...req.body,
        password: hash,
    })
    await newUser.save()
    res.status(200).send("user has been created")
  }catch(err){
    next(err)
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

      const accessToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT,
        { expiresIn: "2d" }
      );
  
    const { password, isAdmin, ...otherDetails } = user._doc;
    res.status(200).json({ details: { ...otherDetails }, isAdmin , accessToken });
  } catch (err) {
    next(err);
  }
};

