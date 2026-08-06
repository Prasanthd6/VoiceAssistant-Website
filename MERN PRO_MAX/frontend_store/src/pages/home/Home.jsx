import React from "react";
import "./Home.css";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { cards, projects } from "../../data";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import GigCard from "../../components/gigCard/GigCard";
import Card from "./Card";
import { FaHammer, FaPaintRoller , FaBroom, FaTruckMoving, FaUtensils, FaTree, FaBuilding, FaPlug, } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import workers from "../../assets/workers.png"


function Home() {
  // Use React Query to fetch gigs
// const { isLoading, error, data } = useQuery({
//   queryKey: ["allGigsOnHome"],
//   queryFn: () =>
//     newRequest.get("/gigs").then((res) => res.data),
// });
 const cards = [
    {icon: <FaHammer/>,title: "Home Repairs", desc: "Expert home repair services"},
    {icon: <FaPaintRoller/>,title: "Painting", desc: "Professional painting services"},
    {icon: <FaBroom/>,title: "Cleaning", desc: "Deep cleaning services"},
    {icon: <FaTruckMoving/>,title: "Moving", desc: "Moving and packing services"},
    {icon: <FaUtensils/>,title: "Cooking", desc: "Home cooking services"},
    {icon: <FaTree/>,title: "Outdoor help", desc: "Gardening and landscaping"},
    {icon: <FaBuilding/>,title: "Construction", desc: "Construction and renovation"},
    {icon: <FaPlug/>,title: "Electrical", desc: "Electrical services"},
  ]

const { isLoading, error, data } = useQuery({
  queryKey: ["allGigsOnHome"],
  queryFn: async () => {
    try {
      const res = await newRequest.get("/gigs");
      console.log("Home page gigs response:", res.data);
      console.log("Response type:", typeof res.data);
      console.log("Is array?", Array.isArray(res.data));
      console.log("Data length:", res.data?.length);
      
      // Ensure we always return an array
      if (Array.isArray(res.data)) {
        return res.data;
      } else if (res.data && typeof res.data === 'object') {
        // If it's an object, try to extract array from common properties
        return res.data.gigs || res.data.data || res.data.results || [];
      }
      return [];
    } catch (err) {
      console.error("Error fetching gigs:", err);
      console.error("Error response:", err.response);
      return []; // Return empty array on error instead of throwing
    }
  },
  retry: 1,
});

  return (
    <div className="home">
      <Featured />
          {/* <h1 style={{marginLeft:"50px",fontSize:"25px",fontFamily:"serif"}}>What are you looking for?</h1> */}
      {/* <TrustedBy /> */}
        
       <div className="grid-container">
                  {cards.map((card,index) =>(
                    <Card key={index} icon={card.icon} title={card.title}/>
                  )
                  
                  )}
                </div>
                <h1 style={{marginLeft:"50px",}}>Popular Services</h1>
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide>
      <div className="container-gig">
        <h2>Featured Gigs</h2>
        <div className="gig-cards-row">
  {isLoading ? (
    <div>Loading gigs...</div>
  ) : error ? (
    <div>
      Failed to load gigs. Please check console for error logs.
    </div>
  ) : !data || data.length === 0 ? (
    <div>
      No gigs available at the moment.
    </div>
  ) : (
    data.map((gig) => {
      console.log("Rendering gig card for:", gig.title);
      return <GigCard key={gig._id} item={gig} />;
    })
  )}
</div>

      </div>

      <div className="features">
        <div className="container">
          <div className="item">
            <h1>Essential services from trusted professionals, anytime</h1>
            <div className="title">
              {/* <img src="./img/check.png" alt="" /> */}
              <SiTicktick />
              Verified professionals near you
            </div>
            <p>
                    Access a wide network of background-verified workers available in your local area for immediate tasks.
            </p>
            <div className="title">
              {/* <img src="./img/check.png" alt="" /> */}
              <SiTicktick />
                  Transparent pricing, no surprises   
         </div>
            <p>
              Clear, upfront pricing for every service. Pay only after the job is done and approved by you..
            </p>
            <div className="title">
              {/* <img src="./img/check.png" alt="" /> */}
              <SiTicktick />
                 Fast and reliable response
            </div>
            <p>
                 Get real-time help from available professionals within minutes—whenever you need it most.
            </p>
            <div className="title">
              {/* <img src="./img/check.png" alt="" /> */}
              <SiTicktick />
      Secure payments and service guarantee
            </div>
            <p>
 Your payments are protected until you’re fully satisfied. We ensure quality through reviews and ratings.
            </p>
          </div>
          <div className="item">
            <img src={workers} alt="" />
          </div>
        </div>
      </div>
      {/* <div className="explore">
        <div className="container">
          <h1>Explore the marketplace</h1>
          <div className="items">
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Graphics & Design</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/online-marketing.74e221b.svg"
                alt=""
              />
              <div className="line"></div>

              <span>Digital Marketing</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/writing-translation.32ebe2e.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Writing & Translation</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Video & Animation</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/music-audio.320af20.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Music & Audio</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Programming & Tech</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/business.bbdf319.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Business</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lifestyle.745b575.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Lifestyle</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/data.718910f.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Data</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/photography.01cf943.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Photography</span>
            </div>
          </div>
        </div>
      </div> */}
      <div className="features dark">
        <div className="container">
          <div className="item">
  <h1>
    Domate <i>Pro</i>
  </h1>
  <h1>
    A service solution built for <i>homeowners & teams</i>
  </h1>
  <p>
    Upgrade to a smart, hassle-free experience with curated professionals,
    on-demand bookings, and dedicated support for recurring or bulk service needs.
  </p>

  <div className="title">
    {/* <img src="./img/check.png" alt="" /> */}
    <SiTicktick />
    Hire verified professionals with a track record of reliability
  </div>

  <div className="title">
    {/* <img src="./img/check.png" alt="" /> */}
    <SiTicktick />
    Get matched with skilled workers for any task by our smart suggestion engine
  </div>

  <div className="title">
    {/* <img src="./img/check.png" alt="" /> */}
    <SiTicktick />
    Manage multiple service requests and track tasks in one dashboard
  </div>

  <button>Explore Domate Pro</button>
</div>

          <div className="item">
            <img
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png"
              alt=""
            />
          </div>
        </div>
      </div>
      {/* <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </Slide> */}
    </div>
  );
}

export default Home;