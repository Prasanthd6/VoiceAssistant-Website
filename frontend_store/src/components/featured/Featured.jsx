import React, { useState } from "react";
import "./Featured.css";
import { useNavigate } from "react-router-dom";
import featurebg from "../../assets/featurebg.png";
import { CiSearch } from "react-icons/ci";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  
  return (
    <div
      className="featured"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${featurebg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
        opacity: "0.9",
      }}
    >
      <div className="container">
        <div className="left">
          <h1>
            Book top-rated <br /> workforce in your region
          </h1>
          <div className="search">
            <div className="searchInput">
              <input
              id="search"
                type="text"
                placeholder="Search by service, skills"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button
              onClick={handleSubmit}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: "10px 20px",
                fontSize: "16px",
                height: "40px",
                cursor: "pointer",
                borderRadius: "15px",
              }}
            >
              <CiSearch size={30} /> Search
            </button>
          </div>
          <div className="popular">
            <button onClick={() => navigate("/gigs?search=Carpenter")}>Carpenter</button>
            <button onClick={() => navigate("/gigs?search=Gardening")}>Gardening</button>
            <button onClick={() => navigate("/gigs?search=Computer/IT Repairr")}>Computer/IT Repair</button>
            <button onClick={() => navigate("/gigs?search=")}>All Services</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
