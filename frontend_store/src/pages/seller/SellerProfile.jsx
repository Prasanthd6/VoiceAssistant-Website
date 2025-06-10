import React, { useEffect, useState } from "react";
import "./sellerProfile.css"; // optional: style like Fiverr
import { useSelector } from "react-redux"; // or however you get currentUser
import { useNavigate,useLocation } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const SellerProfile = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const location = useLocation();
  const [hasGig, setHasGig] = useState(false);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    if (!currentUser) {
      // Handle user not logged in or redirect
      return;
    }

    const fetchGigs = async () => {
      try {
        const res = await newRequest.get(`/gigs?userId=${currentUser._id}`);
        console.log("Fetched gigs:", res.data); // Debug log
        setHasGig(res.data.length > 0);
      } catch (err) {
        console.error("Failed to fetch gigs", err);
        setHasGig(false);
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, [currentUser?._id, location.pathname]);



  if (loading) return <p>Loading profile...</p>;

  if (!currentUser || !currentUser.isSeller) {
    return <p>You are not a seller yet. Please switch to seller first.</p>;
  }



  return (
    <div className="sellerProfile">
      <h2>Welcome, {currentUser?.username}</h2>

      <div className="profileHeader">
        <img src={currentUser?.img || "/default-avatar.png"} alt="profile" />
        <div>
          <h3>{currentUser?.username}</h3>
          <p>@{currentUser?.email.split("@")[0]}</p>
        </div>
      </div>

      <div className="levelCard">
        <h4>Level overview</h4>
        <p><strong>My level:</strong> New seller</p>
        <p><strong>Success score:</strong> -</p>
        <p><strong>Rating:</strong> ⭐ -</p>
        <p><strong>Response rate:</strong> -</p>
        {!hasGig ? (
        <button
          onClick={() => navigate("/add")}
          style={{
            marginTop: "2rem",
            padding: "10px 20px",
            backgroundColor: "#1dbf73",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Create Your Gig
        </button>
      ) : (
        <button
          onClick={() => navigate("/mygig")}
          style={{
            marginTop: "2rem",
            padding: "10px 20px",
            backgroundColor: "#0077cc",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          View Your Gig
        </button>)}
      </div>
    </div>
  );
};

export default SellerProfile;
