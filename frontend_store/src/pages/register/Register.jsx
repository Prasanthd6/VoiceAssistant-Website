import React, { useState } from "react";
import upload from "../../utils/upload";
import "./Register.css";
import newRequest from "../../utils/newRequest";
import { useNavigate, useLocation } from "react-router-dom";
import VoiceControl from "../../voicenav/VoiceNav";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/userSlice";

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });
  const dispatch = useDispatch();

    const [showRolePopup, setShowRolePopup] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);
    try {
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });

      const res = await newRequest.post("/auth/login", {
       username: user.username,
      password: user.password,
    });
    // Step 3: Save the user to local storage (or context, if you're using one)
    localStorage.setItem("currentUser", JSON.stringify(res.data));
    
    setShowRolePopup(true);


    } catch (err) {
      console.log(err);
    }
  };

  const handleRoleSelection = async (isSeller) => {
    try {
      await newRequest.put("/auth/becomeseller", { isSeller });

      const updatedUser = {
        ...JSON.parse(localStorage.getItem("currentUser")),
        isSeller,
      };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      dispatch(loginSuccess(updatedUser));

      navigate(isSeller ? "/seller" : "/");
    } catch (err) {
      console.error("Error updating role:", err);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="johndoe"
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
          <input name="password" type="password" onChange={handleChange} />
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="Usa"
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </div>
        <div className="right">
         
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={handleChange}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>

      {/* Role Selection Popup */}
      {showRolePopup && (
        <div className="role-popup">
          <div className="popup-content">
            <h2>Select Your Role</h2>
            <p>What do you want to do on the platform?</p>
            <div className="role-buttons">
              <button onClick={() => handleRoleSelection(false)}>Become a Client</button>
              <button onClick={() => handleRoleSelection(true)}>Become a Mate</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;