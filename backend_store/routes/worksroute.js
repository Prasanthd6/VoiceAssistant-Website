import express from 'express';
import multer from 'multer';
import Work from '../models/workmodel.js';
import path from 'path';

const router = express.Router();
// const storage = multer.memoryStorage();
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const upload = multer({storage});

// 1 //Route to create a work
// router.post('/',async(request, response) => {
//   try{
//     if(
//       !request.body.fullName ||
//       !request.body.bio ||
//       !request.body.price ||
//       !request.body.location
//     ){
//       return response.status(400).send({mesaage : "Send all the required fields"});
//     }
//    const newWork = {
//   fullName: request.body.fullName,
//   profilePic: request.body.profilePic,
//   bannerPic: request.body.bannerPic,
//   bio: request.body.bio,
//   skills: request.body.skills, // should be array on frontend
//   price: request.body.price,
//   location: request.body.location,
//   pincode: request.body.pincode,
// };

//     const work = await Work.create(newWork);
//     return response.status(201).send(work)
//   }
//   catch(error){
//     console.log(error.message)
//     return response.status(500).send({message:error.message});
//   }
// });


// 2 //create a work using multer
// router.post('/', upload.fields([
//   { name: 'profilePic', maxCount: 1 },
//   { name: 'bannerPic', maxCount: 1 },
// ]), async (req, res) => {
//   try {
//     const { fullName, bio, price, location, pincode, skills } = req.body;

//     if (!fullName || !bio || !price || !location || !pincode) {
//       return res.status(400).send({ message: 'Send all the required fields' });
//     }

//     console.log("Files received:", req.files); // 🔍 ADD THIS LINE FOR DEBUGGING
//     console.log("Body received:", req.body);   

//     const newWork = {
//       fullName,
//       // // profilePic: req.files.profilePic ? req.files.profilePic[0].originalname : null,
//       // profilePic: req.files?.profilePic?.[0]?.originalname || null,
//       // bannerPic: req.files.bannerPic ? req.files.bannerPic[0].originalname : null,
//       profilePic: req.files?.profilePic?.[0]?.filename || null,
//       bannerPic: req.files?.bannerPic?.[0]?.filename || null,
//       bio,
//       skills: skills.split(',').map(s => s.trim()),  // split into array
//       price,
//       location,
//       pincode,
//     };

//     const work = await Work.create(newWork);
//     res.status(201).send(work);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({ message: error.message });
//   }
// });


// 3 POST /api/works
router.post('/', upload.fields([
  { name: 'profilePic', maxCount: 1 },
  { name: 'bannerPic', maxCount: 1 }
]), async (req, res) => {
  try {
    const { fullName, bio, price, location, pincode, skills } = req.body;

    if (!fullName || !bio || !price || !location || !pincode || !skills) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    console.log('Files received:', req.files);
    console.log('Body received:', req.body);

    const skillString = Array.isArray(skills) ? skills[0] : skills;
    const skillArray = skillString.split(',').map(s => s.trim());

    const newWork = {
      fullName,
      bio,
      skills: skillArray,
      // profilePic: req.files?.profilePic?.[0]?.path || null,
      // bannerPic: req.files?.bannerPic?.[0]?.path || null,
       profilePic: req.files?.profilePic?.[0]?.filename || null,
      bannerPic: req.files?.bannerPic?.[0]?.filename || null,
      price,
      location,
      pincode,
    };

    const work = await Work.create(newWork);
    res.status(201).json(work);
  } catch (error) {
    console.error('Error saving work:', error.message);
    res.status(500).json({ message: 'Server error while saving work' });
  }
});



//Route for getting all works
router.get('/',async(request, response) =>{
  try{
    const works = await Work.find({});
    return response.status(200).json({
      count : works.length,
      data: works});
  }
  catch(error){
    console.log(error.message)
    response.status(500).send({message:error.message});
  }
});

//Route for getting single work details
router.get('/:id',async(request, response) =>{
  try{
    const { id } = request.params;

    const work = await Work.findById(id);
    if (!work) return response.status(404).json({ message: "Work not found" });
    return response.status(200).json(work);
  }
  catch(error){
    console.log(error.message)
    response.status(500).send({message:error.message});
  }
});



// //Route for update a work
// router.put('/:id',async(request, response) =>{
//   try{
//     if(
//       !request.body.fullName ||
//       !request.body.bio ||
//       !request.body.price ||
//       !request.body.location
//     ){
//       response.status(400).send({mesaage : "Send all the required fields"});
//     }
//     const { id } = request.params;
//     const result = await Work.findByIdAndUpdate(id, request.body);
//     if(!result){
//       return response.status(404).json({mesaage: "work not found"});
//     }
//     return response.status(200).send({message: "Work updated successfully"});
//   }
//   catch(error){
//     console.log(error.message)
//     response.status(500).send({message:error.message});
//   }
// })


router.put('/:id', upload.fields([
  { name: 'profilePic', maxCount: 1 },
  { name: 'bannerPic', maxCount: 1 },
]), async (req, res) => {
  try {
    const { fullName, bio, price, location, pincode, skills } = req.body;

    if (!fullName || !bio || !price || !location || !pincode) {
      return res.status(400).send({ message: 'Send all the required fields' });
    }

    const updatedData = {
      fullName,
      profilePic: req.files?.profilePic?.[0]?.originalname || undefined,
      bannerPic: req.files?.bannerPic?.[0]?.originalname || undefined,
      bio,
      skills: skills.split(',').map(s => s.trim()),
      price,
      location,
      pincode,
    };

    // Remove fields that are undefined (in case user didn't update image)
    Object.keys(updatedData).forEach(key => {
      if (updatedData[key] === undefined) delete updatedData[key];
    });

    const result = await Work.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!result) {
      return res.status(404).json({ message: 'Work not found' });
    }

    res.status(200).json({ message: 'Work updated successfully', data: result });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});




//Route to delete a work
router.delete('/:id',async(request, response) =>{
  try{
    const { id } = request.params;

    const result = await Work.findByIdAndDelete(id);
    if(!result){
      return response.status(404).json({mesaage: "work not found"});
    }
    return response.status(200).send({message: "Work Deleted successfully"});
    return response.status(200).json(work);
  }
  catch(error){
    console.log(error.message)
    response.status(500).send({message:error.message});
  }
});

export default router;