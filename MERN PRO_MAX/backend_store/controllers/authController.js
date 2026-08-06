import User from "../models/userModel.js";
import createError from "../utils/createError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try{
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json("Email already in use.");
    }
    await newUser.save();
    res.status(201).send("User has been created.");
  } catch (err) {
     next(err);
  }
};


export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (err) {
    next(err);
  }
};


export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};

export const becomeSeller = async (req, res, next) => {
      const { isSeller } = req.body;
      console.log("req.userId:", req.userId);
      console.log("req.body:", req.body);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      //{ isSeller: true },
      // { isSeller: !!isSeller }, // force boolean
       { isSeller: req.body.isSeller },
      { new: true }
    );
    const token = jwt.sign({
      id: updatedUser._id,
      isSeller: updatedUser.isSeller,
    },
    process.env.JWT_KEY
  );

    res.cookie("accessToken",token,{httpOnly: true,}).status(200).send(updatedUser);
  } catch (err) {
    next(err);
  }
};

