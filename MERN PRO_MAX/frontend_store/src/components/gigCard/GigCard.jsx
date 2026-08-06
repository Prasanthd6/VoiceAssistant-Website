import React, {useState} from "react";
import "./GigCard.css";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { FaRegHeart, FaHeart, FaStar } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";

const GigCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!item.userId,
  });
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = (e) => {
    e.preventDefault(); // prevent link navigation
    setIsFavorited((prev) => !prev);
    // You can handle favorite list logic here
  };

  // Handle different field names from mock data vs database
  const gigImage = item.cover || item.images?.[0] || "/img/noavatar.jpg";
  const gigDesc = item.desc || item.shortDesc || item.description || "No description available";

  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={gigImage} alt="" onError={(e) => {
          e.target.src = "/img/noavatar.jpg";
        }} />
        <div className="info">
          {isLoading ? (
            "loading"
          ) : error ? (
            "Something went wrong!"
          ) : (
            <div className="user">
              <img src={data?.img || "/img/noavatar.jpg"} alt="" onError={(e) => {
                e.target.src = "/img/noavatar.jpg";
              }} />
              <span>{data?.username || "User"}</span>
            </div>
          )}
          <p className="desc">{gigDesc}</p>
          <div className="star">
            {/* <img src="./img/star.png" alt="" /> */}
            <FaStar color="#ffc108" size={14} />
            <span>
              {!isNaN(item.totalStars / item.starNumber) ?
                Math.round(item.totalStars / item.starNumber):4}
            </span>
          </div>
        </div>
        <hr />
        <div className="detail">
          {/* <img src="./img/heart.png" alt="" /> */}
           <div onClick={toggleFavorite} className="favorite-icon">
            {isFavorited ? (
              <FaHeart color="red" size={16} />
            ) : (
              <FaRegHeart size={16} />
            )}
          </div>
          <div className="price">
            <span>STARTING AT</span>
            <h2><FaIndianRupeeSign size={14}/> {item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;