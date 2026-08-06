import React, { useEffect, useState,  useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const WorkerDashboard = () => {
  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // 👈 use global user from context
  // // 👉 This should be dynamically fetched from auth context/localStorage/etc.
  // const userId = localStorage.getItem('userId'); // Replace with real auth logic

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const res = await axios.get(`http://localhost:5555/api/works/${user._id}`);
        setWork(res.data); // Work data exists
      } catch (error) {
        setWork(null); // No work found yet
      } finally {
        setLoading(false);
      }
    };

    if (user && user._id) {
      fetchWork();
    } else {
      // Redirect to login if no userId
      navigate('/login');
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="worker-dashboard">
      <nav className="clientnavbar">
        <div className="nav-logo">
          <h1>DoMate</h1>
        </div>
        <ul className="nav-icons">
          <li><Link to='/workerdashboard'>Dashboard</Link></li>
          <li><Link to='/mybusiness'>Mybusiness</Link></li>
          <li><Link to='/analytics'>Analytics</Link></li>
          <li><Link to='/notifications'>🔔</Link></li>
          <li><Link to='/inboxmails'>✉️</Link></li>
          <li><Link to='/clientdashboard'>Switch to Client</Link></li>
          <li><Link to='/profile'>👤Profile</Link></li>
        </ul>
      </nav>

      <h1>I'M WORKER, SEARCH WORK</h1>

      {!work ? (
        <button onClick={() => navigate('/works/create')}>➕ Create Work Profile</button>
      ) : (
        <div className="work-details">
          <h2>👷‍♂️ {work.fullName}</h2>
          <p>📍 {work.location} - {work.pincode}</p>
          <p>💰 ₹{work.price}</p>
          <p>🛠️ Skills: {work.skills.join(', ')}</p>
          <p>📝 Bio: {work.bio}</p>
          {work.profilePic && <img src={work.profilePic} alt="Profile" width="150" />}
          {work.bannerPic && <img src={work.bannerPic} alt="Banner" width="300" />}
        </div>
      )}
    </div>
  );
};

export default WorkerDashboard;

// import React from 'react'
// import { Link } from 'react-router-dom'
// const WorkerDashboard = () => {
//   return (
//         <div className="worker-dashboard">
//     <nav className="clientnavbar">
//             <div className="nav-logo">
//               <h1>DoMate</h1>
//             </div>
//               <ul className="nav-icons">
//               <li><Link to='/workerdashboard' >Dashboard</Link></li>
//               <li><Link to='/mybusiness' >Mybusiness</Link></li>
//               <li><Link to='/analytics' >Analytics</Link></li>
//               <li><Link to='/notifications' >🔔</Link></li>
//               <li><Link to='/inboxmails' >✉️</Link></li>
//               <li><Link to='/clientdashboard' >Switch to Client</Link></li>
//              <li> <Link to='/profile' >👤Profile</Link></li>
//               </ul>
//           </nav>
//       <h1>iM WoRKER, SEaRch work</h1>
//     </div>
//   )
// }

// export default WorkerDashboard
