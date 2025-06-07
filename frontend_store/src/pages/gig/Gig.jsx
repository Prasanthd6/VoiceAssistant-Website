import React,{ useState } from "react";
import "./Gig.css";
import { Slider } from "infinite-react-carousel/lib";
import { Link, useParams,useNavigate } from "react-router-dom";
import { useQuery,useMutation } from "@tanstack/react-query";
import newRequest, { getSocket } from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";
import { useSelector, useDispatch } from "react-redux";
import ChatPopup from "../../components/chatpopup/ChatPopup";

function Gig() {
  const { id } = useParams();
  const navigate = useNavigate();

  
    const currentUser = useSelector((state) => state.user.currentUser);
    const [showChat, setShowChat] = useState(false);
  const [conversationId, setConversationId] = useState(null);

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => 
         res.data),
    enabled: !!userId,
  });

  const mutation = useMutation({
  mutationFn: () => {
    console.log("Sending conversation request to:", dataUser?._id);

    return newRequest.post(`/conversations`, {
      to: dataUser._id, // this is the sellerId
    });
  },
  onSuccess: (res) => {
    setConversationId(res.data._id);
    // navigate(`/message/${res.data.id}`);
    setShowChat(true);
  },
});


// const handleContact = async () => {
//   // mutation.mutate();
//   try {
//     const res = await newRequest.post("/conversations", {
//       senderId: currentUser._id,
//       receiverId: dataUser._id,
//     });
//     setConversationId(res.data.id);
//     setShowChat(true);
    
