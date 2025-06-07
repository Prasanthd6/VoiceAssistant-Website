import React,{useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import "../styles/Homepage.css";
import { FaHammer, FaPaintRoller , FaBroom, FaTruckMoving, FaUtensils, FaTree, FaBuilding, FaPlug, } from "react-icons/fa";
import Card from "../components/common/Card";
import axios from 'axios';
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import {AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md';
import Popularbookserv from "./Popularbookserv";
import Footer from "./Footersec";


const Homepage = () =>{

  const cards = [
    {icon: <FaHammer/>,title: "Home Repairs"},
    {icon: <FaPaintRoller/>,title: "Painting"},
    {icon: <FaBroom/>,title: "Cleaning"},
    {icon: <FaTruckMoving/>,title: "Moving"},
    {icon: <FaUtensils/>,title: "Cooking"},
    {icon: <FaTree/>,title: "Outdoor help"},
    {icon: <FaBuilding/>,title: "Construction"},
    {icon: <FaPlug/>,title: "Electrical"},
  ]

  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(false)
useEffect(() => {
  setLoading(true);
  axios
    .get('http://localhost:5555/api/works')
    .then((response)=> {
      setWorks(response.data.data);
      setLoading(false);
    })
    .catch((error) =>{
      console.log(error);
      setLoading(false);
    })
}, []);
  return(
    <div className="homepage">
      <Navbar/>
      
        <section className="heading-section">
          <h1><span style={{color:'#5468B7'}}> Book </span>top-rated workforce <br/>within <span style={{color:'#5468B7'}}>your region</span></h1>

          <div className="search-bars-container">
                    <input
                        type="text"
                        className="location-search"
                        placeholder=" Filter by Location"
                    />
                    <input
                        type="text"
                        className="worker-search"
                        placeholder="Search for Workers"
                    />
                </div>
        </section>

        <section>
          <h1 style={{marginLeft:"100px",fontSize:"35px"}}>What are you looking for?</h1>
          <div className="grid-container">
            {cards.map((card,index) =>(
              <Card key={index} icon={card.icon} title={card.title}/>
            )
            
            )}
          </div>
        </section>
        <Popularbookserv/>
        <h1>hello world</h1>
        <Footer/>
        {/* <div className="workslist">
          <Link to='/works/create'>
              <MdOutlineAddBox/>
          </Link>
        </div>
        {loading ? (
          <Spinner/>
        ): ( <table className="">
            <thead>
                <tr>
                  <th>No</th>
                  <th>Title</th>
                  <th>FullName</th>
                  <th>pincode</th>
                  <th>Operations</th>
                </tr>
            </thead>
            <tbody>
                {works.map((work, index) => (
                    <tr key={work._id}>
                        <td>{index +1}</td>
                        <td>{work.title} </td>
                        <td>{work.fullName}</td>
                        <td>{work.pincode} </td>
                        <td>
                          <div>
                            <Link to={`/works/details/${work._id}`}>
                                <BsInfoCircle/>
                            </Link>
                            <Link to={`/works/edit/${work._id}`}>
                                <AiOutlineEdit/>
                            </Link>
                            <Link to={`/works/delete/${work._id}`}>
                                <MdOutlineDelete/>
                            </Link>
                          </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table> )} */}
    </div>
  );
};

export default Homepage;