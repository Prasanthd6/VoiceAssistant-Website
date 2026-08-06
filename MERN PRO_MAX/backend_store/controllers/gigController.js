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

// export const getGigs = async (req, res, next) => {
//   const {search, min, max, sort, userId, category} = req.query;
//   const filters = {
//     ...(q.userId && { userId: q.userId }),
//     ...(q.cat && { cat: q.cat }),
//     ...((q.min || q.max) && {
//       price: {
//         ...(q.min && { $gt: q.min }),
//         ...(q.max && { $lt: q.max }),
//       },
//     }),
//     ...(q.search && { title: { $regex: q.search, $options: "i" } }),
//   };
//   try {
//     const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
//     res.status(200).send(gigs);
//   } catch (err) {
//     next(err);
//   }
// };

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
    console.log("Fetching gigs with filters:", filters);
    console.log("Sort option:", sortOption);
    const gigs = await Gig.find(filters).sort(sortOption);
    console.log("Found gigs count:", gigs.length);
    console.log("First gig (if any):", gigs[0]);
    res.status(200).json(gigs);
  } catch (err) {
    console.log("Error fetching gigs from database:", err);
    // Fallback to mock data if database is not available
    console.log("Database not available, using mock data");
    const mockGigs = [
      {
        _id: "1",
        userId: "user1",
        title: "Home Repair Services",
        shortTitle: "Home Repair",
        description: "Professional home repair services including plumbing, electrical work, and general maintenance",
        shortDesc: "Expert home repair services",
        desc: "I will provide professional home repair services including plumbing, electrical work, and general maintenance",
        category: "Home Repairs",
        price: 500,
        cover: "https://images.pexels.com/photos/580151/pexels-photo-580151.jpeg?auto=compress&cs=tinysrgb&w=1600",
        images: [],
        features: ["Plumbing", "Electrical", "General Maintenance"],
        deliveryTime: 2,
        revisionNumber: 2,
        totalStars: 25,
        starNumber: 5,
        sales: 50,
        rating: 5,
        customService: "home repair",
        createdAt: new Date()
      },
      {
        _id: "2",
        userId: "user2",
        title: "Professional Painting Services",
        shortTitle: "Painting",
        description: "High-quality interior and exterior painting services for residential and commercial properties",
        shortDesc: "Professional painting services",
        desc: "I will provide high-quality interior and exterior painting services for residential and commercial properties",
        category: "Painting",
        price: 800,
        cover: "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1600",
        images: [],
        features: ["Interior", "Exterior", "Commercial"],
        deliveryTime: 3,
        revisionNumber: 1,
        totalStars: 20,
        starNumber: 4,
        sales: 35,
        rating: 5,
        customService: "painting",
        createdAt: new Date()
      },
      {
        _id: "3",
        userId: "user3",
        title: "Deep Cleaning Services",
        shortTitle: "Cleaning",
        description: "Thorough deep cleaning services for homes and offices, including sanitization",
        shortDesc: "Professional deep cleaning",
        desc: "I will provide thorough deep cleaning services for homes and offices, including sanitization",
        category: "Cleaning",
        price: 300,
        cover: "https://images.pexels.com/photos/8797307/pexels-photo-8797307.jpeg?auto=compress&cs=tinysrgb&w=1600",
        images: [],
        features: ["Deep Clean", "Sanitization", "Office Cleaning"],
        deliveryTime: 1,
        revisionNumber: 3,
        totalStars: 30,
        starNumber: 6,
        sales: 60,
        rating: 5,
        customService: "cleaning",
        createdAt: new Date()
      },
      {
        _id: "4",
        userId: "user4",
        title: "Electrical Installation & Repair",
        shortTitle: "Electrical",
        description: "Licensed electrician for installations, repairs, and electrical inspections",
        shortDesc: "Expert electrical services",
        desc: "I will provide licensed electrician services for installations, repairs, and electrical inspections",
        category: "Electrical",
        price: 600,
        cover: "https://images.pexels.com/photos/5708069/pexels-photo-5708069.jpeg?auto=compress&cs=tinysrgb&w=1600",
        images: [],
        features: ["Installation", "Repair", "Inspection"],
        deliveryTime: 2,
        revisionNumber: 2,
        totalStars: 24,
        starNumber: 5,
        sales: 45,
        rating: 4,
        customService: "electrical",
        createdAt: new Date()
      },
      {
        _id: "5",
        userId: "user5",
        title: "Moving & Packing Services",
        shortTitle: "Moving",
        description: "Full-service moving company with packing, loading, and transportation",
        shortDesc: "Professional moving services",
        desc: "I will provide full-service moving company with packing, loading, and transportation",
        category: "Moving",
        price: 1200,
        cover: "https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=1600",
        images: [],
        features: ["Packing", "Loading", "Transportation"],
        deliveryTime: 1,
        revisionNumber: 1,
        totalStars: 18,
        starNumber: 4,
        sales: 25,
        rating: 4,
        customService: "moving",
        createdAt: new Date()
      },
      {
        _id: "6",
        userId: "user6",
        title: "Home Cooking Services",
        shortTitle: "Cooking",
        description: "Professional chef for daily meals, special occasions, and meal prep",
        shortDesc: "Home cooking services",
        desc: "I will provide professional chef services for daily meals, special occasions, and meal prep",
        category: "Cooking",
        price: 400,
        cover: "https://images.pexels.com/photos/8100784/pexels-photo-8100784.jpeg?auto=compress&cs=tinysrgb&w=1600",
        images: [],
        features: ["Daily Meals", "Special Occasions", "Meal Prep"],
        deliveryTime: 1,
        revisionNumber: 2,
        totalStars: 22,
        starNumber: 5,
        sales: 40,
        rating: 4,
        customService: "cooking",
        createdAt: new Date()
      },
      {
        _id: "7",
        userId: "user7",
        title: "Gardening & Landscaping",
        shortTitle: "Outdoor Help",
        description: "Complete gardening services including lawn care, landscaping, and garden maintenance",
        shortDesc: "Professional gardening services",
        desc: "I will provide complete gardening services including lawn care, landscaping, and garden maintenance",
        category: "Outdoor help",
        price: 350,
        cover: "https://images.pexels.com/photos/6039245/pexels-photo-6039245.jpeg?auto=compress&cs=tinysrgb&w=1600",
        images: [],
        features: ["Lawn Care", "Landscaping", "Garden Maintenance"],
        deliveryTime: 2,
        revisionNumber: 3,
        totalStars: 28,
        starNumber: 6,
        sales: 55,
        rating: 5,
        customService: "gardening",
        createdAt: new Date()
      },
      {
        _id: "8",
        userId: "user8",
        title: "Construction & Renovation",
        shortTitle: "Construction",
        description: "Full construction and renovation services for residential and commercial projects",
        shortDesc: "Construction and renovation",
        desc: "I will provide full construction and renovation services for residential and commercial projects",
        category: "Construction",
        price: 2500,
        cover: "https://images.pexels.com/photos/5490778/pexels-photo-5490778.jpeg?auto=compress&cs=tinysrgb&w=1600",
        images: [],
        features: ["Renovation", "New Construction", "Commercial"],
        deliveryTime: 7,
        revisionNumber: 1,
        totalStars: 15,
        starNumber: 3,
        sales: 20,
        rating: 5,
        customService: "construction",
        createdAt: new Date()
      }
    ];
    
    // Apply filters to mock data
    let filteredGigs = mockGigs;
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredGigs = filteredGigs.filter(gig => 
        gig.title.toLowerCase().includes(searchLower) ||
        gig.description.toLowerCase().includes(searchLower) ||
        gig.category.toLowerCase().includes(searchLower)
      );
    }
    
    if (category) {
      filteredGigs = filteredGigs.filter(gig => gig.category === category);
    }
    
    if (min || max) {
      filteredGigs = filteredGigs.filter(gig => {
        if (min && gig.price < Number(min)) return false;
        if (max && gig.price > Number(max)) return false;
        return true;
      });
    }
    
    // Apply sorting
    if (sort === "sales") {
      filteredGigs.sort((a, b) => b.sales - a.sales);
    } else if (sort === "rating") {
      filteredGigs.sort((a, b) => b.rating - a.rating);
    } else if (sort === "createdAt") {
      filteredGigs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    res.status(200).json(filteredGigs);
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
