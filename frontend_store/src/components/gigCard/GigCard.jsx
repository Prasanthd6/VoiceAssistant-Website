// ✅ FINAL VERSION: Closely Matches Uploaded Example
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
            {/* <img src="/img/star.png" alt="Star" /> */}
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




// import React, {useState} from "react";
// import "./GigCard.css";
// import { Link } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import newRequest from "../../utils/newRequest";
// import { FaRegHeart, FaHeart, FaStar } from "react-icons/fa";

// const GigCard = ({ item }) => {
//   const { isLoading, error, data } = useQuery({
//     queryKey: [item.userId],
//     queryFn: () =>
//       newRequest.get(`/users/${item.userId}`).then((res) => {
//         return res.data;
//       }),
//   });
//   const [isFavorited, setIsFavorited] = useState(false);

//   const toggleFavorite = (e) => {
//     e.preventDefault(); // prevent link navigation
//     setIsFavorited((prev) => !prev);
//     // You can handle favorite list logic here
//   };


//   return (
//     <Link to={`/gig/${item._id}`} className="link">
//       <div className="gigCard">
//         <img src={item.cover} alt="" />
//         <div className="info">
//           {isLoading ? (
//             "loading"
//           ) : error ? (
//             "Something went wrong!"
//           ) : (
//             <div className="user">
//               <img src={data.img || "/img/noavatar.jpg"} alt="" />
//               <span>{data.username}</span>
//             </div>
//           )}
//           <p className="desc">{item.desc}</p>
//           <div className="star">
//             {/* <img src="./img/star.png" alt="" /> */}
//             <FaStar color="#ffc108" size={14} />
//             <span>
//               {!isNaN(item.totalStars / item.starNumber) ?
//                 Math.round(item.totalStars / item.starNumber):4}
//             </span>
//           </div>
//         </div>
//         <hr />
//         <div className="detail">
//           {/* <img src="./img/heart.png" alt="" /> */}
//            <div onClick={toggleFavorite} className="favorite-icon">
//             {isFavorited ? (
//               <FaHeart color="red" size={16} />
//             ) : (
//               <FaRegHeart size={16} />
//             )}
//           </div>
//           <div className="price">
//             <span>STARTING AT</span>
//             <h2>$ {item.price}</h2>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default GigCard;