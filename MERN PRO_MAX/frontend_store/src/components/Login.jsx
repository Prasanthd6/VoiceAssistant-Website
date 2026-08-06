import React,{useContext, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom";
import "../styles/Login.css";
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form,setForm] = useState({email:'',password:''});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) =>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5555/auth/login', form, {
      withCredentials: true,
    });

    const user = res.data.user;
    alert(res.data.msg);

    login(user);

    if (user.role === 'client') {
      navigate('/clientdashboard');
    } else if (user.role === 'worker') {
      navigate('/workerdashboard');
    } else {
      navigate('/becomemate'); // if role not set
    }
  } catch (err) {
    alert(err.response?.data?.msg || 'Login failed');
  }
};

  return (
    <div className="signup-container">
    <h2>Login</h2>
    <p className="subtitle">Stay updated in professional world</p>
    <form onSubmit={handleSubmit}>
      {/* <input type='text' name='name' placeholder='Name'className="input-box"value={form.name} onChange={handleChange} required /> */}
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
    <a href="#" className="forgot-password">Forgot password?</a>
    <button type="submit" className="signin-button">Login</button>
    </form>

   

<p className="join-text">
Create an account? <Link to="/signup" >Sign Up</Link></p>

{/* <a href="/signup" className="join-link">Signup</a> */}
  </div>
  )
}

export default Login
