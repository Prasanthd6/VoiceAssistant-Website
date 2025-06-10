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
import { BiSolidCctv } from "react-icons/bi";
import workers2 from "../../assets/workers2.png"
import VoiceControl from "../../components/voicecontrol/VoiceControl";
import PopularGigsSlider from "./PopularGigsSlider";


function Home() {
 
 const cards = [
    {icon: <FaHammer/>,title: "Carpenter"},
    {icon: <FaPaintRoller/>,title: "Painter"},
    {icon: <FaBroom/>,title: "Home Cleaning"},
    {icon: <FaTruckMoving/>,title: "Movers & packers"},
    {icon: <FaUtensils/>,title: "Cooking help"},
    {icon: <FaTree/>,title: "Gardening"},
    {icon: <FaBuilding/>,title: "Home Tutoring"},
    {icon: <BiSolidCctv/>,title: "CCTV Installation"},
  ]

const { isLoading, error, data } = useQuery({
  queryKey: ["allGigsOnHome"],
  queryFn: async () => {
    try {
      const res = await newRequest.get("/gigs");
      return res.data;
    } catch (err) {
      console.error("Error fetching gigs:", err);
      throw err; // so React Query knows it's an error
    }
  },
});

  return (
    <div className="home">
      <Featured />
         
       <div className="grid-container">
                  {cards.map((card,index) =>(
                    <Card key={index} icon={card.icon} title={card.title}/>
                  )
                  
                  )}
                </div>
                <h1 style={{marginLeft:"50px",}}>Popular Services</h1>
                <PopularGigsSlider/>
                  

      <div className="features">
        <div className="container">
          <div className="item">
            <h1>Essential services from trusted professionals, anytime</h1>
            <div className="title">
              
              <SiTicktick />
              Verified professionals near you
            </div>
            <p>
                    Access a wide network of background-verified workers available in your local area for immediate tasks.
            </p>
            <div className="title">
              
              <SiTicktick />
                  Transparent pricing, no surprises   
         </div>
            <p>
              Clear, upfront pricing for every service. Pay only after the job is done and approved by you..
            </p>
            <div className="title">
              
              <SiTicktick />
                 Fast and reliable response
            </div>
            <p>
                 Get real-time help from available professionals within minutes—whenever you need it most.
            </p>
            <div className="title">
              
              <SiTicktick />
      Secure payments and service guarantee
            </div>
            <p>
 Your payments are protected until you’re fully satisfied. We ensure quality through reviews and ratings.
            </p>
          </div>
          <div className="item">
            <img src={workers2} alt="" />
          </div>
        </div>
      </div>
      
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
    <SiTicktick />
    Hire verified professionals with a track record of reliability
  </div>

  <div className="title">
    <SiTicktick />
    Get matched with skilled workers for any task by our smart suggestion engine
  </div>

  <div className="title">
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
     
    </div>
  );
}

export default Home;