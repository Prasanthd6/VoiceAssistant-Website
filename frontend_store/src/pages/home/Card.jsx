// import React from "react";
// import "./Card.css";


// const Card = ({icon , title}) => {

//   return(
//     <div className="card">
//       <div className="card-icon">{icon}</div>
//       <div className="card-title">{title}</div>
//     </div>
//   );
// };

// export default Card;
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";

const Card = ({ icon, title }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/gigs?search=${encodeURIComponent(title)}`);
  };

  return (
    <div className="card" onClick={handleClick} style={{ cursor: "pointer" }}>
      <div className="card-icon">{icon}</div>
      <div className="card-title">{title}</div>
    </div>
  );
};

export default Card;
