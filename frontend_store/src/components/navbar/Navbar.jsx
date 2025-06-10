import React, { useEffect, useState, } from "react";
import { Link, useLocation, useNavigate, } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import { FaRunning } from "react-icons/fa";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { logout, updateUser } from "../../redux/userSlice";



function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
 
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();


  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, [pathname]);

 
  const handleLogout = async () => {
    try {
        dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleBecomeSeller = async () => {
    try {
      // Call backend to update user as seller
      const res = await newRequest.put("/auth/becomeseller", { isSeller: true });

          dispatch(updateUser({ isSeller: true }));
      
      navigate("/seller");
    } catch (err) {
      console.log(err);
    }
  };

  const handleBecomeClient = async () => {
  try {
    const res = await newRequest.put("/auth/becomeseller", { isSeller: false });

    dispatch(updateUser({ isSeller: false }));
    navigate("/"); // or any client area
  } catch (err) {
    console.error("Failed to become a client:", err);
  }
};


  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">doMate</span>
          </Link>
          <span className="dot">
            <FaRunning />
          </span>
        </div>
        <div className="links">
          <span>Business</span>
          <span>Explore</span>
          <span>English</span>

          {currentUser && !currentUser.isSeller && (
            <span style={{ cursor: "pointer" }} onClick={handleBecomeSeller}>
              Become a Mate
            </span>
          )}

          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" onClick={handleBecomeClient}>
                        Switch to client
                      </Link>
                      <Link className="link" to="/mygigs">
                        Gigs
                      </Link>
                      <Link className="link" to="/add">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    My chats
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">
                Sign in
              </Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>

      
    </div>
  );
}

export default Navbar;
