import React, { useState } from 'react';
import { FaMapMarkerAlt, FaRupeeSign, FaHeart, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './WorkerCard.css';

const WorkerCard = ({ worker }) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/worker/${worker._id}`); // ensure this route exists
  };

  return (
    <div className="worker-card" onClick={handleCardClick}>
      <div className="banner">
        <img src={`http://localhost:5555/uploads/${worker.bannerPic}`} alt="banner" className="banner-img" />
        <div className="profile-container" onClick={(e) => e.stopPropagation()}>
          <img src={`http://localhost:5555/uploads/${worker.profilePic}`} alt="profile" className="profile-pic" />
        </div>
        <div
          className={`like-icon ${liked ? 'liked' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
        >
          <FaHeart />
        </div>
      </div>
      <div className="worker-details">
        <h3>{worker.fullName}</h3>
        <p className="bio">{worker.bio}</p>
        <div className="location">
          <FaMapMarkerAlt /> <span>{worker.location}, {worker.pincode}</span>
        </div>
        <div className="rating-price">
          <div className="rating">
            <FaStar className="star" /> 5.0
          </div>
          <div className="price">
            From <FaRupeeSign />{worker.price}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerCard;

// import React from 'react';
// import { FaMapMarkerAlt, FaRupeeSign, FaHeart, FaStar } from 'react-icons/fa';
// import './WorkerCard.css';

// const WorkerCard = ({ worker }) => {
//   return (
//     <div className="worker-card">
//       <div className="banner">
//         <img src={worker.bannerPic} alt="banner" className="banner-img" />
//         <div className="profile-container">
//           <img src={worker.profilePic} alt="profile" className="profile-pic" />
//         </div>
//         <div className="like-icon">
//           <FaHeart />
//         </div>
//       </div>
//       <div className="worker-details">
//         <h3>{worker.fullName}</h3>
//         <p className="bio">{worker.bio}</p>
//         <div className="location">
//           <FaMapMarkerAlt /> <span>{worker.location}, {worker.pincode}</span>
//         </div>
//         <div className="rating-price">
//           <div className="rating">
//             <FaStar className="star" /> 5.0
//           </div>
//           <div className="price">
//             From <FaRupeeSign />{worker.price}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WorkerCard;
