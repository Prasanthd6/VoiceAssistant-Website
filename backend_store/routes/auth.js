import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// //Signup
// router.post('/signup',async(req,res) => {
//   const { name, email, password } = req.body;
//   try {
//     const exists = await User.findOne({ email });
//     if (exists) return res.status(400).json({ msg: 'Email already registered' });

//     const hash = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hash });
//     res.status(201).json({ msg: 'User created',
//       user: {_id: user._id,name:user.name,email:user.email, role:user.role || null}
//      });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }

// });



//Signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: 'Email already registered' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });

    // ✅ Create JWT and set cookie
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,       // set to true only in production with HTTPS
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      msg: 'User created',
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role || null }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




//Login
router.post('/login',async(req,res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: 'Wrong password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, {
      httpOnly: true,
        secure: false,              // true only if using HTTPS
        sameSite: 'Lax',            // use 'None' if frontend and backend are on different domains
      maxAge: 24 * 60 * 60 * 1000
    });
    res.json({ msg: 'Login successful' ,token,
       user: {_id: user._id,name:user.name,email:user.email, role:user.role || null}
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Logout
router.get('/logout', (req,res) => {
  res.clearCookie('token');
  res.json({msg:'Logged out'});

});

//setrole
router.put('/setrole', auth,async (req,res)=>{
  const { role} = req.body;
  try{
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();

    res.status(200).json({ message: "Role updated",user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  });

export default router;