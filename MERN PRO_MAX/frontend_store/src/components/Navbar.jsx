import React from "react";
import {Link} from "react-router-dom";
import Button from "./common/button";
import "../styles/Navbar.css";
const Navbar = () => {
  return(
    <nav className="navbar">
      <div className="nav-logo">
        <h1>DoMate</h1>
      </div>
      <div>
      <ul className="nav-links">
        <li>
            <Link>Services</Link>
        </li>
        <li>
             <Link to="/signup" >Sign Up</Link>
            {/* < Button 
            text="Sign in" 
            variant="secondary" 
            onClick={() => alert("You are signed in")}
             /> */}
        </li>
        <li>
            {/* < Button 
            text="Become a Mate" 
            variant="primary" 
            onClick={() => alert("You are a Mate")}
             /> */}
             <Link to="/becomemate" >Become a Mate</Link>
        </li>
      </ul>
      </div>
    </nav>
  );
};

export default Navbar;