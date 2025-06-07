import React, { useState } from "react";
import "./Login.css";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/userSlice";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await newRequest.post("/auth/login", { username, password });
  //     localStorage.setItem("currentUser", JSON.stringify(res.data));
  //     navigate("/")
  //   } catch (err) {
  //     setError(err.response.data);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      dispatch(loginSuccess(res.data));
      navigate("/")
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input id="username"
          name="username"
          type="text"
          placeholder="johndoe"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
        id="password"
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button id="login" type="submit">Login</button>
        {error && error}
      </form>
    </div>
  );
}

export default Login;