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
            <button onClick={() => navigate("/gigs?search=Painter")}>Wall Painting</button>
            <button onClick={() => navigate("/gigs?search=Home Services")}>Home Services</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;


// import React, { useState } from "react";
// import "./Featured.css";
// import { useNavigate } from "react-router-dom";
// import featurebg from "../../assets/featurebg.png";
// import { CiSearch } from "react-icons/ci";


// function Featured() {
//   const [input, setInput] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = () => {
//     navigate(`/gigs?search=${input}`);
//   };
//   return (
//     <div className="featured" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${featurebg})`,
//     backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'center',
//     height: '100vh', // adjust as needed
//     width: '100%',
//     opacity: "0.9",
//      }}>
//       <div className="container">
//         <div className="left">
//           <h1>
//             Book top-rated <br /> workforce in your region
//           </h1>
//           <div className="search" >
//             <div className="searchInput">
//               {/* <img src="./img/search.png" alt="" /> */}
//               <input
//                 type="text"
//                 placeholder="Search by service,skills"
//                 onChange={(e) => setInput(e.target.value)}
//               />
//             </div>
//             <button onClick={handleSubmit}
//             style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '5px', // spacing between icon and text
//                   padding: '10px 20px',
//                   fontSize: '16px',
//                   height: '40px', // control button height
//                   cursor: 'pointer',
//                     borderRadius: "15px",
//                 }}>
//                 <CiSearch size={30}/> Search</button>
//           </div>
//           <div className="popular">
//             {/* <span>Popular:</span> */}
//             <button>Interior Design</button>
//             <button>Gardening</button>
//             <button>Wall Painting</button>
//             <button>Home Services</button>
//           </div>
//         </div>
//         {/* <div className="right">
//           <img src="./img/man.png" alt="" />
//         </div> */}
//       </div>
//     </div>
//   );
// }

// export default Featured;