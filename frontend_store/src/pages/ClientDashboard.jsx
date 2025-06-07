import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../styles/ClientDashboard.css";
import AllWorkers from '../components/AllWorkers';

const ClientDashboard = () => {
  const [workers, setworkers] = useState([]);

  useEffect(() => {
    const fetchWorkers = async () => {
      try{
        const res = await axios.get('http://localhost:5555/api/works');
        console.log("🚀 Response from /api/works:", res.data);
        setworkers(res.data.data);
      }catch(err){
        console.error('failed to fetch workers', err);
      }
    };
    fetchWorkers();
  },[]);

  return (
      <div className="client-dashboard">
          <nav className="clientnavbar">
            <div className="nav-logo">
              <h1>DoMate</h1>
            </div>
              <input type="text" placeholder='search workers...' className='search-bar' />
              <ul className="nav-icons">
              <li><Link to='/notifications' >🔔</Link></li>
              <li><Link to='/favorites' >❤️</Link></li>
              <li><Link to='/inboxmails' >✉️</Link></li>
              <li><Link to='/workerdashboard' >Switch to Worker</Link></li>
              <li><Link to='/orders' >Orders</Link></li>
             <li> <Link to='/profile' >👤Profile</Link></li>
              </ul>
          </nav>

              {/* <div className="worker-list">
                {workers.length === 0 ? (<p>Loading worker profiles</p> ):(
                  workers.map(worker =>(
                    <div className="worker-card" key={worker.id}>
                      <h3>{worker.name}</h3>
                      <p>Skills: {worker.skills?.join(', ')|| 'N/A'}</p>
                      <p>Rating: {worker.rating || 'Not rated'} </p>
                      <p>From {worker.price || 'N/A'}</p>
                    </div>
                  ))
                )}
              </div> */}
              <AllWorkers/>

      </div>




   
  )
}

export default ClientDashboard
