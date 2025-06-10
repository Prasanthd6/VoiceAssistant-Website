import Gig from "../models/gigModel.js";
import createError from "../utils/createError.js";

export const createGig = async (req, res, next) => {
  console.log("isSeller:", req.isSeller);
console.log("userId:", req.userId);

  if(!req.isSeller){ 
    return next(createError(403, "Only sellers can create a gig!"));
  } 
      console.log("Gig data received:", req.body); // Debug log

  const newGig = new Gig({
    userId: req.userId,
    ...req.body,
  });

  try{
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  }catch (err){
    next(err);
  }
};

export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (gig.userId !== req.userId)
      return next(createError(403, "You can delete only your gig!"));

    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted!");
  } catch (err) {
    next(err);
  }
};


export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) next(createError(404, "Gig not found!"));
    res.status(200).send(gig);
  } catch (err) {
    next(err);
  }
};


export const getGigs = async (req, res, next) => {
  const { search, min, max, sort, userId, category } = req.query;
  const filters = {};

  if (userId) filters.userId = userId;
  if (category) filters.category = category;

  if (search) {
    filters.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
      { customService: { $regex: search, $options: "i" } },
    ];
  }

  if (min || max) {
    filters.price = {};
    if (min) filters.price.$gte = Number(min);
    if (max) filters.price.$lte = Number(max);
  }

  let sortOption = {};
  if (sort === "sales") sortOption = { sales: -1 };
  else if (sort === "rating") sortOption = { rating: -1 };
  else if (sort === "createdAt") sortOption = { createdAt: -1 };

  try {
    const gigs = await Gig.find(filters).sort(sortOption);
    res.status(200).json(gigs);
  } catch (err) {
    next(err);
  }
};



export const updateGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, "Gig not found!"));
    if (gig.userId !== req.userId)
      return next(createError(403, "You can only update your own gig."));

    const updatedGig = await Gig.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedGig);
  } catch (err) {
    next(err);
  }
};
