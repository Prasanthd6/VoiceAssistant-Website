import React, { useEffect, useState, } from "react";
import { Link, useLocation, useNavigate, } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import { FaRunning } from "react-icons/fa";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { logout, updateUser } from "../../redux/userSlice";
import VoiceAssistant from "../../voicenav/VoiceNav";



function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  // const [currentUser, setCurrentUser] = useState(
  //   JSON.parse(localStorage.getItem("currentUser"))
  // );
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

  // const handleLogout = async () => {
  //   try {
  //     await newRequest.post("/auth/logout");
  //     localStorage.removeItem("currentUser");
  //     setCurrentUser(null);
  //     navigate("/");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
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

      // Update currentUser state and localStorage
      // const updatedUser = { ...currentUser, isSeller: true };
          dispatch(updateUser({ isSeller: true }));
      
      navigate("/seller");
    } catch (err) {
      console.log(err);
    }
  };

  const handleBecomeClient = async () => {
  try {
    const res = await newRequest.put("/auth/becomeseller", { isSeller: false });

    // const updatedUser = { ...currentUser, isSeller: false };
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
          {/* {currentUser && !currentUser.isSeller && (
            <Link to="/seller" style={{ textDecoration: "none", color: "inherit" }}>
              <span style={{ cursor: "pointer" }}>Become a Mate</span>
            </Link>
          )} */}



          {/* {currentUser && currentUser.isSeller && (
            <span style={{ cursor: "pointer" }}>
              Switch to Client 
            </span>
          )} */}

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
                      <Link className="link" to="/messages">My Chats</Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
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
      <VoiceAssistant />
      
    </div>
  );
}

export default Navbar;




{/* {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/">
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/">
              AI Services
            </Link>
            <Link className="link menuLink" to="/">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/">
              Business
            </Link>
            <Link className="link menuLink" to="/">
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )} */}

// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import newRequest from "../../utils/newRequest";
// import { FaRunning } from "react-icons/fa";
// import "./Navbar.css";

// function Navbar() {
//   const [active, setActive] = useState(false);
//   const [open, setOpen] = useState(false);

//   const { pathname } = useLocation();

//   const isActive = () => {
//     window.scrollY > 0 ? setActive(true) : setActive(false);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", isActive);
//     return () => {
//       window.removeEventListener("scroll", isActive);
//     };
//   }, []);

//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));

//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await newRequest.post("/auth/logout");
//       localStorage.setItem("currentUser", null);
//       navigate("/");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
//       <div className="container">
//         <div className="logo">
//           <Link className="link" to="/">
//             <span className="text">doMate</span>
//           </Link>
//           <span className="dot"><FaRunning /></span>
//         </div>
//         <div className="links">
//           <span>Business</span>
//           <span>Explore</span>
//           <span>English</span>
//           {!currentUser?.isSeller && <span>Become a Mate</span>}
//           {currentUser ? (
//             <div className="user" onClick={() => setOpen(!open)}>
//               <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
//               <span>{currentUser?.username}</span>
//               {open && (
//                 <div className="options">
//                   {currentUser.isSeller && (
//                     <>
//                       <Link className="link" to="/mygigs">
//                         Gigs
//                       </Link>
//                       <Link className="link" to="/add">
//                         Add New Gig
//                       </Link>
//                     </>
//                   )}
//                   <Link className="link" to="/orders">
//                     Orders
//                   </Link>
//                   <Link className="link" to="/messages">
//                     Messages
//                   </Link>
//                   <Link className="link" onClick={handleLogout}>
//                     Logout
//                   </Link>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <>
//               <Link to="/login" className="link">Sign in</Link>
//               <Link className="link" to="/register">
//                 <button>Join</button>
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//       {(active || pathname !== "/") && (
//         <>
//           <hr />
//           <div className="menu">
//             <Link className="link menuLink" to="/">
//               Graphics & Design
//             </Link>
//             <Link className="link menuLink" to="/">
//               Video & Animation
//             </Link>
//             <Link className="link menuLink" to="/">
//               Writing & Translation
//             </Link>
//             <Link className="link menuLink" to="/">
//               AI Services
//             </Link>
//             <Link className="link menuLink" to="/">
//               Digital Marketing
//             </Link>
//             <Link className="link menuLink" to="/">
//               Music & Audio
//             </Link>
//             <Link className="link menuLink" to="/">
//               Programming & Tech
//             </Link>
//             <Link className="link menuLink" to="/">
//               Business
//             </Link>
//             <Link className="link menuLink" to="/">
//               Lifestyle
//             </Link>
//           </div>
//           <hr />
//         </>
//       )}
//     </div>
//   );
// }

// export default Navbar;