import React from "react";
import { Link } from "react-router-dom";
import "./CatCard.css";

function CatCard({ card }) {
  return (
    <Link to={`/gigs?search=${card.title}`}>
      <div className="catCard">
        {card.icon && <div className="cat-icon">{card.icon}</div>}
        {card.img && <img src={card.img} alt="" />}
        {card.desc && <span className="desc">{card.desc}</span>}
        <span className="title">{card.title}</span>
      </div>
    </Link>
  );
}
export default CatCard;