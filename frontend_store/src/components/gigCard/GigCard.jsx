import React, { useState } from "react";
import "./GigCard.css";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import newRequest from "../../utils/newRequest";
import { FaStar } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";


const GigCard = ({ item }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const toggleFavorite = () => setIsFavorited(!isFavorited);

  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () => newRequest.get(`/users/${item.userId}`).then((res) => res.data),
  });

  const averageRating =
    item.starNumber > 0 ? Math.round(item.totalStars / item.starNumber) : 4; // Default 4 star

  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover} alt="Gig Cover" className="gig-image" />

        <div className="info">
          {!isLoading && !error && (
            <div className="user">
              <img src={data.img || "/img/noavatar.jpg"} alt="User" />
              <span>{data.username}</span>
            </div>
          )}

          <p className="desc">{item.description}</p>

          <div className="star">
            <FaStar/>
            <span>{averageRating}</span>
          </div>
        </div>
        <div className="footer">
          <div onClick={toggleFavorite} className="favorite-icon">
            {isFavorited ? <FaHeart color="grey" size={16} /> : <FaRegHeart size={16} color="grey" />}
          </div>

          <div className="price">
            <span>From</span>
            <h2><FaIndianRupeeSign size={14}/> {item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
