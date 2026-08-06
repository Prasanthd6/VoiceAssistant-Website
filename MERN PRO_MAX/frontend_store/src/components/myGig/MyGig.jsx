// import React, { useEffect, useState } from "react";
// import GigCard from "../gigCard/GigCard";
// import newRequest from "../../utils/newRequest";

// const MyGig = () => {
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//   const [gigs, setGigs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!currentUser) return;

//     newRequest
//       .get(`/gigs?userId=${currentUser.id}`)
//       .then((res) => {
//         setGigs(res.data || []);
//         // if (res.data.length > 0) setGig(res.data[0]); // get the first gig
//         // else setGig(null);
//       })
//       .catch((err) => {
//         console.error(err);
//         setGigs([]);
//       })
//       .finally(() => setLoading(false));
//   }, [currentUser]);

//   if (loading) return <p>Loading your gigs...</p>;
//   if (!gigs.length) return <p>You have no gigs yet.</p>;

//   return (
//     <div className="myGig">
//       <h2>Your Gig</h2>
//       <div className="gigList">
//         {gigs.map((gig) => (
//         <GigCard key={gig._id} item={gig} />
//                 ))}
//       </div>
//     </div>
//   );
// };

// export default MyGig;
import React, { useEffect, useState } from "react";
import GigCard from "../gigCard/GigCard";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import "./MyGig.css"; // Make sure this CSS exists and is imported

const MyGig = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return;

    newRequest
      .get(`/gigs?userId=${currentUser._id}`)
      .then((res) => {
        setGigs(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch gigs:", err);
        setGigs([]);
      })
      .finally(() => setLoading(false));
  }, [currentUser]);

  if (loading) return <p>Loading your gigs...</p>;
  if (!gigs.length) return <p>You have no gigs yet.</p>;

  return (
    <div className="myGig">
      <h2>Your Gigs</h2>
      {/* <div className="gigList">
        {gigs.map((gig) => (
          <GigCard key={gig._id} item={gig} />
          
        ))}
        
      </div> */}
      <div className="gigList">
  {gigs.map((gig) => (
    <div
      key={gig._id}
      className="gigCardWrapper"
      onClick={() => {
        if (gig.userId === currentUser._id) {
          navigate(`/update-gig/${gig._id}`);
        }
      }}
      style={{ cursor: gig.userId === currentUser._id ? "pointer" : "default" }}
    >
      <GigCard item={gig} />
    </div>
  ))}
</div>

    </div>
  );
};

export default MyGig;