//     // Join the conversation room
//     const socket = getSocket();
//     socket.emit("joinConversation", res.data.id);
//   } catch (err) {
//     console.error(err);
//   }
// };
const handleContact = async () => {
  try {
    console.log("Attempting to create conversation between:", 
      currentUser._id, "and", dataUser._id);
    
    const res = await newRequest.post("/conversations", {
      senderId: currentUser._id,
      receiverId: dataUser._id,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log("Conversation created:", res.data);
    setConversationId(res.data._id); // Note: it's usually _id, not id
    setShowChat(true);
    
    const socket = getSocket();
    socket.emit("joinConversation", res.data._id);
    
  } catch (err) {
    console.error("Full error details:", {
      url: err.config?.url,
      status: err.response?.status,
      data: err.response?.data,
      error: err.message
    });
  }
};

  return (
    <div className="gig">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              Fiverr {">"} Graphics & Design {">"}
            </span>
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={dataUser.img || "/img/noavatar.jpg"}
                  alt=""
                />
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src="/img/star.png" alt="" key={i} />
                      ))}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
              </div>
            )}
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data.images.map((img) => (
                <img key={img} src={img} alt="" />
              ))}
            </Slider>
            <h2>About This Gig</h2>
            <p>{data.description}</p>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  <img src={dataUser.img || "/img/noavatar.jpg"} alt="" />
                  <div className="info">
                    <span>{dataUser.username}</span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img src="/img/star.png" alt="" key={i} />
                          ))}
                        <span>
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                    {/* <button onClick={handleContact} >Contact Me</button> */}
                     {currentUser._id !== dataUser._id && (
                      <>
                        <button id="contactButton" onClick={handleContact}>Contact Me</button>
                        {showChat && (
                              <ChatPopup
                                currentUser={currentUser}
                                receiverId={dataUser._id}
                                onClose={() => setShowChat(false)} />
                            )}
                            </>
                          )}
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{dataUser.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>{dataUser.desc}</p>
                </div>
              </div>
            )}
            <Reviews gigId={id} />
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>$ {data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{data.deliveryDate} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Link to={`/pay/${id}`}>
            <button>Continue</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;




// import React,{ useState } from "react";
// import "./Gig.css";
// import { Slider } from "infinite-react-carousel/lib";
// import { Link, useParams,useNavigate } from "react-router-dom";
// import { useQuery,useMutation } from "@tanstack/react-query";
// import newRequest from "../../utils/newRequest";
// import Reviews from "../../components/reviews/Reviews";
// import { useSelector, useDispatch } from "react-redux";
// import ChatPopup from "../../components/chatpopup/ChatPopup";

// function Gig() {
//   const { id } = useParams();
//   const navigate = useNavigate();

  
//     const currentUser = useSelector((state) => state.user.currentUser);
//     const [showChat, setShowChat] = useState(false);
//   const [conversationId, setConversationId] = useState(null);

//   const { isLoading, error, data } = useQuery({
//     queryKey: ["gig"],
//     queryFn: () =>
//       newRequest.get(`/gigs/single/${id}`).then((res) => {
//         return res.data;
//       }),
//   });

//   const userId = data?.userId;

//   const {
//     isLoading: isLoadingUser,
//     error: errorUser,
//     data: dataUser,
//   } = useQuery({
//     queryKey: ["user"],
//     queryFn: () =>
//       newRequest.get(`/users/${userId}`).then((res) => 
//          res.data),
//     enabled: !!userId,
//   });

//   const mutation = useMutation({
//   mutationFn: () => {
//     console.log("Sending conversation request to:", dataUser?._id);

//     return newRequest.post(`/conversations`, {
//       to: dataUser._id, // this is the sellerId
//     });
//   },
//   onSuccess: (res) => {
//     setConversationId(res.data.id);
//     // navigate(`/message/${res.data.id}`);
//     setShowChat(true);
//   },
// });

// // Function when button is clicked
// const handleContact = async () => {
//   mutation.mutate();
// };

//   return (
//     <div className="gig">
//       {isLoading ? (
//         "loading"
//       ) : error ? (
//         "Something went wrong!"
//       ) : (
//         <div className="container">
//           <div className="left">
//             <span className="breadcrumbs">
//               Fiverr {">"} Graphics & Design {">"}
//             </span>
//             <h1>{data.title}</h1>
//             {isLoadingUser ? (
//               "loading"
//             ) : errorUser ? (
//               "Something went wrong!"
//             ) : (
//               <div className="user">
//                 <img
//                   className="pp"
//                   src={dataUser.img || "/img/noavatar.jpg"}
//                   alt=""
//                 />
//                 <span>{dataUser.username}</span>
//                 {!isNaN(data.totalStars / data.starNumber) && (
//                   <div className="stars">
//                     {Array(Math.round(data.totalStars / data.starNumber))
//                       .fill()
//                       .map((item, i) => (
//                         <img src="/img/star.png" alt="" key={i} />
//                       ))}
//                     <span>{Math.round(data.totalStars / data.starNumber)}</span>
//                   </div>
//                 )}
//               </div>
//             )}
//             <Slider slidesToShow={1} arrowsScroll={1} className="slider">
//               {data.images.map((img) => (
//                 <img key={img} src={img} alt="" />
//               ))}
//             </Slider>
//             <h2>About This Gig</h2>
//             <p>{data.description}</p>
//             {isLoadingUser ? (
//               "loading"
//             ) : errorUser ? (
//               "Something went wrong!"
//             ) : (
//               <div className="seller">
//                 <h2>About The Seller</h2>
//                 <div className="user">
//                   <img src={dataUser.img || "/img/noavatar.jpg"} alt="" />
//                   <div className="info">
//                     <span>{dataUser.username}</span>
//                     {!isNaN(data.totalStars / data.starNumber) && (
//                       <div className="stars">
//                         {Array(Math.round(data.totalStars / data.starNumber))
//                           .fill()
//                           .map((item, i) => (
//                             <img src="/img/star.png" alt="" key={i} />
//                           ))}
//                         <span>
//                           {Math.round(data.totalStars / data.starNumber)}
//                         </span>
//                       </div>
//                     )}
//                     {/* <button onClick={handleContact} >Contact Me</button> */}
//                      {currentUser._id !== dataUser._id && (
//                       <>
//                         <button onClick={handleContact}>Contact Me</button>
//                         {showChat && (
//                               <ChatPopup
//                                 currentUser={currentUser}
//                                 receiverId={dataUser._id}
//                                 onClose={() => setShowChat(false)} />
//                             )}
//                             </>
//                           )}
//                   </div>
//                 </div>
//                 <div className="box">
//                   <div className="items">
//                     <div className="item">
//                       <span className="title">From</span>
//                       <span className="desc">{dataUser.country}</span>
//                     </div>
//                     <div className="item">
//                       <span className="title">Member since</span>
//                       <span className="desc">Aug 2022</span>
//                     </div>
//                     <div className="item">
//                       <span className="title">Avg. response time</span>
//                       <span className="desc">4 hours</span>
//                     </div>
//                     <div className="item">
//                       <span className="title">Last delivery</span>
//                       <span className="desc">1 day</span>
//                     </div>
//                     <div className="item">
//                       <span className="title">Languages</span>
//                       <span className="desc">English</span>
//                     </div>
//                   </div>
//                   <hr />
//                   <p>{dataUser.desc}</p>
//                 </div>
//               </div>
//             )}
//             <Reviews gigId={id} />
//           </div>
//           <div className="right">
//             <div className="price">
//               <h3>{data.shortTitle}</h3>
//               <h2>$ {data.price}</h2>
//             </div>
//             <p>{data.shortDesc}</p>
//             <div className="details">
//               <div className="item">
//                 <img src="/img/clock.png" alt="" />
//                 <span>{data.deliveryDate} Days Delivery</span>
//               </div>
//               <div className="item">
//                 <img src="/img/recycle.png" alt="" />
//                 <span>{data.revisionNumber} Revisions</span>
//               </div>
//             </div>
//             <div className="features">
//               {data.features.map((feature) => (
//                 <div className="item" key={feature}>
//                   <img src="/img/greencheck.png" alt="" />
//                   <span>{feature}</span>
//                 </div>
//               ))}
//             </div>
//             <Link to={`/pay/${id}`}>
//             <button>Continue</button>
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Gig;
