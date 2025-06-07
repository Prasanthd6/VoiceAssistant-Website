import React,{ useContext,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Link} from "react-router-dom";
import "../styles/Signup.css";
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const { login } = useContext(AuthContext);
  const [form,setForm] = useState({name:'',email:'',password:''});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) =>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5555/auth/signup',form,{withCredentials:true});
      alert(res.data.msg);
      login(res.data.user);
      navigate('/becomemate');
    }
    catch(err){
        alert(err.response.data.msg || 'Signup failed');
    }
  };

  return (
      
   
      <div className="signup-container">
        <h2>Sign Up</h2>
        <p className="subtitle">Stay updated in professional world</p>
        <form onSubmit={handleSubmit}>
          <input type='text' name='name' placeholder='Name'className="input-box"value={form.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email or Phone" className="input-box"
value={form.email} onChange={handleChange} required />
       
        <div className="password-box">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="input-box"
            value={form.password}
            onChange={handleChange}
            required
          />
          <span
            className="show-button"
            onClick={() => setShowPassword(!showPassword)}
          >{showPassword ? "hide" : "show"}
          </span>
        </div>
        {/* <a href="#" className="forgot-password">Forgot password?</a> */}
        <button type="submit" className="signin-button">Sign Up</button>
        </form>
        <div className="divider">
          <hr className="line" />
          or
          <hr className="line" />
          </div>

<button className="apple-button">
  <img
    src="https://img.icons8.com/ios-filled/50/apple-logo.png"
    alt="Apple Logo"
    className="apple-icon"
  />
  Sign in with Apple
</button>
<button className="apple-button">
  <img
    src="https://img.icons8.com/ios-filled/50/apple-logo.png"
    alt="Apple Logo"
    className="apple-icon"
  />
  Sign in with Google
</button>

<p className="join-text">
  Already have an account? <Link to="/login" >Login</Link></p>

  {/* <a href="/login" className="join-link">Login</a> */}
      </div>
  );
};

export default Signup;
