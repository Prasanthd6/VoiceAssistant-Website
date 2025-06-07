import React from "react";
import "./Card.css";


const Card = ({icon , title}) => {

  return(
    <div className="card">
      <div className="card-icon">{icon}</div>
      <div className="card-title">{title}</div>
    </div>
  );
};

export default Card;