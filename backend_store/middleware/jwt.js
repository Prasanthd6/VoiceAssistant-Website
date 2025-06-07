import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
import User from "../models/userModel.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if(!token) return next(createError(401,"You are not authenticated!"))

  
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
        if (err) return next(createError(403,"Token is not valid!"));
                    console.log("Decoded user:", payload);
        try{
          // const user = await User.findById(payload.id);
          // if(!user) return next(createError(404, "User not found"));
            req.userId = payload.id;
            req.isSeller = payload.isSeller;
            next();
        }catch(err){
          next(err);
        }
  });
};